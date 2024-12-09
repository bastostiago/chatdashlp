"use client";

import { markdownify } from "@lib/utils/textConverter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Scrollbar } from "swiper/modules";

const Features = ({ features }) => {
  const paginationRef = useRef(null);
  const [swiperRef, setSwiperRef] = useState(null);

  // Ensure pagination is linked after Swiper instance is created
  useEffect(() => {
    if (swiperRef) {
      swiperRef.params.pagination.el = paginationRef.current;
      swiperRef.pagination.init();
      swiperRef.pagination.render();
      swiperRef.pagination.update();
    }
  }, [swiperRef]);

  return (
    <section className="section">
      <div className="container text-center">
        <div className="animate">
          <p className="uppercase">{features.sub_title}</p>
          {markdownify(features.title, "h2", "mt-4 section-title")}
          {markdownify(features.description, "p", "mt-10")}
        </div>
        <div className="animate from-right relative mt-10">
          <Swiper
            onSwiper={setSwiperRef}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
              dynamicBullets: true,
            }}
          >
            {features.list.map((item, index) => (
              <SwiperSlide key={"feature-" + index}>
                <div className="feature-card m-4 rounded-md border border-transparent px-7 py-16 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-none">
                  <div className="feature-card-icon inline-flex h-20 w-20 items-center justify-center rounded-md border text-primary">
                  <FeatherIcon icon={item.icon} />
                  </div>
                  <h3 className="h4 mb-5 mt-6">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="relative mt-9 flex justify-center">
            <div className="pagination" ref={paginationRef}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
