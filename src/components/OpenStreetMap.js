import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './OpenStreetMap.css'


class OpenStreetMap extends React.Component {

  static defaultProps = {
    position: [51, -1],
    zoom: 13,
    markerText: ""
  }

  render() {

      return (
        <Map 
          center={[this.props.position.lat, this.props.position.lng]} 
          zoom={this.props.zoom}
          doubleClickZoom={false} 
          closePopupOnClick={false} 
          dragging={false}
          zoomSnap={false} 
          trackResize={false}
          touchZoom={false}
          scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;https://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.props.markerText !== "" &&
          <Marker position={this.props.position}>
            <Popup>{this.props.markerText}</Popup>
          </Marker>
          }
        </Map>
      );
  }
}

export default OpenStreetMap