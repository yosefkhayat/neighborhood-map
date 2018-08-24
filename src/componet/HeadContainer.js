import React, { Component } from 'react';

class HeadContainer extends Component {
    render(){
       return (
            <header className="panel">
                <h3>Haifa Neighborhood Map</h3>
                <button className='menu' onClick={this.props.toggleSearchPanel}/>
           </header>
       )
    }
}
export default HeadContainer;