import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '400px',
};

class MapContainer extends Component {
  containerStyle = {
    height: '10%',
    width: '70%',
    margin: '0px',
  };

  render() {
    const { event } = this.props;
    return (
      <Map
        containerStyle={this.containerStyle}
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        center={event.latlng}
        initialCenter={event.latlng}
      >
        <Marker
          // onClick={this.onMarkerClick}
          name={event.title}
          position={event.latlng}
          title={event.title}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBfMQfVb9oKKZKCrkg0toAIbJ26HovmvBA',
})(MapContainer);
