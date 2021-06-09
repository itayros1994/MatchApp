import React from 'react';
import football from '../assets/imgs/football-hero.jpg';
import volleyball from '../assets/imgs/volleyball-hero.jpg';
import running from '../assets/imgs/running-hero.jpg';
import petunque from '../assets/imgs/petanque-hero.jpg';
import basketball from '../assets/imgs/basketball-hero.jpg';
import runningFriends from '../assets/imgs/runningfriends-hero.jpg';
import sportBackground from '../assets/imgs/sportbackground.jpg';
import Carousel from 'react-material-ui-carousel';

export class Hero extends React.Component {
  render() {
    return (
      <div className="carousel-container">
        <div>
          <Carousel className="heros-container">
            <img src={volleyball} alt="" />
            <img src={running} alt="" />
            <img src={football} alt="" />
            <img src={basketball} alt="" />
            <img src={petunque} alt="" />
            <img src={runningFriends} alt="" />
            <img src={sportBackground} alt="" />
          </Carousel>
        </div>
      </div>
    );
  }
}
