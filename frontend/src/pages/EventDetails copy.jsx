import { connect } from 'react-redux'
import { Component } from 'react'
import { getEventById } from '../store/actions/eventActions'
import pitch from '../assets/imgs/pitch.jpg';
import { ParticipantList } from '../cmps/ParticipantList';
import { PostList } from '../cmps/PostList'

class _EventDetails extends Component {

    componentDidMount() {
        const eventId = this.props.match.params.eventId
        this.props.getEventById(eventId)
    }

    render() {

        const { event } = this.props
        if (!event) return <h1 className="loader">'Loading...'</h1>
        return (
            <div className="event-details-container">

                <div className="event-details-top">
                    <img className="event-img" src={pitch}></img>
                    <div className="google-maps">Google Maps Here!</div>
                </div>
                <div>
                </div>
                <div className="event-leader">Event Leader : {event.createdBy.fullname}</div>
                <div className="event-details-buttom">
                    <div className="evet-details"><span>event rules :<ul>
                        <li>goalies up to half line, can score</li>
                        <li>Final Attack last no longer than 60 sec</li>
                    </ul></span>
                    </div>
                    <div className="participants-container">
                        <h1>Participants!</h1>
                        <div className="participants">
                            <div><ParticipantList members={event.members} /></div>
                            <div className="button-event-container">
                                <button>Join Event</button>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="posts-container">
                    <div className="posts">
                        <h1>Game Reviews!</h1>
                        <li>
                            <ul><PostList posts={event.posts}/></ul>
                        </li>
                    </div>
                    <form className="add-review">
                        <input type="text" placeholder="Add Review!" />
                        <button>Send Review</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        event: state.eventModule.event
    }
}

const mapDispatchToProps = {
    getEventById
}

export const EventDetails = connect(mapStateToProps, mapDispatchToProps)(_EventDetails)
