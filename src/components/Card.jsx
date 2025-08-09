
import { useDispatch, useSelector } from "react-redux";
import sampleData from "../utils/sampleData";
import { addToCart, removeFromCart } from "../features/cart";
import toast from "react-hot-toast";

function getPreviewStyles(name) {
  switch (name) {
    case "Backdrop":
      return "bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white shadow-lg";
    case "Highlight":
      return "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-black shadow-lg";
    case "Glow":
      return "text-cyan-300 bg-black shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-cyan-500/30 font-semibold";
    case "Mono":
      return "font-mono text-emerald-700 bg-gray-50 border border-emerald-200";
    case "Classic":
    default:
      return "text-slate-700 bg-blue-50 border border-blue-100";
  }
}

function getCardGradient(name) {
  switch (name) {
    case "Backdrop":
      return "from-purple-100 to-blue-100";
    case "Highlight":
      return "from-yellow-100 to-orange-100";
    case "Glow":
      return "from-cyan-100 to-teal-100";
    case "Mono":
      return "from-emerald-100 to-green-100";
    case "Classic":
    default:
      return "from-blue-100 to-indigo-100";
  }
}

function getButtonStyle(name) {
  switch (name) {
    case "Backdrop":
      return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700";
    case "Highlight":
      return "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black";
    case "Glow":
      return "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700";
    case "Mono":
      return "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700";
    case "Classic":
    default:
      return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
  }
}

