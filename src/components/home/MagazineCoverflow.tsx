import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useMagazines } from '@/hooks/useMagazines';
import { ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MagazineCoverflow = () => {
  const { data: magazines = [] } = useMagazines();
  
  // Use a subset of magazines or placeholders if empty
  const displayMagazines = magazines.length > 0 ? magazines : [
    { id: 1, title: "Innovation 2025", cover_image_url: "https://businessworldeureka.com/wp-content/uploads/2025/11/approved-Cover-Page-82-1_page-0001.jpg", slug: "innovation-2025" },
    { id: 2, title: "Leadership Today", cover_image_url: "https://businessworldeureka.com/wp-content/uploads/2024/08/Cover-Page_page-0001-scaled.webp", slug: "leadership-today" },
    { id: 3, title: "Tech Trends", cover_image_url: "https://businessworldeureka.com/wp-content/uploads/2024/10/Cover-Page_2-1.webp", slug: "tech-trends" },
    { id: 4, title: "Future of Work", cover_image_url: "https://businessworldeureka.com/wp-content/uploads/2025/11/approved-Cover-Page-82-1_page-0001.jpg", slug: "future-of-work" },
    { id: 5, title: "Global Markets", cover_image_url: "https://businessworldeureka.com/wp-content/uploads/2024/08/Cover-Page_page-0001-scaled.webp", slug: "global-markets" },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Elements matching the dark theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-premium tracking-tight">
            Latest Editions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our collection of exclusive interviews and industry insights.
          </p>
        </div>

        <div className="magazine-coverflow-container">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={500}
            spaceBetween={37}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="w-full py-12"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 37
              },
            }}
          >
            {displayMagazines.map((mag: any) => (
              <SwiperSlide key={mag.id} className="w-[300px] sm:w-[350px] md:w-[400px]">
                <Link to={`/magazine/${mag.slug}`} className="block group relative h-full">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl transition-transform duration-300">
                    <img 
                      src={mag.cover_image_url || "/placeholder.svg"} 
                      alt={mag.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/magazine">
            <button className="px-8 py-3 bg-insightRed text-white font-bold rounded-full hover:bg-insightRed/90 transition-all shadow-lg hover:shadow-insightRed/25 transform hover:-translate-y-1">
              View All Magazines
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
        }
        
        .swiper-slide img {
          display: block;
          width: 100%;
        }
        
        .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.5;
        }
        
        .swiper-pagination-bullet-active {
          background: #ef4444; /* insightRed */
          opacity: 1;
        }
        
        .swiper-button-next, .swiper-button-prev {
          color: #fff;
          background: rgba(0,0,0,0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: #ef4444;
        }
        
        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right {
          background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
        }
      `}</style>
    </section>
  );
};

export default MagazineCoverflow;
