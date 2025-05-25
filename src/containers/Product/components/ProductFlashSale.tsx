import { Swiper, SwiperSlide, SwiperRef} from 'swiper/react';
import CardProduct from '../elements/CardProduct';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';
import { useRef, useState, useEffect } from 'react';
import { formatTime } from '@/helpers/commons';

interface PopularProductsProps {
    products: any[]
}
  
const ProductFlashSale: React.FC<PopularProductsProps> = ({ products }) => {
    const FIVE_HOURS_IN_MS = 5 * 60 * 60 * 1000;
    const [currentProductSlide, currentProductSlideSet] = useState(0);
    const swiperRef = useRef<null | SwiperRef>(null);
    const [timeLeft, setTimeLeft] = useState(FIVE_HOURS_IN_MS);
    
    
    useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  
     return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
            <div className='flex items-center gap-x-3'>
                <h2 className="text-xl font-bold pb-1">Flash Sale</h2>
                <span className='bg-red-400 px-2 pb-1 text-white font-semibold text-sm rounded-md'>HOT</span>
                </div>
                
                <div className='flex gap-x-2 text-sm'>
                    <span className='opacity-65 tracking-wide'>Berakhir dalam:</span>
                    <span className='text-red-400 font-semibold'>{formatTime(timeLeft)}</span>
                </div>
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
  
export default ProductFlashSale