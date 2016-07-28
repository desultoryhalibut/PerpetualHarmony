import React from 'react';
import GoogleMap from 'google-map-react';

class ourMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 37.7, lng: -122.4},
      zoom: 9
    }
  }

  render() {

    var mapStyle = {height: screen.height - 500, width: screen.width - 500};
    console.log('im here')
    return (
      <div className='map-wrapper' style={mapStyle}>
        <GoogleMap center={this.state.center} zoom={this.state.zoom} >
        </GoogleMap>
      </div>
    );
  }
};

export default ourMap;
