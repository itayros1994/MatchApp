import React from 'react';
import nemo from '../assets/imgs/nemoDemo.jpg';
import { IconTrash } from './icon-cmps/IconTrash';
import { IconEdit } from './icon-cmps/IconEdit';
// import pitch from '../assets/imgs/pitch.jpg';
// import bball from '../assets/imgs/bball.jpg';
// import beach from '../assets/imgs/beach.jpg';
// import running from '../assets/imgs/running.jpg';

import { Link } from 'react-router-dom';

export class EventPreviewMyProfile extends React.Component {
  state = {
    isEditable: false,
  };

  componentDidMount() {
    if (this.props.isEditable) this.setState({ isEditable: true });
    this.setTypeIcon();
  }

  setTypeIcon = () => {
    const { type } = this.props.event;
    if (type === 'Football') this.props.event.typeIcon = '⚽';
    if (type === 'VolleyBall') this.props.event.typeIcon = '🏐';
    if (type === 'Basketball') this.props.event.typeIcon = '🏀';
    if (type === 'Running') this.props.event.typeIcon = '🏃🏼‍♂️';
  };

  render() {
    const { event, onRemoveEvent } = this.props;
    let eventActions = (
      <div className="event-actions-profile">
        <button
          className="delete-button"
          onClick={() => {
            console.log('there');
            onRemoveEvent(event._id);
          }}
        >
          <IconTrash />
        </button>
        <Link to={`/create/${event._id}`}>
          <button>
            <IconEdit />
          </button>
        </Link>
      </div>
    );
    return (
      <div className="event-preview-profile">
        <Link to={`/event/${event._id}`} className="preview-link-profile">
          <div className="event-preview-img">
            <img src={event.imgs[0]} alt="" className="preview-img" />
          </div>
          <div className="preview-details">
            <h2 className="event-title-profile">{event.title}</h2>
            <h4 className="preview-date-time">{`${event.eventDate} - ${event.eventTime}`}</h4>
            <p>{event.location}</p>
          </div>
          <div className="counter">
            <p>{`${event.members.length}/${event.capacity} JOINED`}</p>
            <div className="preview-type-rate">
              {/* <h5>{event.typeIcon}</h5> */}
            </div>
          </div>
        </Link>
        {this.state.isEditable ? eventActions : null}
      </div>
    );
  }
}
