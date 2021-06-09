import { connect } from 'react-redux';
import { EventList } from '../cmps/EventList';
import { loadEvents } from '../store/actions/eventActions';
import React from 'react';
import { removeEvent } from '../store/actions/eventActions';

class _EventApp extends React.Component {
  componentDidMount() {
    this.props.loadEvents(this.props.filterBy);
  }
  onRemoveEvent = (eventId) => {
    this.props.removeEvent(eventId);
  };
  render() {
    console.log(this.props.gEvents);
    // if (this.props.gEvents.length === 0) return <h1>Loading...</h1>;
    return (
      <section className="events-main-container">
        <EventList
          gEvents={this.props.gEvents}
          onRemoveEvent={this.onRemoveEvent}
        />
      </section>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.gEvents);
  return {

    gEvents: state.eventModule.events,
    filterBy: state.eventModule.filterBy,
    loggedinUser: state.userModule.loggedinUser,
  };
}

const mapDispatchToProps = {
  loadEvents,
  removeEvent,
};

export const EventApp = connect(mapStateToProps, mapDispatchToProps)(_EventApp);
