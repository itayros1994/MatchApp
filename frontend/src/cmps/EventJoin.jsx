import React from 'react';
import { SocialShare } from '../cmps/SocialShare'
import { ParticipantList } from './ParticipantList';
import { socketService } from '../services/socketService';

export class EventJoin extends React.Component {
  state = {
    isMember: false,
  };
  componentDidMount() {
    this.setState({ isMember: this.checkIsMember() });
  }

  checkIsMember = () => {
    if (!this.props.loggedInUser) return;
    // console.log(this.props.event);
    return this.props.event.members.some((member) => {
      return member._id === this.props.loggedInUser._id;
    });
  };

  joinModalMove = () => {
    this.setState({ showModal: true });
    setTimeout(() => {
      this.setState({ showModal: false });
    }, 5000);
  };

  joinEvent = async () => {
    const updatedEvent = { ...this.props.event };
    const { _id, fullname, imgUrl } = this.props.loggedInUser;
    const newMember = {
      _id,
      fullname,
      imgUrl,
      isMember: !this.state.isMember,
    };
    if (!this.state.isMember) {
      updatedEvent.members.push(newMember);
    } else {
      const memberIdx = this.props.event.members.findIndex(
        (member) => member._id === _id
      );
      updatedEvent.members.splice(memberIdx, 1);
    }

    await this.props.updateEvent(updatedEvent);
    await socketService.emit('event memberUpdated', newMember);
    await this.props.loadEvent();
    this.setState({ isMember: !this.state.isMember });
  };

  render() {
    const { isMember } = this.state;
    const { event } = this.props;
    // console.log(isMember);
    return (
      <div className="call-to-action-container">
        {/* <div className="messages-container">
          <h1
            className={
              this.state.showModal && !this.state.isMember
                ? 'event-join'
                : 'event-join-hidden'
            }
          >
            {' '}
            See You Again 🙃{' '}
          </h1>
          <h1
            className={
              this.state.showModal && this.state.isMember
                ? 'event-leave'
                : 'event-leave-hidden'
            }
          >
            {' '}
            Let Play!😀
          </h1>
        </div> */}
        <div className="call-to-action">
          {/* <h2>Who's Coming?</h2> */}
          <h2 className="event-capcity">
            {`${event.members.length}/${event.capacity}`}{' '}
            <span className="had-joined">Had Joined!</span>{' '}
          </h2>
          <div>
            <div>
              <ParticipantList members={event.members} />
            </div>
          </div>
          <div className="button-event-container">
            <SocialShare></SocialShare>
            <button
              className="button-event"
              onClick={(ev) => {
                ev.preventDefault();
                this.joinEvent();
                this.joinModalMove();
              }}
            >
              {isMember ? 'Leave Event' : 'Join Event'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     // loggedInUser: "u104",
//     loggedInUser: state.userModule.loggedInUser,
//   };
// }

// const mapDispatchToProps = {
//   updateEvent,
// };

// export const EventJoin = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_EventJoin);
