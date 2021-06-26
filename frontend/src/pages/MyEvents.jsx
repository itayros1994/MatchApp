import { connect } from 'react-redux';
import React from 'react';
import { EventListEdit } from '../cmps/EventListEdit';
import { loadEvents, removeEvent } from '../store/actions/eventActions';

class _MyEvents extends React.Component {
  async componentDidMount() {
    await this.props.loadEvents();
  }
  onRemoveEvent = (eventId) => {
    this.props.removeEvent(eventId);
  };

  render() {
    const { loggedInUser } = this.props;
    if (!this.props.userEvents) return <h1>Loading...</h1>;
    return (
      <main className="user-main-container">
        <div className="user-details-container">
          <div className="my-event-left-container">
            <div className="user-details">
              <h1 className="to-center">
                Welcome Back,{' '}
                <span className="light-blue-text">{loggedInUser.fullname}</span>
              </h1>
              <div className="profile-details">
                <img
                  className="profile-img"
                  src={loggedInUser.imgUrl}
                  alt=""
                ></img>
                <div className="user-details-container">
                  <h2>Events Created :10</h2>
                  <h2>Events Subscribed : 22</h2>
                  <h2>followers : 45</h2>
                  <h2>Reviews : 11</h2>
                </div>
                <div className="profile-rating">
                  <div>Rating : 4.0</div>
                  <div>⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>
          <div className="event-right-container">
            <div className="user-events-list">
              <div className="my-events-title no-padding">
                <h1 className="to-center ">My Events</h1>
                <h4 className="light-blue-text to-center ">
                  Change or Delete your events.
                </h4>
              </div>
              <EventListEdit
                onRemoveEvent={this.onRemoveEvent}
                events={this.props.userEvents}
                isEditable={true}
              />
            </div>
            <div className="my-events-title bottom  no-padding">
              <h1 className="to-center">Joined Events</h1>
              <h4 className="light-blue-text to-center ">
                See all the events you're attending.
              </h4>
            </div>
            <div className="user-events-list">
              <EventListEdit events={this.props.attendingsEvents} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const events = state.eventModule.events;
  const userId = state.userModule.loggedInUser._id;
  const userEvents = events.filter((event) => event.createdBy._id === userId);
  const attendingEvents = events.filter((event) => {
    if (event.createdBy._id === userId) return false; // its my event;
    return event.members.find((member) => member._id === userId);
  });

  return {
    userEvents: userEvents,
    attendingsEvents: attendingEvents,
    loggedInUser: state.userModule.loggedInUser,
  };
}

const mapDispatchToProps = {
  loadEvents,
  removeEvent,
};

export const MyEvents = connect(mapStateToProps, mapDispatchToProps)(_MyEvents);
