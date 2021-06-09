import React from 'react';
import basketball from '../assets/imgs/basketball-hero.jpg';
import finishVolley from '../assets/imgs/1.jpg';
import finishRunning from '../assets/imgs/runningsunset.jpg';
import finishfootball from '../assets/imgs/4.jpg';
import footwalk from '../assets/imgs/5.jpg';
import volley from '../assets/imgs/8.jpg';
import night from '../assets/imgs/9.jpg';
import 'swiper/swiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from 'swiper/core';
SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);
// Import Swiper styles

export class Hero extends React.Component {
  render() {
    return (
      <section className="carousel-container">
        <>
          <div className="search-home">
            <h1 className="slogan">
              A World Of Sports Events<span className="blue-point">.</span>
            </h1>
            <div className="search-container">
              <input
                type="search"
                name=""
                id=""
                className="search-bar"
                placeholder="Search Events"
              />
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 5000,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="heros-container"
          >
            <SwiperSlide>
              <div className="overlay"></div>
              <img className="img-hero" src={night} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="overlay"></div>
              <img className="img-hero" src={finishRunning} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="overlay"></div>
              <img className="img-hero" src={basketball} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="overlay"></div>
              <img className="img-hero" src={finishfootball} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="overlay"></div>
              <img className="img-hero" src={footwalk} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="overlay"></div>
              <img className="img-hero" src={volley} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="overlay"></div>
              <img className="img-hero" src={finishVolley} alt="" />
            </SwiperSlide>
          </Swiper>
        </>
      </section>
    );
  }
}
