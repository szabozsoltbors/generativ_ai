from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from database import get_db, Product, create_tables
from config import settings

app = FastAPI(title=settings.app_name)

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

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
