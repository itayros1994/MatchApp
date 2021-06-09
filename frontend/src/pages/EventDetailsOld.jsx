import { connect } from 'react-redux';
import { Component } from 'react';
import {
  getEventById,
  clearEvent,
  updateEvent,
} from '../store/actions/eventActions';
import pitch from '../assets/imgs/pitch.jpg';
import { ParticipantList } from '../cmps/ParticipantList';
import MapContainer from '../cmps/GoogleMap';
import { EventJoin } from '../cmps/EventJoin';
import { EventPostList } from '../cmps/EventPostList';

class _EventDetailsOld extends Component {
  async componentDidMount() {
    const eventId = this.props.match.params.eventId;
    await this.props.getEventById(eventId);
  }
  componentWillUnmount() {
    this.props.clearEvent();
  }

  addPost = (post) => {
    console.log(this.props);
    const updatedEvent = this.props.event;
    updatedEvent.posts.push(post);
    this.props.updateEvent(updatedEvent);
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

  render() {
    const { event } = this.props;
    console.log(event);
    if (!event) return <h1 className="loader">'Loading...'</h1>;
    return (
      <div className="details-main-container">
        <section className="details-page-container">
          <div className="plasterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr">
            randomly text
          </div>

          <section className="details-imgs-container">
            <img
              className="details-img-primery"
              src={`./imgs/${event.type}.jpg`}
              alt=""
            />
            <div className="imgs-small-container">
              <img
                className="details-img-small"
                src={`./imgs/${event.type}.jpg`}
                alt=""
              />
              <img
                className="details-img-small"
                src={`./imgs/${event.type}.jpg`}
                alt=""
              />
            </div>
            <div className="imgs-small-container">
              <img
                className="details-img-small"
                src={`./imgs/${event.type}.jpg`}
                alt=""
              />
              <img
                className="details-img-small"
                src={`./imgs/${event.type}.jpg`}
                alt=""
              />
            </div>
          </section>

          <section className="left-side-container">
            <div className="detalils-left-container">
              <h1 className="event-title">
                {event.title}
                <span className="color-point">.</span>
              </h1>
              <div className="details-creater-line">
                <h1>Team Leader :</h1>
                <span className="team-leader">{event.createdBy.fullname}</span>
              </div>
              <h1>Create At :</h1>
              {event.createdAt}
              {event.date},{event.time}
              <div className="img-container"></div>
            </div>

            <div className="detalils-right-container">
              <div className="right-container"></div>
              <div className="event-desc">
                <h1>
                  Participants: {`${event.members.length}/${event.capacity}`}
                </h1>
                <h1>Event Details :</h1>
                <p>{event.desc}</p>
              </div>
            </div>
            <EventPostList
              removePost={this.removePost}
              addPost={this.addPost}
              posts={this.props.event.posts}
            />
          </section>
          <div className="google-map-container">
            <div className="check-map">
              <h3>Location :</h3>
              {event.location}
              <div className="details-maps-container">
                <MapContainer event={event} />
              </div>
            </div>
            <div>
              <div className="location-header"></div>
              <EventJoin event={event} />
            </div>
          </div>
        </section>
      </div>
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
  clearEvent,
  updateEvent,
};
export const EventDetailsOld = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventDetailsOld);
