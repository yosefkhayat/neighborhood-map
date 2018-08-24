import React, { Component } from 'react';
import MapContainer from './componet/MapContainer'
import HeadContainer from './componet/HeadContainer'
import MenuContainer from './componet/MenuContainer'
import './App.css';
import escapeRegExp from 'escape-string-regexp';
//Goole Maps Error handle
window.gm_authFailure = function() {
  alert("Sorry! Google Map did not load properly!");
}

class App extends Component {
  state={
    locations:require('./location.json'),
    wikiData:[],
    selectedLocation:{},
    activeMarker:{},
    isSearchVisible:false,
    query:''
  }

  componentDidMount() {
    this.getDataFromWiki()
  }

  getDataFromWiki = () => {
    let dataNew = [];
    let dataFailed = [];
    this.state.locations.map((location) => {
      //retriving object from wiki database using the title
      return fetch(`https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=extracts&titles&format=json&origin=*&srlimit=1&srsearch=${location.name}`)
      .then(response => response.json())
      .then(data => {
        //creating an element from fetched data
        let elem = {
          text: data.query.search['0'].snippet+"<br><br>data fetched from wikipedia",
          id: location.id,
          name: location.name
        };
        dataNew.push(elem);
        this.setState({wikiData: dataNew});
      })
      //Error handling function
      .catch(() => {
        console.log('An error occured, please check internet connection')
        let elem = {
          id: location.id,
          text: "unfortunately, we encounter a problem with getting data from Wikipedia at the moment, please, try later",
        }
        dataFailed.push(elem);
        this.setState({wikiData: dataFailed});
      })
    })
  }
  //reference to markers from stack overflow
  markerRef=[]
  MarkerCreated=(marker)=>{
    if(marker!==null){
      this.markerRef.push(marker)
    }
  }
  //onclick opening infoWindow
  selectLocation=(loc)=>{
    for (const markerNew of this.markerRef) {
      if (markerNew.props.id === loc.id) {
        new markerNew.props.google.maps.event.trigger(markerNew.marker, 'click')
      }
    }
    if (window.screen.width < 750) {
      this.toggleSearchPanel()
    }
 }

  onMarkerClick = (props, marker) =>
  this.setState({
    selectedLocation: props,
    activeMarker: marker
  })

  onMapClicked = (props) => {
    if (this.state.activeMarker!=null) {
      this.setState({
        activeMarker: null,
        selectedLocation:{}
      })
    }
  }

  updateQuery= (query) => {
    this.setState({ query: query.trim()})
  }

  toggleSearchPanel = () => {
    if (this.state.isSearchVisible){
    this.setState ({ isSearchVisible: false })
    } else {
    this.setState ({ isSearchVisible: true })
    }
  }
  render() {
    let searchedLocation
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      searchedLocation= this.state.locations.filter((location) => match.test(location.name))
    } else {
      searchedLocation= this.state.locations
    }
    return (
      <div className="AppContainer">
        <HeadContainer
        toggleSearchPanel={this.toggleSearchPanel}
        />
        <main className="content">
          <MenuContainer
            isSearchVisible={this.state.isSearchVisible}
            locations={searchedLocation}
            updateQuery={this.updateQuery}
            query={this.state.query}
            selectLocation={this.selectLocation}
          />
          <MapContainer 
            locations={searchedLocation}
            selectedLocation={this.state.selectedLocation}
            activeMarker={this.state.activeMarker}
            wikiData={this.state.wikiData}
            onMarkerClick={this.onMarkerClick}
            onMapClicked={this.onMapClicked}
            MarkerCreated={this.MarkerCreated}
          />
        </main>
      </div>
    );
  }
}

export default App;
