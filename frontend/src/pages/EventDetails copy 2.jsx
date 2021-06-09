import { connect } from 'react-redux';
import { Component } from 'react';
import { getEventById } from '../store/actions/eventActions';
import pitch from '../assets/imgs/pitch.jpg';
import { ParticipantList } from '../cmps/ParticipantList';
import { PostList } from '../cmps/PostList';
// import {MapContainer} from '../cmps/GoogleMap'
import { MapContainer } from '../cmps/GoogleMap';
import { EventJoin } from '../cmps/EventJoin';
import { EventPosts } from '../cmps/EventPosts';

class _EventDetails extends Component {
  componentDidMount() {
    const eventId = this.props.match.params.eventId;
    this.props.getEventById(eventId);
  }
  render() {
    const { event } = this.props;
    if (!event) return <h1 className="loader">'Loading...'</h1>;
    return (
      <section className="details-page-container">
        <article className="details-main-container">
          <h1>{event.title}</h1>
          <h3>
            {event.eventDate},{event.eventTime}
            {event.location}
          </h3>
          <div className="details-creater-line">
            {/* <img>{event.createdBy.imgUrl}</img> */}
            Created By: {event.createdBy.fullname}
          </div>
          <h6>Created At: {event.createdAt}</h6>
          <img className="details-event-img" src={`./imgs/${event.type}.jpg`} />
          <p>{event.desc}</p>
        </article>

        <EventPosts event={this.props.event} />

        <article className="details-fixed-container ">
          <div className="details-maps-container"></div>
          <EventJoin event={event} />
        </article>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    event: state.eventModule.event,
  };
}
const mapDispatchToProps = {
  getEventById,
};
export const EventDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventDetails);
