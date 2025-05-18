import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { FaRegHeart, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { ProductData } from '@/types/containers/product'
  
const CardProduct: React.FC<{ product: ProductData }> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    const renderStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const halfStar = rating - fullStars >= 0.5;
      
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(<FaStar key={i} className="text-yellow-400" />);
        } else if (i === fullStars && halfStar) {
          stars.push(<FaStar key={i} className="text-yellow-400" />);
        } else {
          stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
      }
      
      return stars;
    };
    
    return (
      <div className="bg-white w-full max-w-sm rounded-lg shadow-sm overflow-hidden">
        <div className="relative bg-gray-200 h-48 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover"
            fill
          />
        </div>
        <div className="py-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded mr-2">
              Dapur mba Heni
            </span>
          </div>
          <div className="flex items-center mt-1">
            <div className="flex">
              {renderStars(4.4)}
            </div>
            <span className="text-sm text-gray-500 ml-1">({120})</span>
          </div>

          <p className="text-sm text-gray-500 mt-1 truncate w-11/12">{product.description}</p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-green-500 font-bold">
              Rp{product.price.toLocaleString()}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center"
              >
                {isFavorite ? (
                  <FaHeart className="text-green-500" />
                ) : (
                  <FaRegHeart className="text-green-500" />
                )}
              </button>
              <button className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <FaShoppingCart className="text-green-500" />
              </button>
            </div>
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded mt-3 font-medium">
            Beli sekarang
          </button>
        </div>
      </div>
   );
};
  

export default CardProduct