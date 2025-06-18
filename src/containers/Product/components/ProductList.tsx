import Link from 'next/link';
import CardProduct from '../elements/CardProduct';
import { ProductData } from '@/types/containers/product'
import { PATHS } from '@/helpers/constants';
import { useAddCartMutation, useQueriesGetCart } from '@/api/user/cart';
import toast from 'react-hot-toast';
import { useState } from 'react'
import { useGlobalState } from '@/context/authContextProvider';

interface PopularProductsProps {
    products: ProductData[]
}
  
const ProductList: React.FC<PopularProductsProps> = ({ products }) => {
  const { state } = useGlobalState()
  const { mutateAsync: postCart } = useAddCartMutation()
  const { refetch } = useQueriesGetCart({ page: 1 })
  
  const [cartLoading, setCartLoading] = useState<number | null>(null);

  const handleAddToCart = async (product: ProductData) => {
    const id = product.id as number;
    setCartLoading(id)

    if (!state.isAuthenticated) {
      alert('Maaf Anda saat ini belum login')
      setCartLoading(null)
    }

    try {
      const params = {
        product_id: product.id as number,
        quantity: 1
      }
      await postCart(params).then((res) => {
        refetch()
        toast.success(res.message)
        setCartLoading(null);
      }).catch(() => setTimeout(() => setCartLoading(null),500))
    } catch {
      setTimeout(() => setCartLoading(null),500)
    }
  }

  console.log('cartLoading :', cartLoading)

  return (
        <div>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold border-b-2 border-green-500 pb-1">Produk Terbaru</h2>
            <Link href={PATHS.product}  className="text-green-500">Lihat Semua</Link>
          </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
               {products && products.map((product, i) => (
                <div key={i} className='mb-4'>
                  <CardProduct 
                    handleAddToCart={handleAddToCart}
                    product={product as ProductData} 
                    loadingSpinner={cartLoading as number}
                  />
                </div>
               ))}
            </div>
            
        </div>
    );
  };
  
export default ProductList