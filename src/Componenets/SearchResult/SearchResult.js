import React, { Component } from 'react'
import './SearchResult.css'
import { MdShare } from "react-icons/md"
import { Modal } from 'react-bootstrap';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { FaTimes } from "react-icons/fa";

class SearchResult extends Component{
    state = {
        show: false
    }
    searchResultShareHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: true
        })
    }
    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            show: false
        })
    }
    render(){
        var tag_bgcolor = {
            backgroundColor: "",
            color: 'white'
        }
        switch (this.props.tag)
        {
            case "world":
                tag_bgcolor.backgroundColor = "#7c4eff";
                break;
            case "politics":
                tag_bgcolor.backgroundColor = "#419488";
                break;
            case "business": 
                tag_bgcolor.backgroundColor = "#4696ec";
                break;
            case "technology": 
                tag_bgcolor.backgroundColor = "#cedc39";
                tag_bgcolor.color = "black";
                break;
            case "sports":
                tag_bgcolor.backgroundColor = "#f6c244";
                tag_bgcolor.color = "black";
                break;
            default: 
                tag_bgcolor.backgroundColor = "#6e757c";
                break;
        }
        
        return (
            <div className="Search_Result_Card">
                <p className="Search_Result_Card_Title">
                    {this.props.title}
                    <MdShare style={{ cursor: 'pointer'}} onClick={this.searchResultShareHandler}/>
                    <Modal show={this.state.show} animation={true}>
                        <Modal.Header>
                        <div style={{width: "100%"}}>
                            <Modal.Title>
                                {this.props.title}
                            </Modal.Title>
                        </div>
                        <div>
                            <button className="Share_Modal_Close" onClick={this.handleClose}>
                                <FaTimes />
                            </button>
                        </div>  
                        </Modal.Header>
                        <Modal.Body>
                            <div className="Share_Msg" style={{ textAlign: 'center' }}>
                                Share Via
                            </div>
                            <div style={{ 
                                textAlign: 'center', 
                                width: '100%',
                                justifyContent: "space-around",
                                display: "flex"
                            }}>
                            <FacebookShareButton className="Share_Toast_Buttons" 
                                url={this.props.url}
                                hashtag="#CSCI_571_NewsApp">
                                    <FacebookIcon size={50} round />                            
                            </FacebookShareButton>
                            <TwitterShareButton className="Share_Toast_Buttons"
                                url={this.props.url} hashtags={["CSCI_571_NewsApp"]}>
                                    <TwitterIcon size={50} round />
                            </TwitterShareButton>
                            <EmailShareButton className="Share_Toast_Buttons" 
                                subject="#CSCI_571_NewsApp" 
                                body={this.props.url}>
                                    <EmailIcon size={50} round />
                            </EmailShareButton>
                            </div>
                        </Modal.Body>
                    </Modal>
                </p>
                <center>
                <p className="Search_Result_Card_Img_Box">
                    <img className="Search_Result_Card_Img"
                        src={this.props.urlToImg} 
                        alt={this.props.urlToImg}  />
                </p>
                </center>
                <p className="Search_Result_Card_Time">
                    {this.props.time} 
                    <label className="Search_Result_Card_Tag" style={tag_bgcolor}>{this.props.tag.toUpperCase()} </label>
                </p>
            </div>
        );
    }
}

export default SearchResult;