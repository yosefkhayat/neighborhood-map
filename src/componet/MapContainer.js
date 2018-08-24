import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
 

 
export class mapContainer extends Component {

  render (){
    return(
      <Map 
        onClick={this.props.onMapClicked}
        google={this.props.google}
        mapTypeControl={false}
        fullscreenControl={false}
        initialCenter={{
          lat: 31.79,
          lng: 34.98
        }}
        zoom={8}
      >
        {this.props.locations.map(location=>(
          <Marker 
            ref={this.props.MarkerCreated}
            onClick={(props, marker) => this.props.onMarkerClick(props, marker)}
            key={location.id}
            name={location.name}
            id={location.id}
            animation={
                //The animation was used as per instructions of google-maps-react plugin
              (this.props.selectedLocation.name === location.name) &&
              this.props.google.maps.Animation.BOUNCE
            }   
            aria-label={`Selected marker of + ${location.name}`}
            tabIndex='0'
            position={
              {lat: location.location.lat,
                lng: location.location.lng}
              }
            />
        ))}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.activeMarker!=null}
          aria-label={`informations about ${this.props.selectedLocation.name}`}>
            <div className='infoWindow'>
              <h1 tabIndex='0'>{this.props.selectedLocation.name}</h1>
              
                {
                  //locating the right elements fetched from wikipedia
                  this.props.wikiData.filter(info => info.id === this.props.selectedLocation.id )
                  .map(info =>{
                    let wikiInfo = info.text;
                    return (
                    <span  key={this.props.selectedLocation.id}>
                      {/*here we pass a snippet text fetched from wikipedia*/}
                      <p
                        dangerouslySetInnerHTML={ {__html: wikiInfo} }
                        tabIndex='0'
                        />
                    </span>
                    )}
                  )
              }
            </div>
          </InfoWindow>
      </Map>
    )
  }

}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBK5XorcoDq5gPKqgbYRAEjd0Zv73SPjsE')
})(mapContainer)