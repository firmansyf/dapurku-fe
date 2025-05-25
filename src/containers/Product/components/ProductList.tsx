import Link from 'next/link';
import CardProduct from '../elements/CardProduct';
import { ProductData } from '@/types/containers/product'
import { PATHS } from '@/helpers/constants';


interface PopularProductsProps {
    products: ProductData[]
}
  
const ProductList: React.FC<PopularProductsProps> = ({ products }) => {
    return (
        <div>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold border-b-2 border-green-500 pb-1">Produk Terbaru</h2>
            <Link href={PATHS.product}  className="text-green-500">Lihat Semua</Link>
          </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
               {products && products.map((product, i) => (
                <div key={i} className='mb-4'>
                    <CardProduct product={product as ProductData} />
                </div>
               ))}
            </div>
            
        </div>
    );
  };
  
export default ProductList