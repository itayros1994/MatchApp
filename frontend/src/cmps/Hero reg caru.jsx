import React from 'react';
import football from '../assets/imgs/football-hero.jpg';
import volleyball from '../assets/imgs/volleyball-hero.jpg';
import running from '../assets/imgs/running-hero.jpg';
import petunque from '../assets/imgs/petanque-hero.jpg';
import basketball from '../assets/imgs/basketball-hero.jpg';
import runningFriends from '../assets/imgs/runningfriends-hero.jpg';
import sportBackground from '../assets/imgs/sportbackground.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

export class Hero extends React.Component {
  render() {
    return (
      <article className="carousel-container">
        <Swiper className="heros-container"
          spaceBetween={1}
          slidesPerView={2}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide><img src={volleyball} alt="" /></SwiperSlide>
          <SwiperSlide><img src={running} alt="" /></SwiperSlide>
          <SwiperSlide><img src={football} alt="" /></SwiperSlide>
          <SwiperSlide><img src={basketball} alt="" /></SwiperSlide>
          <SwiperSlide><img src={petunque} alt="" /></SwiperSlide>
          <SwiperSlide><img src={runningFriends} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sportBackground} alt="" /></SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
          <SwiperSlide>Slide 10</SwiperSlide>
      ...
      </Swiper>
      </article>
    )
  }
}