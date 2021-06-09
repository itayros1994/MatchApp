import React from "react";
import { connect } from "react-redux";
import {
  addEvent,
  getEventById,
  updateEvent,
} from "../store/actions/eventActions";
import { TextField, Select } from "@material-ui/core";
import axios from "axios";
import { cloudinaryService } from "../services/cloudinaryService";

class _EventCreate extends React.Component {
  state = {
    newEvent: {
      title: "",
      type: "",
      eventDate: "",
      eventTime: "00:00",
      capacity: 4,
      desc: "",
      location: "",
      latlng: {},
      createdBy: {
        _id: this.props.loggedInUser._id,
        fullname: this.props.loggedInUser.fullname,
        imgUrl: this.props.loggedInUser.imgUrl,
      },
      members: [
        {
          _id: this.props.loggedInUser._id,
          fullname: this.props.loggedInUser.fullname,
          imgUrl: this.props.loggedInUser.imgUrl,
        },
      ],
      posts: [],
      imgs: [],
    },
  };

  async componentDidMount() {
    const editEventId = this.props.match.params.eventId;

    if (editEventId) {
      await this.props.getEventById(editEventId);
      console.log(this.props.event);
      this.setState({ newEvent: this.props.event }, console.log(this.state));
    }

    if (this.props.loggedInUser) {
      this.setState(
        {
          newEvent: {
            ...this.state.newEvent,
            createdBy: {
              ...this.state.newEvent.createdBy,
              fullname: this.props.loggedInUser.fullname,
            },
          },
        },
        () => {
          console.log("loggedInUser", this.state);
        }
      );
    }
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    if (field === "location") {
      this.updateLocationMap(value);
    }
    console.log(value);
    this.setState({ newEvent: { ...this.state.newEvent, [field]: value } });
  };

  updateLocationMap = (locationName) => {
    const key = "AIzaSyBfMQfVb9oKKZKCrkg0toAIbJ26HovmvBA";
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${key}&input=${locationName}&inputtype=textquery`
      )
      .then((res) => {
        if (res.data.candidates.length === 0) return;
        axios
          .get(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${res.data.candidates[0].place_id}&key=${key}`
          )
          .then((details) => {
            this.setState({
              newEvent: {
                ...this.state.newEvent,
                latlng: details.data.result.geometry.location,
              },
            });
            console.log(details);
          });
      });
  };

  onSubmitEvent = async () => {
    const newEvent = this.state.newEvent;
    let event_id;
    if (newEvent._id) {
      await this.props.updateEvent(newEvent);
      event_id = newEvent._id;
    } else {
      const event2 = await this.props.addEvent(newEvent);
      console.log(event2);
      event_id = event2._id;
    }

    this.props.history.push(`/event/${event_id}`);
  };

  uploadImg = async (ev) => {
    this.setState({ isUploading: true });
    const { secure_url } = await cloudinaryService.uploadImg(ev);
    console.log(secure_url);
    const newImgs = this.state.newEvent.imgs;
    const imgUrl = secure_url;
    newImgs.push(imgUrl);
    this.setState({
      newEvent: { ...this.state.newEvent, imgs: newImgs },
    });
  };

  render() {
    const { newEvent } = this.state;
    return (
      <div className="create-main-container">
        <section className="create-form-main container">
          <h1 className="create-event-header">
            Create Event<span className="blue-point">.</span>
          </h1>
          <form
            className="create-form"
            onSubmit={(ev) => {
              ev.preventDefault();
              this.onSubmitEvent();
            }}
          >
            <div className="creat-container-left">
              <label htmlFor="event-type">Event type:</label>
              <Select
                name="type"
                id="event-type"
                variant="outlined"
                value={newEvent.type}
                onChange={this.handleChange}
              >
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="volleyball">Volleyball</option>
                <option value="running">Running</option>
              </Select>
              <label htmlFor="event-title">Event Title:</label>
              <TextField
                variant="outlined"
                placeholder="James Football Game!"
                type="text"
                name="title"
                id="event-title"
                value={newEvent.title}
                onChange={this.handleChange}
              />
              <label htmlFor="event-desc">Description:</label>
              <textarea
                name="desc"
                placeholder="Type Here Your Event Description!"
                id="event-desc"
                cols="50"
                rows="17"
                value={newEvent.desc}
                onChange={this.handleChange}
              />
            </div>
            <div className="creat-container-right">
              <label htmlFor="event-date">Date:</label>
              <TextField
                variant="outlined"
                type="date"
                name="eventDate"
                id="event-date"
                value={newEvent.eventDate}
                onChange={this.handleChange}
              />
              <label htmlFor="event-time">Time:</label>
              <TextField
                variant="outlined"
                type="time"
                name="eventTime"
                id="event-time"
                value={newEvent.eventTime}
                onChange={this.handleChange}
              />
              <label htmlFor="event-capacity">Capacity:</label>
              <TextField
                variant="outlined"
                type="number"
                name="capacity"
                id="event-capacity"
                min="4"
                max="44"
                value={newEvent.capacity}
                onChange={this.handleChange}
              />
              <label htmlFor="event-location">Location:</label>
              <TextField
                variant="outlined"
                type="text"
                name="location"
                id="event-location"
                placeholder="Tel-Aviv"
                value={newEvent.location}
                onChange={this.handleChange}
              />
              <div className="creat-btn-container">
              <button className="submit-btn margin-top">Submit</button>
              <input
                className="custom-file-input"
                type="file"
                title="Add Imges"
                onChange={this.uploadImg}
                accept="img/*"
                id="imgUpload"
                multiple
              />
            </div>
              </div>
            {/* <div className="creat-submit-button">
          
        </div> */}

            {/* <div className="google-map-container">
            <div className="maps-container"> GOOGLE MAPS GOES HERE</div>
            <div className="image-uploader"> IMAGE UPLOAD GOES HERE</div>
            <Link to="/">
            </Link>
          </div> */}
          </form>
        </section>
      </div>
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
  addEvent,
  getEventById,
  updateEvent,
};

export const EventCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventCreate);
