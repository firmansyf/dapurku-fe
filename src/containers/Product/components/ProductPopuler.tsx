import { Swiper, SwiperSlide, SwiperRef} from 'swiper/react';
import Link from 'next/link';
import CardProduct from '../elements/CardProduct';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';
import { useRef, useState } from 'react';

interface PopularProductsProps {
    products: any[]
}
  
    const ProductPopuler: React.FC<PopularProductsProps> = ({ products }) => {
    const [currentProductSlide, currentProductSlideSet] = useState(0);
    const swiperRef = useRef<null | SwiperRef>(null);
    return (
        <div>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold border-b-2 border-green-500 pb-1">Jajanan Populer</h2>
             <Link href="/products" className="text-green-500">Lihat Semua</Link>
          </div>
        
          <section className={`relative gap-x-10 overflow-hidden w-full lg:overflow-visible`}>
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: {
                slidesPerView: 2,
                },
                768: {
                slidesPerView: 3,
                },
                1024: {
                slidesPerView: 4,
                },
              }}
              onSlideChange={(e) => currentProductSlideSet(e.activeIndex)}
              initialSlide={currentProductSlide}
              ref={swiperRef}
             >
               {products && products.map((product, i) => (
                 <SwiperSlide key={i}>
                    <CardProduct product={product} />
                 </SwiperSlide>
               ))}
            </Swiper>
                
              <div className="absolute -left-[2%] -right-[2%] top-0 hidden h-full items-center justify-between xl:flex">
                {currentProductSlide !== 0 ? (
                <div
                    role="button"
                    className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-md hover:scale-[1.1]"
                    onClick={() => swiperRef.current?.swiper.slidePrev(1000)}
                >
                    <IoChevronBack />
                </div>
                ) : (
                <div />
                )}
                {!swiperRef.current?.swiper.isEnd ? (
                <div
                    role="button"
                    className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-md hover:scale-[1.1]"
                    onClick={() => swiperRef.current?.swiper.slideNext(1000)}
                >
                    <IoChevronForward />
                </div>
                ) : (
                <div />
                )}
            </div>
         </section>
        </div>
    );
  };
  
export default ProductPopuler