import React from 'react';
import nemo from '../assets/imgs/nemoDemo.jpg';
import { IconTrash } from './icon-cmps/IconTrash';
import { IconEdit } from './icon-cmps/IconEdit';
import { FootballIcon } from './icon-cmps/footballIcon';
import { LocationIcon } from './icon-cmps/Location';
import { IconCalender } from './icon-cmps/IconCalender';

// import pitch from '../assets/imgs/pitch.jpg';
// import bball from '../assets/imgs/bball.jpg';
// import beach from '../assets/imgs/beach.jpg';
// import running from '../assets/imgs/running.jpg';
import { IconStar } from './icon-cmps/IconStar';

import { Link } from 'react-router-dom';
import { utilService } from '../services/utilService';

export class EventPreview extends React.Component {
  state = {
    isEditable: false,
  };

  componentDidMount() {
    if (this.props.isEditable) this.setState({ isEditable: true });
    this.setTypeIcon();
  }

  setTypeIcon = () => {
    const { type } = this.props.event;
    if (type === 'Football') this.props.event.typeIcon = <footballIcon />;
    if (type === 'VolleyBall') this.props.event.typeIcon = '🏐';
    if (type === 'Basketball') this.props.event.typeIcon = '🏀';
    if (type === 'Running') this.props.event.typeIcon = '🏃🏼‍♂️';
  };

  render() {
    const { event, onRemoveEvent } = this.props;
    let date = utilService.getTimeAndDate(event.eventDate);
    let dateString = (
      <h4 className="preview-date-time preview-normal-text"><IconCalender /> 
        <span className="preview-details-month">{date.month} </span> {date.day}
        <span className="preview-details-th">th</span> {date.year} -{' '}
        {event.eventTime}
      </h4>
    );
    let eventActions = (
      <div className="event-actions">
        <button
          onClick={() => {
            console.log('there');
            onRemoveEvent(event._id);
          }}
        >
          <IconTrash />
        </button>
        <button>
          <IconEdit />
        </button>
      </div>
    );
    return (
      <div className="event-preview">
        <Link to={`/event/${event._id}`} className="preview-link">
          <div className="event-preview-img">
            <img src={event.imgs[0]} alt="" className="preview-img" />
          </div>
          <div className="counter">
            <p className="counter-color">{`${event.members.length}/${event.capacity} JOINED`}</p>
          </div>
          <div className="preview-details">
            <div className="preview-type-rate">
            <h5>{event.typeIcon}</h5>
            </div>
            <h2>{event.title}</h2>
            {dateString}
            <h4 className="preview-normal-text"> <LocationIcon /> {event.location} </h4>
            <div className="lower-preview">
              <div className="preview-user-details">
                <img
                  className="preview-user-img"
                  src={event.createdBy.imgUrl}
                  alt=""
                />
                <div className="user-name-rating">
                  <h4>{event.createdBy.fullname}</h4>
                </div>
              </div>
              <h5>
                <IconStar />
                {event.createdBy.rating}(5)
              </h5>
            </div>
          </div>
        </Link>
        {this.state.isEditable ? eventActions : null}
      </div>
    );
  }
}
