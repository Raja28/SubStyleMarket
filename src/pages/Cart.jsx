
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart";

import { useState } from 'react';
import { checkout } from "../features/cart";
import toast from "react-hot-toast";


export default function CartPage() {
  const {cartItems, purchasedItems, coins } = useSelector(state => state.cart);
  const dispatch = useDispatch()
  // const [cartItems, setCartItems] = useState(sampleCartData);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate totals
  const totalCost = cartItems.reduce((sum, item) => sum + item.cost, 0);
  const selectedCost = cartItems
    .filter(item => selectedItems.has(item.id))
    .reduce((sum, item) => sum + item.cost, 0);
  const freeItemsCount = cartItems.filter(item => item.cost === 0).length;
  const finalCost = Math.max(0, (selectedItems.size > 0 ? selectedCost : totalCost) - discount);



  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(Math.ceil(totalCost * 0.1));
    } else if (promoCode.toLowerCase() === 'first5') {
      setDiscount(5);
    } else {
      alert('Invalid promo code');
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      
      if(!(coins >= finalCost)) {
        toast.error("Insufficient coins")
        return
      }
      // Clear all items
      dispatch(checkout({cost: finalCost}))
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };

  // Get preview styles for templates
  const getPreviewStyles = (name) => {
    switch (name) {
      case "Backdrop":
        return "bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white";
      case "Highlight":
        return "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-black";
      case "Glow":
        return "text-cyan-300 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30";
      case "Mono":
        return "font-mono text-emerald-700 bg-gray-50 border border-emerald-200";
      case "Classic":
      default:
        return "text-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Basic': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Free': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-11/12 mx-auto py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-1">
                {cartItems.length} {cartItems.length === 1 ? 'template' : 'templates'} in your cart
              </p>
            </div>
            
            <button
              onClick={() => window.history.back()}
              className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 text-center font-semibold animate-pulse">
          🎉 Checkout Successful! Templates have been added to your account
        </div>
      )}

      <div className="w-11/12 mx-auto py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5a1 1 0 001 1h9a1 1 0 001-1v0a1 1 0 00-1-1H7m0 0v-4a1 1 0 011-1h2M9 21h6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any templates yet. Explore our collection and find the perfect style for your videos!
            </p>
            <button onClick={() => window.location.href = '/'} className="bg-gradient-to-r cursor-pointer from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Browse Templates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 transform hover:scale-[1.01] ${
                      selectedItems.has(item.id) ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-6">
                      {/* Template Preview */}
                      <div className={`w-32 h-20 rounded-xl flex items-center justify-center text-sm font-medium transition-transform hover:scale-105 ${getPreviewStyles(item.name)}`}>
                        {item.name}
                      </div>

                      {/* Template Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                              {item.category || item.text}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => dispatch(removeFromCart(item))}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 group"
                            title="Remove from cart"
                          >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* <p className="text-gray-600 mb-4">{item.text}</p> */}
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-lg font-bold ${
                            item.cost === 0 
                              ? 'text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full' 
                              : 'text-purple-600'
                          }`}>
                            {item.cost === 0 ? 'FREE' : `${item.cost} credits`}
                          </span>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Instant Download
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                  <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-lg text-gray-600">Total Items:</span>
                    <span className="font-medium">{cartItems.length}</span>
                  </div>
                  
                  {freeItemsCount > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-lg text-emerald-600">Free Templates:</span>
                      <span className="font-medium text-emerald-600">{freeItemsCount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-lg text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      {totalCost} credits
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-green-600">Discount:</span>
                      <span className="font-medium text-green-600">-{discount} credits</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className={`${(totalCost - discount) <= 0 ? 'text-emerald-600' : 'text-purple-600'}`}>
                        {(totalCost - discount) <= 0 ? 'FREE' : `${totalCost - discount} credits`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Try: WELCOME10 or FIRST5</p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {selectedItems.size > 0 ? `Checkout Selected (${selectedItems.size})` : '                      Checkout'}
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                  🔒 Secure checkout • Credits deducted from account balance
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">Why Choose Our Templates?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Instant download after purchase
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Compatible with all major video editors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Lifetime updates and support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Commercial usage rights included
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sample cart data for demonstration
// const sampleCartData = [
//   { id: 1, name: 'Backdrop', text: 'Elegant backdrop style with smooth transitions', cost: 5, image: '/api/placeholder/150/100', category: 'Premium' },
//   { id: 2, name: 'Highlight', text: 'Bright highlight effect for important text', cost: 3, image: '/api/placeholder/150/100', category: 'Basic' },
//   { id: 3, name: 'Glow', text: 'Stunning glow animation with neon effects', cost: 8, image: '/api/placeholder/150/100', category: 'Premium' },
//   { id: 4, name: 'Classic', text: 'Timeless classic design for all content', cost: 0, image: '/api/placeholder/150/100', category: 'Free' },
//   { id: 5, name: 'Mono', text: 'Clean monospace font styling', cost: 2, image: '/api/placeholder/150/100', category: 'Basic' }
// ];

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState(sampleCartData);
//   const [isCheckingOut, setIsCheckingOut] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [selectedItems, setSelectedItems] = useState(new Set());
//   const [promoCode, setPromoCode] = useState('');
//   const [discount, setDiscount] = useState(0);

//   // Calculate totals
//   const totalCost = cartItems.reduce((sum, item) => sum + item.cost, 0);
//   const selectedCost = cartItems
//     .filter(item => selectedItems.has(item.id))
//     .reduce((sum, item) => sum + item.cost, 0);
//   const freeItemsCount = cartItems.filter(item => item.cost === 0).length;
//   const finalCost = Math.max(0, (selectedItems.size > 0 ? selectedCost : totalCost) - discount);

//   // Remove item from cart
//   const removeFromCart = (itemId) => {
//     setCartItems(prev => prev.filter(item => item.id !== itemId));
//     setSelectedItems(prev => {
//       const newSet = new Set(prev);
//       newSet.delete(itemId);
//       return newSet;
//     });
//   };

//   // Clear entire cart
//   const clearCart = () => {
//     setCartItems([]);
//     setSelectedItems(new Set());
//   };

//   // Toggle item selection
//   const toggleItemSelection = (itemId) => {
//     setSelectedItems(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(itemId)) {
//         newSet.delete(itemId);
//       } else {
//         newSet.add(itemId);
//       }
//       return newSet;
//     });
//   };

//   // Select all items
//   const selectAllItems = () => {
//     if (selectedItems.size === cartItems.length) {
//       setSelectedItems(new Set());
//     } else {
//       setSelectedItems(new Set(cartItems.map(item => item.id)));
//     }
//   };

//   // Apply promo code
//   const applyPromoCode = () => {
//     if (promoCode.toLowerCase() === 'welcome10') {
//       setDiscount(Math.ceil(totalCost * 0.1));
//     } else if (promoCode.toLowerCase() === 'first5') {
//       setDiscount(5);
//     } else {
//       alert('Invalid promo code');
//     }
//   };

//   // Handle checkout
//   const handleCheckout = async () => {
//     if (selectedItems.size === 0 && cartItems.length > 0) {
//       alert('Please select items to checkout');
//       return;
//     }

//     setIsCheckingOut(true);
//     setTimeout(() => {
//       setIsCheckingOut(false);
//       setShowSuccessMessage(true);
      
//       // Remove checked out items
//       if (selectedItems.size > 0) {
//         setCartItems(prev => prev.filter(item => !selectedItems.has(item.id)));
//         setSelectedItems(new Set());
//       } else {
//         setCartItems([]);
//       }
      
//       setTimeout(() => {
//         setShowSuccessMessage(false);
//       }, 3000);
//     }, 1500);
//   };

//   // Get preview styles for templates
//   const getPreviewStyles = (name) => {
//     switch (name) {
//       case "Backdrop":
//         return "bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white";
//       case "Highlight":
//         return "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-black";
//       case "Glow":
//         return "text-cyan-300 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30";
//       case "Mono":
//         return "font-mono text-emerald-700 bg-gray-50 border border-emerald-200";
//       case "Classic":
//       default:
//         return "text-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100";
//     }
//   };

//   const getCategoryColor = (category) => {
//     switch (category) {
//       case 'Premium': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'Basic': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'Free': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   return (
//     <>
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 Shopping Cart
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 {cartItems.length} {cartItems.length === 1 ? 'template' : 'templates'} in your cart
//               </p>
//             </div>
            
//             <button
//               onClick={() => window.history.back()}
//               className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Success Message */}
//       {showSuccessMessage && (
//         <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 text-center font-semibold animate-pulse">
//           🎉 Checkout Successful! Templates have been added to your account
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {cartItems.length === 0 ? (
//           // Empty Cart State
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5a1 1 0 001 1h9a1 1 0 001-1v0a1 1 0 00-1-1H7m0 0v-4a1 1 0 011-1h2M9 21h6" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               Looks like you haven't added any templates yet. Explore our collection and find the perfect style for your videos!
//             </p>
//             <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
//               Browse Templates
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Cart Items Section */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Bulk Actions */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex flex-wrap items-center justify-between gap-4">
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={selectAllItems}
//                       className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
//                     >
//                       <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
//                         selectedItems.size === cartItems.length 
//                           ? 'bg-purple-600 border-purple-600' 
//                           : 'border-gray-300 hover:border-purple-400'
//                       }`}>
//                         {selectedItems.size === cartItems.length && (
//                           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </div>
//                       {selectedItems.size === cartItems.length ? 'Deselect All' : 'Select All'}
//                     </button>
                    
//                     {selectedItems.size > 0 && (
//                       <span className="text-sm text-gray-600">
//                         {selectedItems.size} selected
//                       </span>
//                     )}
//                   </div>
                  
//                   <button
//                     onClick={clearCart}
//                     className="text-red-500 hover:text-red-700 font-medium transition-colors flex items-center gap-2"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear Cart
//                   </button>
//                 </div>
//               </div>

//               {/* Cart Items */}
//               <div className="space-y-4">
//                 {cartItems.map((item, index) => (
//                   <div
//                     key={item.id}
//                     className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 transform hover:scale-[1.01] ${
//                       selectedItems.has(item.id) ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
//                     }`}
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <div className="flex items-start gap-6">
//                       {/* Selection Checkbox */}
//                       <button
//                         onClick={() => toggleItemSelection(item.id)}
//                         className="mt-2"
//                       >
//                         <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
//                           selectedItems.has(item.id) 
//                             ? 'bg-purple-600 border-purple-600' 
//                             : 'border-gray-300 hover:border-purple-400'
//                         }`}>
//                           {selectedItems.has(item.id) && (
//                             <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                             </svg>
//                           )}
//                         </div>
//                       </button>

//                       {/* Template Preview */}
//                       <div className={`w-32 h-20 rounded-xl flex items-center justify-center text-sm font-medium transition-transform hover:scale-105 ${getPreviewStyles(item.name)}`}>
//                         {item.name}
//                       </div>

//                       {/* Template Details */}
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
//                             <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
//                               {item.category}
//                             </div>
//                           </div>
                          
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 group"
//                             title="Remove from cart"
//                           >
//                             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           </button>
//                         </div>
                        
//                         <p className="text-gray-600 mb-4">{item.text}</p>
                        
//                         <div className="flex items-center justify-between">
//                           <span className={`text-lg font-bold ${
//                             item.cost === 0 
//                               ? 'text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full' 
//                               : 'text-purple-600'
//                           }`}>
//                             {item.cost === 0 ? 'FREE' : `${item.cost} credits`}
//                           </span>
                          
//                           <div className="flex items-center gap-2 text-sm text-gray-500">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                             </svg>
//                             Instant Download
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Order Summary Sidebar */}
//             <div className="space-y-6">
//               {/* Order Summary */}
//               <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Total Items:</span>
//                     <span className="font-medium">{cartItems.length}</span>
//                   </div>
                  
//                   {selectedItems.size > 0 && (
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-purple-600">Selected:</span>
//                       <span className="font-medium text-purple-600">{selectedItems.size}</span>
//                     </div>
//                   )}
                  
//                   {freeItemsCount > 0 && (
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-emerald-600">Free Templates:</span>
//                       <span className="font-medium text-emerald-600">{freeItemsCount}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Subtotal:</span>
//                     <span className="font-medium">
//                       {(selectedItems.size > 0 ? selectedCost : totalCost)} credits
//                     </span>
//                   </div>
                  
