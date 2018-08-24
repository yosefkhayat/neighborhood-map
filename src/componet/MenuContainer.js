import React, { Component } from 'react';

class menuContainer extends Component {

    render(){
        return (
            <div id='search' className={this.props.isSearchVisible ? 'display' : ''} aria-label="The Search panel">
                <input
                    tabIndex='0'
                    aria-label="Search a location by name"
                    className="search-location"
                    type="text"
                    placeholder="Search a Place..."
                    value={ this.props.query }
                    onChange={ (event) => this.props.updateQuery(event.target.value) }
                />
                <ul className="sidebar-list">
                    {
                    this.props.locations.map((location) =>
                        (
                        <li key={location.id}>
                        <button
                            tabIndex='0'
                            className="button button1"
                            onClick={() => this.props.selectLocation(location)}
                            aria-label={`you clicked on ${location.name}`}
                            >
                            {location.name}</button>
                        </li>
                        )
                    )
                    }
                    </ul>
            </div>
       )
    }
}
export default menuContainer;