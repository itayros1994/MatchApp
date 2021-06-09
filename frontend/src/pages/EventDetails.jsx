import nemo from '../assets/imgs/nemoDemo.jpg';
import React from 'react';
import { connect } from 'react-redux';
import { BallLoader } from '../cmps/icon-cmps/ballLoader';
import { IconBack } from '../cmps/icon-cmps/IconBack';
import {
  getEventById,
  clearEvent,
  updateEvent,
} from '../store/actions/eventActions';
import { utilService } from '../services/utilService';

import MapContainer from '../cmps/GoogleMap';
import { EventJoin } from '../cmps/EventJoin';
import { EventPostList } from '../cmps/EventPostList';
import { IconUsers } from '../cmps/icon-cmps/IconUsers';
import { IconCalender } from '../cmps/icon-cmps/IconCalender';
import { socketService } from '../services/socketService';
import { Snackbar } from '@material-ui/core';

class _EventDetails extends React.Component {
  state = {
    event: null,
    posts: [],
    actionMessage: '',
    showMsg: false,
  };

  async componentDidMount() {
    const { eventId } = this.props.match.params;
    await this.loadEvent();
    await socketService.emit('chat topic', eventId);
    await socketService.on('chat addMsg', this.addPost);
    await socketService.on('event updateMember', this.updateEventMembers);
  }

  async componentWillUnmount() {
    this.props.clearEvent();
    await socketService.off('chat topic', this.props.event._id);
    await socketService.off('chat addMsg', this.addPost);
    await socketService.off('event updateMember');
    socketService.terminate();
  }

  loadEvent = async () => {
    const { eventId } = this.props.match.params;
    // console.log(eventId);
    const event = await this.props.getEventById(eventId);
    // console.log('updatedEvent', event.members);
    this.setState({ event, posts: this.props.event.posts });
  };

  addMsg = async (post) => {
    await socketService.emit('chat newMsg', post);
  };

  addPost = async (post) => {
    const { event } = this.props;
    event.posts.unshift(post);
    await this.props.updateEvent(event);
    this.loadEvent();
  };

  updateEventMembers = (member) => {
    this.setState({ isMember: member.isMember });
    if (member._id === this.props.loggedInUser._id) {
      this.setState({
        actionMessage: `You ${
          member.isMember ? 'joined' : 'left'
        } the event succesfully`,
      });
    } else {
      this.setState({
        actionMessage: `${member.fullname} has ${
          member.isMember ? 'joined' : 'left'
        } the event`,
      });
    }
    this.setState({ showMsg: true });
    this.loadEvent();
  };

  removePost = (postId) => {
    console.log('Hello');
    const updatedEvent = this.props.event;
    const postIdx = this.props.event.posts.findIndex(
      (post) => post.id === postId
    );
    updatedEvent.posts.splice(postIdx, 1);
    this.props.updateEvent(updatedEvent);
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showMsg: false });
  };

  render() {
    const { event, actionMessage, showMsg, isMember } = this.state;
    const { loggedInUser, updateEvent } = this.props;
    let message = (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showMsg}
        autoHideDuration={3000}
        onClose={this.handleClose}
        message={actionMessage}
      />
    );
    if (!event) return <BallLoader />;
    let date = utilService.getTimeAndDate(event.eventDate);
    let dateString = (
      <h4 className="preview-date-time preview-normal-text">
        <span className="preview-details-month">{date.month} </span> {date.day}
        <span className="preview-details-th">th</span> {date.year} -{' '}
        {event.eventTime}
      </h4>
    );

    return (
      <main className="details-main-container">
        <h1 className="event-title">{event.title}</h1>
        <div className="images-container">
          <div className="main-image">
            <img src={event.imgs[0]} alt="" />
          </div>
          <div className="extra-image top-left">
            <img src={event.imgs[1]} alt="" />
          </div>
          <div className="extra-image top-right">
            <img src={event.imgs[2]} alt="" />
          </div>
          <div className="extra-image bottom-left">
            <img src={event.imgs[3]} alt="" />
          </div>
          <div className="extra-image bottom-right">
            <img src={event.imgs[4]} alt="" />
          </div>
        </div>
        <div className="details-container">
          <div className="details-call-to-action">
            <div className="details-info">
              <div className="creator-details">
                <img src={event.createdBy.imgUrl} alt="" />
                <h2 className="details-fullname">
                  <span className="light-blue-text">
                    {event.createdBy.fullname}
                  </span>{' '}
                  - Event Leader
                </h2>
              </div>
              <div className="event-details">
                <h3>
                  <IconUsers />{' '}
                  {`${event.members.length}/${event.capacity} Attending`}
                </h3>
                <h3 className="details-date-time">
                  <IconCalender /> {dateString}
                </h3>
                <p>{event.desc}</p>
              </div>
              <EventPostList
                removePost={this.removePost}
                addMsg={this.addMsg}
                posts={event.posts}
              />
            </div>
            <EventJoin
              event={event}
              loadEvent={this.loadEvent}
              updateEvent={updateEvent}
              loggedInUser={loggedInUser}
            />
          </div>
          <h2>{event.location}</h2>
          <div className="map-container">
            <MapContainer event={event} />
          </div>
        </div>
        {showMsg ? message : null}
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.eventModule.event,
    loggedInUser: state.userModule.loggedInUser,
  };
}
const mapDispatchToProps = {
  getEventById,
  clearEvent,
  updateEvent,
};

export const EventDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventDetails);