//                   {discount > 0 && (
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-green-600">Discount:</span>
//                       <span className="font-medium text-green-600">-{discount} credits</span>
//                     </div>
//                   )}
                  
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span>Total:</span>
//                       <span className={`${finalCost === 0 ? 'text-emerald-600' : 'text-purple-600'}`}>
//                         {finalCost === 0 ? 'FREE' : `${finalCost} credits`}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Promo Code */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Promo Code
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={promoCode}
//                       onChange={(e) => setPromoCode(e.target.value)}
//                       placeholder="Enter code"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                     <button
//                       onClick={applyPromoCode}
//                       className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
//                     >
//                       Apply
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">Try: WELCOME10 or FIRST5</p>
//                 </div>

//                 {/* Checkout Button */}
//                 <button
//                   onClick={handleCheckout}
//                   disabled={isCheckingOut}
//                   className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
//                 >
//                   {isCheckingOut ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                       </svg>
//                       {selectedItems.size > 0 ? `Checkout Selected (${selectedItems.size})` : 'Checkout All'}
//                     </>
//                   )}
//                 </button>

//                 {/* Security Notice */}
//                 <div className="text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
//                   🔒 Secure checkout • Credits deducted from account balance
//                 </div>
//               </div>

//               {/* Additional Info */}
//               <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6">
//                 <h3 className="font-bold text-gray-800 mb-3">Why Choose Our Templates?</h3>
//                 <ul className="space-y-2 text-sm text-gray-700">
//                   <li className="flex items-center gap-2">
//                     <span className="text-green-500">✓</span>
//                     Instant download after purchase
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <span className="text-green-500">✓</span>
//                     Compatible with all major video editors
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <span className="text-green-500">✓</span>
//                     Lifetime updates and support
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <span className="text-green-500">✓</span>
//                     Commercial usage rights included
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
// </>
//   );
// }

// export default function Cart({ cartItems, onRemove, onCheckout, totalCredits }) {
//   return (
//     <>
//     <Header />
//       <aside className="w-full md:w-96 bg-white border-l shadow-lg p-6 h-full flex flex-col">
//         <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-blue-700">🛒 Your Cart</h2>

//         {/* Empty State */}
//         {cartItems?.length === 0 ? (
//           <p className="text-gray-500 text-center mt-12">Your cart is empty.</p>
//         ) : (
//           <>
//             {/* Cart Items List */}
//             <ul className="flex-1 overflow-y-auto space-y-4">
//               {cartItems?.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
//                 >
//                   <div>
//                     <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
//                     <p className="text-sm text-gray-500">{item.cost === 0 ? "Free" : `${item.cost} coins`}</p>
//                   </div>
//                   <button
//                     onClick={() => onRemove(item)}
//                     className="text-red-600 hover:text-red-800 font-bold text-sm"
//                   >
//                     ✕
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             {/* Total & Checkout */}
//             <div className="mt-6 border-t pt-4">
//               <div className="flex justify-between text-lg font-semibold text-gray-700 mb-4">
//                 <span>Total:</span>
//                 <span>{totalCredits === 0 ? "Free" : `${totalCredits} coins`}</span>
//               </div>
//               <button
//                 onClick={onCheckout}
//                 disabled={cartItems?.length === 0}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition"
//               >
//                 Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </aside>
//     </>
//   );
// }
