from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from database import get_db, Product, CartItem, create_tables
from config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield

app = FastAPI(title=settings.app_name, lifespan=lifespan)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductCreate(BaseModel):
    name: str
    price: float
    description: str | None = None
    stock: int

class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    description: str | None = None
    stock: int | None = None

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str | None = None
    stock: int
    
    class Config:
        from_attributes = True

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: ProductResponse
    
    class Config:
        from_attributes = True

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Exercices"}

@app.post("/products/", response_model=ProductResponse)
async def create_user(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.name == product.name).first()
    if db_product:
        raise HTTPException(status_code=400, detail="Product is already registered")
    
    db_product = Product(name=product.name, price=product.price, description=product.description, stock=product.stock)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.get("/products/", response_model=List[ProductResponse])
async def get_users(db: Session = Depends(get_db)):
    return db.query(Product).all()

# GET product by ID
@app.get("/products/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.put("/products/{product_id}", response_model=ProductResponse)
async def update_users(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = product.dict(exclude_unset=True)  # Only include fields that were provided

    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()
    return {"message": f"Product with ID {product_id} has been deleted"}

# Cart endpoints
@app.get("/cart/", response_model=List[CartItemResponse])
async def get_cart_items(db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).all()
    return cart_items

@app.post("/cart/", response_model=CartItemResponse)
async def add_to_cart(cart_item: CartItemCreate, db: Session = Depends(get_db)):
    # Check if product exists
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if product has enough stock
    if product.stock < cart_item.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock available")
    
    # Check if item already exists in cart
    existing_item = db.query(CartItem).filter(CartItem.product_id == cart_item.product_id).first()
    if existing_item:
        # Update quantity
        new_quantity = existing_item.quantity + cart_item.quantity
        if product.stock < new_quantity - existing_item.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock available")
        
        # Reduce product stock by the additional quantity
        product.stock -= cart_item.quantity
        existing_item.quantity = new_quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item
    else:
        # Reduce product stock
        product.stock -= cart_item.quantity
        
        # Create new cart item
        db_cart_item = CartItem(product_id=cart_item.product_id, quantity=cart_item.quantity)
        db.add(db_cart_item)
        db.commit()
        db.refresh(db_cart_item)
        return db_cart_item

@app.put("/cart/{cart_item_id}", response_model=CartItemResponse)
async def update_cart_item(cart_item_id: int, cart_item: CartItemUpdate, db: Session = Depends(get_db)):
    db_cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
    if not db_cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    # Get the product
    product = db.query(Product).filter(Product.id == db_cart_item.product_id).first()
    
    # Calculate the difference in quantity
    quantity_diff = cart_item.quantity - db_cart_item.quantity
    
    # Check if we have enough stock for the increase
    if quantity_diff > 0 and product.stock < quantity_diff:
        raise HTTPException(status_code=400, detail="Not enough stock available")
    
    # Update product stock
    product.stock -= quantity_diff
    
    # Update cart item quantity
    db_cart_item.quantity = cart_item.quantity
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item

@app.delete("/cart/{cart_item_id}")
async def remove_from_cart(cart_item_id: int, db: Session = Depends(get_db)):
    db_cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
    if not db_cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    # Restore stock to the product
    product = db.query(Product).filter(Product.id == db_cart_item.product_id).first()
    if product:
        product.stock += db_cart_item.quantity
    
    db.delete(db_cart_item)
    db.commit()
    return {"message": f"Cart item with ID {cart_item_id} has been removed"}

@app.delete("/cart/")
async def clear_cart(db: Session = Depends(get_db)):
    # Restore stock for all cart items
    cart_items = db.query(CartItem).all()
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            product.stock += item.quantity
    
    db.query(CartItem).delete()
    db.commit()
    return {"message": "Cart has been cleared"}

@app.post("/cart/checkout")
async def checkout(db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    total_amount = 0
    
    # Calculate total (stock is already reserved)
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found")
        
        total_amount += product.price * item.quantity
    
    # Clear cart (stock is already reduced when items were added to cart)
    db.query(CartItem).delete()
    db.commit()
    
    return {
        "message": "Checkout completed successfully",
        "total_amount": total_amount,
        "items_purchased": len(cart_items)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
