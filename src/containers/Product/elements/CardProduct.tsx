import { FaHeart, FaShoppingCart, FaStar, FaRegHeart, FaRegStar} from 'react-icons/fa';
import { BiCartAlt } from "react-icons/bi";
import { useState } from 'react';
import Image from 'next/image';
import { ProductCardProps } from '@/types/containers/product'
import { currencyFormat } from '@/helpers/commons';
import { Spinner } from '@/components/commons';
  
const CardProduct: React.FC<ProductCardProps> = ({
  product,
  wishlist = false,
  handleAddToCart,
  loadingSpinner
}) => {
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
            src={product.image as string}
            alt={product.name as string}
            className="object-cover"
            fill
          />
        </div>
        <div className="py-4">
          <h3 className="text-lg font-medium">{product?.name || '-'}</h3>
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
              Rp{currencyFormat(product.price)}
            </span>
            <div className="flex gap-2">
              {wishlist && (
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
              )}

              <button
                onClick={() => handleAddToCart?.(product)}
                className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center relative overflow-hidden group"
              >
                {loadingSpinner === product.id ? (
                  <span className='p-2'>
                    <Spinner size={40} colorClass="border-blue-500" /> 
                  </span>
                ): (
                    <>
                      <BiCartAlt className="text-green-600 text-lg transition-opacity duration-200 group-hover:opacity-0" />
                      <FaShoppingCart className="text-green-500 absolute transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                    </>
                )}
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