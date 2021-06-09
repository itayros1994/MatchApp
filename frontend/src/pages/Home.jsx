import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import football from '../assets/imgs/football7.jpg';
import volleyball from '../assets/imgs/volleyball-hero.jpg';
import running from '../assets/imgs/runningnoa.jpg';
import explore from '../assets/imgs/explore.jpg';
import petunque from '../assets/imgs/petanque-hero.jpg';
import basketball from '../assets/imgs/basketballfriends.jpg';
import profie from '../assets/imgs/profieblack.jpg';
import runningFriends from '../assets/imgs/runningfriends-hero.jpg';
import sportBackground from '../assets/imgs/sportbackground.jpg';
import nemo from '../assets/imgs/nemo2.jpg';
import { Hero } from '../cmps/Hero';
import { EventPreview } from '../cmps/EventPreview';
import { loadEvents, removeEvent } from '../store/actions/eventActions';
import { EventListHome } from '../cmps/EventListHome';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import { EventMenu } from '../cmps/EventMenu';
// import InputBase from '@material-ui/core/InputBase'
class _Home extends Component {
  componentDidMount() {
    this.props.loadEvents(this.props.filterBy);
  }
  onRemoveEvent = (eventId) => {
    this.props.removeEvent(eventId);
  };
  render() {
    console.log(this.props.gEvents);
    return (
      <div className="main-app-container">
        
        <Hero />
        <div className="menu-container">
          <EventMenu />
        </div>
        <div className="main-list-container">
          <h1 className="featured-event-header">
            Upcoming Events
          </h1>
          <section className="event-list-container">
            <EventListHome
              events={this.props.gEvents}
              onRemoveEvent={this.onRemoveEvent}
            />
          </section>
        </div>
        <section className="categories-gallery ">
          <div className="gallery-item football-gallery" 
          onClick={()=>this.props.history.push('/event')} >
            <h2>Football</h2>
            <h3 className="see-more">See more!</h3>
            <div class="overlay"></div>
            <img src={football} alt="bemo" />
          </div>
          <div className="gallery-item basketball-gallery"
          onClick={()=>this.props.history.push('/event')}>
            <h2>Basketball</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={basketball} alt="" />
          </div>
          <div className="gallery-item volleyball-gallery"
          onClick={()=>this.props.history.push('/event')}>
            <h2 className="gallery-h2">Volleyball</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={volleyball} alt="bemo" />
          </div>
          <div className="gallery-item running-gallery"
          onClick={()=>this.props.history.push('/event')}>
            <h2>Running</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={running} alt="" />
          </div>
          <div className="gallery-item profile-gallery"
          onClick={()=>this.props.history.push('/myevents')}>
            <h2>My Profile</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={profie} alt="" />
          </div>
          <div className="gallery-item explore-gallery"
          onClick={()=>this.props.history.push('/event')}>
            <h2>Explore</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={explore} alt="" />
          </div>
        </section>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    gEvents: state.eventModule.events,
    filterBy: state.eventModule.filterBy,
  };
}
const mapDispatchToProps = {
  loadEvents,
  removeEvent,
};
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
