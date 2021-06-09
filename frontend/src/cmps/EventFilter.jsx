import { Component } from "react";
import { connect } from "react-redux";
import {
  Paper,
  Button,
  Input,
  TextField,
  Select,
  Icons,
  Switch,
} from "@material-ui/core";
import { ThreeDRotation } from "@material-ui/icons";

import {
  loadEvents,
  setFilter,
  loadLocations,
} from "../store/actions/eventActions";

class _EventFilter extends Component {
  state = {
    filterBy: {
      type: "all",
      location: "all",
      date: "",
      time: "",
    },
  };

  componentDidMount() {
    this.props.loadLocations();
    // console.log('hello');
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState(
      { filterBy: { ...this.state.filterBy, [field]: value } },
      () => {
        this.props.setFilter(this.state.filterBy).then(() => {
          // console.log(this.state.filterBy);
          this.props.loadEvents(this.state.filterBy);
        });
      }
    );
  };

  render() {
    const { events, locations } = this.props;
    // console.log(events, locations);
    if (!events || !locations) return <h1>Loading</h1>;
    return (
      <section className="filter-container">
        <div className="type-filter-container">
          <label htmlFor="filter-type">By Sport:</label>
          <select className="select-filter"
            // variant=""
            name="type"
            id="filter-type"
            onChange={this.handleChange}
          >
            <option value="all">Show All</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Running">Running</option>
          </select>
        </div>
        <div className="type-filter-container">
          <label htmlFor="filter-location">Location:</label>
          <select className="select-filter"
            // variant="standard"
            name="location"
            id="filter-location"
            onChange={this.handleChange}
          >
            <option value="all">Show All</option>
            {locations.map((location, index) => {
              return (
                <option value={location} key={index}>
                  {location}
                </option>
              );
            })}
          </select>
        </div>
        <div className="type-filter-container">
          <label htmlFor="filter-time">By Time:</label>
          
          <input className="date-filter" variant="standard"
            type="time"
            name="time"
            id="filter-time"
            onChange={this.handleChange}>
          </input>
        </div>
        <div className="type-filter-container">
          <label htmlFor="filter-date">By Date:</label>
          <input className="date-filter"
            variant="standard"
            type="date"
            name="date"
            id="filter-date"
            onChange={this.handleChange}
          />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    locations: state.eventModule.locations,
  };
}

const mapDispatchToProps = {
  setFilter,
  loadEvents,
  loadLocations,
};

export const EventFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventFilter);
