import React, { Component } from 'react';
import './App.css';
import News from './News/News'
import { BrowserRouter } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TopNavBookmark from '../Componenets/TopNavBookmark/TopNavBookmark'
import SwitchWithTwoLabels from '../Componenets/SwitchWithTwoLabels/SwitchWithTwoLabels'
import { LinkContainer } from 'react-router-bootstrap'
import SelectInput from '../Componenets/SelectInput/SelectInput'
import ReactTooltip from 'react-tooltip'
import { Element} from 'react-scroll';

class App extends Component {
	constructor(props) {
		super(props);
		var myStorage = window.localStorage;
        if(typeof(myStorage['csci-hw8-ychen875-switch']) === "undefined" 
            || myStorage['csci-hw8-ychen875-switch'] === ""){
				myStorage['csci-hw8-ychen875-switch'] = "true";
				this.state = {
					type: "g", 
					checked: true
				};
		}
		else{
			if(myStorage['csci-hw8-ychen875-switch'] === "true"){
				this.state = {
					type: "g", 
					checked: true
				};
			}
			else if(myStorage['csci-hw8-ychen875-switch'] === "false"){
				this.state = {
					type: "n", 
					checked: false
				};
			}
			else{
				myStorage['csci-hw8-ychen875-switch'] = "true";
				this.state = {
					type: "g", 
					checked: true
				};
			}
			
		}
		
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(checked) {
		var myStorage = window.localStorage;
		myStorage['csci-hw8-ychen875-switch'] = checked;
		if(checked){
			this.setState({
				type: "g", 
				checked: checked
			});
		}
		else{
			this.setState({
				type: "n", 
				checked: checked
			});
		}
	}
	
	render() {
		const style = {
			paddingLeft: '0px',
			paddingRight: '20px',
			fontWeight: '300'
		}
		// toast.configure()
		return (
			<BrowserRouter>
			<Element name="head"></Element>
			<Navbar variant="dark" expand="lg" className="top_navbar">
				<SelectInput />
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<LinkContainer style={style} to="/" exact>
						<Nav.Link active={false}>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer style={style} to="/World" exact>
						<Nav.Link active={false}>World</Nav.Link>
					</LinkContainer>
					<LinkContainer style={style} to="/Politics" exact>
						<Nav.Link active={false}>Politics</Nav.Link>
					</LinkContainer>
					<LinkContainer style={style} to="/Business" exact>
						<Nav.Link active={false}>Business</Nav.Link>
					</LinkContainer>
					<LinkContainer style={style} to="/Technoloy" exact>
						<Nav.Link active={false}>Technoloy</Nav.Link>
					</LinkContainer>
					<LinkContainer style={style} to="/Sports" exact>
						<Nav.Link active={false}>Sports</Nav.Link>
					</LinkContainer>
				</Nav>
				<Link to="/favourites">
					<div className="NavBar_Bookmark">
						<span data-tip data-for='topnavbookmark'>
							<TopNavBookmark />
						</span>
					</div>
				</Link>
				<ReactTooltip 
					id='topnavbookmark' 
					place='bottom' 
					effect='solid'>
						<span>Bookmark</span>
				</ReactTooltip>
				<SwitchWithTwoLabels 
					changed={this.handleChange}
					checked={this.state.checked} />
				</Navbar.Collapse>
			</Navbar>
			<div className="App">
				<News type={this.state.type}/>
			</div>
			</BrowserRouter>
		);
  }
}

export default App;