export default function Card() {
    const {purchasedItems, cartItems} = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    function handlerCart(template) {
        let isTemplatePresentInCart = cartItems.some((cartItem) => cartItem.name === template.name);
        
        if(isTemplatePresentInCart){
            toast.success("Template removed from cart")
        dispatch(removeFromCart(template))
        }else {
            toast.success("Template added to cart")
            dispatch(addToCart(template))
        }
    }
    
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Template Gallery
        </h1>
        <p className="text-md text-gray-600 mt-2 max-w-2xl mx-auto">
          Pick a subtitle style that fits your content
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
        {sampleData.map((template, index) => (
          <div
            key={template.name}
            className={`bg-gradient-to-br ${getCardGradient(template.name)} rounded-2xl shadow-md border border-white/20 
              transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1
              flex flex-col justify-between p-6 min-h-[280px]`}
          >
            {/* Title + Badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{template.name}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  template.cost === 0
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {template.type}
                </span>
              </div>

              {/* Preview */}
              <div className={`rounded-xl p-4 text-center text-sm mb-6 ${getPreviewStyles(template.name)}`}>
                {template.text}
              </div>
            </div>

            {/* Footer: Cost & Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto pt-4 border-t border-white/30">
              <div>
                <span className="font-semibold text-gray-800 text-base">
                  {template.cost === 0 ? "Free" : `${template.cost} coins`}
                </span>
              </div>

              <button
                onClick={() => handlerCart(template)}
                disabled={purchasedItems?.some( temp => temp.id === template.id)}
                className={`text-sm text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300 w-full cursor-pointer sm:w-auto ${getButtonStyle(template.name)}`}
              >
                {
                purchasedItems?.some(temp => temp.id === template.id) ? 'Purchased' : cartItems?.some( temp => temp.id === template.id) ? 'Remove' : 'Add to Cart' 
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




// import sampleData from "../utils/sampleData";

// function getPreviewStyles(name) {
//   switch (name) {
//     case "Backdrop":
//       return "bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white shadow-lg";
//     case "Highlight":
//       return "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-black shadow-lg";
//     case "Glow":
//       return "text-cyan-300 bg-gradient-to-br from-gray-900 to-black shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-cyan-500/30 font-semibold";
//     case "Mono":
//       return "font-mono text-emerald-700 bg-gray-50 border border-emerald-200";
//     case "Classic":
//     default:
//       return "text-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100";
//   }
// }

// function getCardGradient(name) {
//   switch (name) {
//     case "Backdrop":
//       return "from-purple-100 to-blue-100";
//     case "Highlight":
//       return "from-yellow-100 to-orange-100";
//     case "Glow":
//       return "from-cyan-100 to-teal-100";
//     case "Mono":
//       return "from-emerald-100 to-green-100";
//     case "Classic":
//     default:
//       return "from-blue-100 to-indigo-100";
//   }
// }

// function getButtonStyle(name) {
//   switch (name) {
//     case "Backdrop":
//       return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25";
//     case "Highlight":
//       return "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-orange-500/25 text-black";
//     case "Glow":
//       return "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 shadow-lg hover:shadow-cyan-500/25";
//     case "Mono":
//       return "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-emerald-500/25";
//     case "Classic":
//     default:
//       return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25";
//   }
// }

// export default function Card({ onAddToCart }) {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
//           Template Gallery
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Choose from our collection of beautifully designed templates
//         </p>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
//         {sampleData.map((template, index) => (
//           <div
//             key={template.name}
//             className={`bg-gradient-to-br ${getCardGradient(template.name)} rounded-2xl shadow-lg border-2 border-white/20 
//               hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out 
//               group p-6 flex flex-col justify-between min-h-[280px] backdrop-blur-sm relative overflow-hidden
//               animate-[fadeInUp_0.6s_ease-out_${index * 0.1}s_both]`}
//             style={{
//               animationDelay: `${index * 0.1}s`
//             }}
//           >
//             {/* Decorative background pattern */}
//             <div className="absolute inset-0 opacity-5">
//               <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-45"></div>
//             </div>
            
//             {/* Title */}
//             <div className="relative z-10">
//               <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
//                 {template.name}
//                 <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 mt-1"></div>
//               </h2>

//               {/* Subtitle Preview */}
//               <div
//                 className={`mb-6 p-4 rounded-xl text-sm font-medium text-center transition-all duration-500 
//                   min-h-[80px] flex items-center justify-center relative overflow-hidden
//                   group-hover:scale-105 transform-gpu
//                   ${getPreviewStyles(template.name)}
//                 `}
//               >
//                 <div className="relative z-10">
//                   {template.text}
//                 </div>
//                 {/* Animated shine effect */}
//                 <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
//               </div>
//             </div>

//             {/* Footer: Cost & Button */}
//             <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-white/30 relative z-10">
//               <div className="flex flex-col">
//                 <span
//                   className={`text-lg font-bold ${
//                     template.cost === 0 
//                       ? "text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full text-sm" 
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {template.cost === 0 ? "FREE" : `${template.cost} coins`}
//                 </span>
//                 {template.cost === 0 && (
//                   <span className="text-xs text-emerald-500 font-medium mt-1">No cost!</span>
//                 )}
//               </div>
              
//               <button
//                 onClick={() => onAddToCart?.(template)}
//                 className={`text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 
//                   transform hover:scale-110 active:scale-95 relative overflow-hidden group/btn
//                   ${getButtonStyle(template.name)}
//                 `}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Add to Cart
//                   <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                 </span>
//                 {/* Button shine effect */}
//                 <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
//               </button>
//             </div>

//             {/* Card number badge */}
//             <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-gray-700 border border-white/30">
//               {index + 1}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom decorative section */}
//       <div className="mt-16 text-center">
//         <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full">
//           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//           <span className="text-sm font-medium text-gray-600">
//             {sampleData.length} templates available
//           </span>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// import sampleData from "../utils/sampleData";

// function getPreviewStyles(name) {
//   switch (name) {
//     case "Backdrop":
//       return "bg-black bg-opacity-60 text-white";
//     case "Highlight":
//       return "bg-yellow-300 text-black";
//     case "Glow":
//       return "text-white bg-[#101010] shadow-[0_0_12px_#0ff] font-semibold";
//     case "Mono":
//       return "font-mono text-gray-700";
//     case "Classic":
//     default:
//       return "text-gray-700";
//   }
// }

// export default function Card({ onAddToCart }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-10">
//       {sampleData.map((template) => (
//         <div
//           key={template.name}
//           className="bg-white rounded-xl shadow-md border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group p-5 flex flex-col justify-between"
//         >
//           {/* Title */}
//           <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
//             {template.name}
//           </h2>

//           {/* Subtitle Preview */}
//           <div
//             className={`mb-4 p-3 rounded text-sm font-medium text-center transition-all duration-300 
//               border border-dashed border-gray-200 shadow-inner min-h-[60px] flex items-center justify-center 
//               ${getPreviewStyles(template.name)}
//             `}
//           >
//             {template.text}
//           </div>

//           {/* Footer: Cost & Button */}
//           <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
//             <span
//               className={`text-sm font-medium ${
//                 template.cost === 0 ? "text-green-600" : "text-gray-600"
//               }`}
//             >
//               {template.cost === 0 ? "Free" : `${template.cost} coins`}
//             </span>
//             <button
//               onClick={() => onAddToCart?.(template)}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// export default function Card({ onAddToCart }) {
    
//   return (
//     <div className=" w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-6">
//       {sampleData.map((template) => (
//         <div
//           key={template.name}
//           className="bg-white border rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
//         >
//           {/* Title */}
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">{template.name}</h2>

//           {/* Subtitle Preview */}
//           <p className={`mb-4 py-2 px-3 rounded text-sm
//             ${template.name === "Backdrop" && "bg-black bg-opacity-70 text-white"}
//             ${template.name === "Highlight" && "bg-yellow-300 text-black"}
//             ${template.name === "Glow" && "text-white shadow-[0_0_8px_rgba(0,255,255,0.8)]"}
//             ${template.name === "Mono" && "font-mono text-gray-800"}
//             ${template.name === "Classic" && "text-gray-700"}
//           `}>
//             {template.text}
//           </p>

//           {/* Footer: Cost & Button */}
//           <div className="flex justify-between items-center mt-auto">
//             <span className={`text-sm font-medium ${template.cost === 0 ? "text-green-600" : "text-gray-600"}`}>
//               {template.cost === 0 ? "Free" : `${template.cost} coins`}
//             </span>

//             <button
//             //   onClick={() => onAddToCart?.(template)}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded transition"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }