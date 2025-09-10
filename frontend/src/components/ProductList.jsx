
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct, getCartItems, addToCart } from '../api';
import AddProductDialog from './AddProductDialog';
import EditProductDialog from './EditProductDialog';
import ProductDetailsDialog from './ProductDetailsDialog';
import DeleteProductDialog from './DeleteProductDialog';
import Toast from './Toast';
import ShoppingCartSimple from './ShoppingCartSimple';
import PersistentCartWidget from './PersistentCartWidget';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", stock: "" });
  const [adding, setAdding] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editProduct, setEditProduct] = useState({ id: "", name: "", description: "", price: "", stock: "" });
  const [updating, setUpdating] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [addingToCart, setAddingToCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const data = await getProducts();
      console.log('Products received:', data);
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    setDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setShowDeleteDialog(false);
      setProductToDelete(null);
    } catch (error) {
      alert('Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  // Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const created = await createProduct({
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10)
      });
      setProducts([...products, created]);
      setShowAddDialog(false);
      setNewProduct({ name: "", description: "", price: "", stock: "" });
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setAdding(false);
    }
  };

  // Edit product handlers
  const handleEditClick = (product) => {
    setEditProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString()
    });
    setShowEditDialog(true);
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updated = await updateProduct(editProduct.id, {
        name: editProduct.name,
        description: editProduct.description,
        price: parseFloat(editProduct.price),
        stock: parseInt(editProduct.stock, 10)
      });
      setProducts(products.map(p => p.id === editProduct.id ? updated : p));
      setShowEditDialog(false);
      setEditProduct({ id: "", name: "", description: "", price: "", stock: "" });
    } catch (err) {
      alert("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  // View product details handler
  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setShowDetailsDialog(true);
  };

  // Cart handlers
  const handleAddToCart = async (productId) => {
    setAddingToCart(prev => ({ ...prev, [productId]: true }));
    try {
      await addToCart(productId, 1);
      await fetchCartItems(); // Refresh cart items
      await fetchProducts(); // Refresh products to update stock counts
      setToast({
        isVisible: true,
        message: 'Product added to cart!',
        type: 'success'
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setToast({
        isVisible: true,
        message: 'Failed to add to cart: ' + (error.response?.data?.detail || error.message),
        type: 'error'
      });
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartPrice = () => {
    return cartItems.reduce((total, item) => total + ((item.product?.price || 0) * item.quantity), 0);
  };

  return (
    <>
      <div className="p-6 min-h-screen" style={{ maxWidth: '1236px', margin: '0 auto', width: '100%' }}>
        <div className="mb-[49px] text-left">
          <h2 className="font-inter font-normal text-[13.2px] leading-[1.59] text-[#0A0A0A] text-left">Product Management</h2>
        </div>
        {/* Search bar and Add Product button */}
        <div className="flex items-center justify-between mb-8 gap-4 w-full">
        <div className="relative max-w-[392px] w-full">
          <input
            type="text"
            className="w-full pl-[35px] pr-[17px] pt-[8px] pb-[8px] rounded-[6.75px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-[10.7px] text-[#0A0A0A] placeholder:text-[#717182] bg-[#F3F3F5]"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#717182]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#717182" strokeWidth="1.2" />
              <line x1="11.1" y1="11.1" x2="13" y2="13" stroke="#717182" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        
        <div className="flex items-center">
          <button
            className="flex items-center gap-2 bg-[#030213] px-[24px] py-[8px] h-[31.5px] rounded-[6.75px] font-inter font-medium text-[12px] hover:bg-[#23234a] transition shadow min-w-[116px]"
            style={{ lineHeight: '1.46', letterSpacing: '0.01em', color: '#fff' }}
            onClick={() => setShowAddDialog(true)}
          >
            <span className="flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="2" width="2" height="10" rx="1" fill="white" />
                <rect x="2" y="6" width="10" height="2" rx="1" fill="white" />
              </svg>
            </span>
            <span className="text-white">Add Product</span>
          </button>
        </div>
        </div>

        {/* Product grid */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full">
            <div className="flex flex-wrap mt-12" style={{ margin: '-10px', marginTop: '48px' }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border rounded-[12.75px] flex flex-col"
                style={{ 
                  width: '264.25px', 
                  height: '234.75px',
                  margin: '10px',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  borderWidth: '1px',
                  fontFamily: 'Inter'
                }}
              >
                {/* Title */}
                <div className="px-[15px] pt-[15px]">
                  <h4 style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '13.199999809265137px',
                    lineHeight: '1.0606060759314058em',
                    color: '#0A0A0A',
                    margin: 0
                  }}>
                    {product.name}
                  </h4>
                </div>
                
                {/* Content section */}
                <div className="px-[14px] pt-[14px] flex-1 flex flex-col">
                  {/* Description */}
                  <div className="mb-[14px]">
                    <p style={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '11.300000190734863px',
                      lineHeight: '1.548672540231341em',
                      color: '#717182',
                      margin: 0,
                      marginBottom: '14px'
                    }}>
                      {product.description}
                    </p>
                    
                    {/* Price and Stock */}
                    <div className="flex justify-between items-center">
                      <span style={{
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        fontSize: '12.800000190734863px',
                        lineHeight: '1.6406249755527829em',
                        color: '#030213'
                      }}>
                        ${product.price}
                      </span>
                      <span style={{
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: '11.300000190734863px',
                        lineHeight: '1.548672540231341em',
                        color: '#717182'
                      }}>
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Button section */}
                <div className="px-[14px] pb-[14px] flex gap-[7px] items-center">
                  {/* View Button */}
                  <button 
                    className="inline-flex items-center justify-center gap-[4px] bg-white border rounded-[6.75px] hover:bg-gray-50 transition"
                    style={{ 
                      width: '94.38px', 
                      height: '28px',
                      backgroundColor: '#FFFFFF',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      borderWidth: '1px',
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      fontSize: '11.300000190734863px',
                      lineHeight: '1.548672540231341em',
                      color: '#0A0A0A'
                    }}
                    onClick={() => handleViewClick(product)}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.17 7s2.33-4.08 5.83-4.08S12.83 7 12.83 7s-2.33 4.08-5.83 4.08S1.17 7 1.17 7z" stroke="#000000" strokeWidth="1.1666666269302368" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="7" cy="7" r="1.75" stroke="#000000" strokeWidth="1.1666666269302368"/>
                    </svg>
                    <span>View</span>
                  </button>
                  
                  {/* Edit Button */}
                  <button 
                    className="inline-flex items-center justify-center gap-[4px] bg-white border rounded-[6.75px] hover:bg-gray-50 transition"
                    style={{ 
                      width: '94.38px', 
                      height: '28px',
                      backgroundColor: '#FFFFFF',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      borderWidth: '1px',
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      fontSize: '11.300000190734863px',
                      lineHeight: '1.548672540231341em',
                      color: '#0A0A0A'
                    }}
                    onClick={() => handleEditClick(product)}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 1.75L12.25 3.5L4.375 11.375H2.625v-1.75L10.5 1.75z" stroke="#000000" strokeWidth="1.1666666269302368" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.17 4.67L10.5 7" stroke="#000000" strokeWidth="1.1666666269302368" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Edit</span>
                  </button>
                  
                  {/* Add to Cart Button */}
                  <button 
                    className="inline-flex items-center justify-center rounded-[6.75px] hover:bg-green-600 transition"
                    style={{ 
                      width: '31.5px', 
                      height: '28px',
                      backgroundColor: '#22C55E',
                      border: 'none',
                      outline: 'none'
                    }}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addingToCart === product.id}
                  >
                    {addingToCart === product.id ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.625 2.625h1.75l1.312 6.562a0.875 0.875 0 0 0 0.875 0.688h4.375l1.313-5.25H6.125" stroke="#FFFFFF" strokeWidth="1.1666666269302368" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8.75" cy="12.25" r="0.4375" stroke="#FFFFFF" strokeWidth="1.1666666269302368"/>
                        <circle cx="6.125" cy="12.25" r="0.4375" stroke="#FFFFFF" strokeWidth="1.1666666269302368"/>
                      </svg>
                    )}
                  </button>
                  
                  {/* Delete Button */}
                  <button 
                    className="inline-flex items-center justify-center rounded-[6.75px] hover:bg-red-700 transition"
                    style={{ 
                      width: '31.5px', 
                      height: '28px',
                      backgroundColor: '#D4183D',
                      border: 'none',
                      outline: 'none'
                    }}
                    onClick={() => handleDeleteClick(product)}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.92 3.5h8.17M4.67 3.5V2.33a1.17 1.17 0 0 1 1.17-1.17h2.33a1.17 1.17 0 0 1 1.17 1.17V3.5m1.75 0v8.17a1.17 1.17 0 0 1-1.17 1.17H4.08a1.17 1.17 0 0 1-1.17-1.17V3.5h8.17z" stroke="#FFFFFF" strokeWidth="1.1666666269302368" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.83 6.42v3.5M8.17 6.42v3.5" stroke="#FFFFFF" strokeWidth="1.1666666269302368" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* Add Product Dialog */}
        <AddProductDialog
          isOpen={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          onSubmit={handleAddProduct}
          adding={adding}
        />

        <EditProductDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
        product={editProduct}
        setProduct={setEditProduct}
        onSubmit={handleEditProduct}
        updating={updating}
      />

      <ProductDetailsDialog
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        product={selectedProduct}
      />

      <DeleteProductDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        product={productToDelete}
        onConfirm={handleDeleteConfirm}
        deleting={deleting}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* Persistent Cart Widget - Always visible */}
      <PersistentCartWidget
        itemCount={getTotalCartItems()}
        totalPrice={getTotalCartPrice()}
        onClick={() => setShowCart(true)}
      />
    </div>

    {/* Shopping Cart - Rendered outside main container for proper modal overlay */}
    <ShoppingCartSimple
      isOpen={showCart}
      onClose={() => setShowCart(false)}
      onItemRemoved={() => {
        fetchCartItems();
        fetchProducts();
      }}
    />
    </>
  );
}
