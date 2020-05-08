import React, { Component } from 'react';
import './SwitchWithTwoLabels.css'
import { Navbar } from 'react-bootstrap';
import Switch from 'react-switch'
import { withRouter } from 'react-router-dom';

class SwitchWithTwoLabels extends Component {
    render(){
        let r = <div style={{ marginLeft: '20px'}}></div>
        if(this.props.location.pathname !== '/article' 
            && this.props.location.pathname !== '/favourites'
            && this.props.location.pathname !== '/search'){
            r = (
                <>
                <Navbar.Brand>NYTimes</Navbar.Brand>
                <div style={{ paddingRight: '10px', paddingTop: '5px'}}>
                <Switch 
                    onChange={this.props.changed} 
                    checked={this.props.checked} 
                    activeBoxShadow="0 #ddd" 
                    onColor="#4298f4" 
                    offColor="#dddddd" 
                    checkedIcon 
                    uncheckedIcon />
                </div>
                <Navbar.Brand>Guardian</Navbar.Brand>
                </>
            )
        }
        return r;
    }
}
export default withRouter(SwitchWithTwoLabels);