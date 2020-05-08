import React, { Component } from 'react'
import './BookmarkNewsCard.css'
import { MdShare, MdDelete } from "react-icons/md"
import { Modal } from 'react-bootstrap';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { FaTimes } from "react-icons/fa";

class BookmarkNewsCard extends Component{
    state = {
        show: false
    }
    bookmarkShareHandler = (e) => {
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
        var type_bgcolor = {
            backgroundColor: "",
            color: 'white'
        }
        switch (this.props.type)
        {
            case "GUARDIAN":
                type_bgcolor.backgroundColor = "#14284a";
                break;
            case "NYTIMES":
                type_bgcolor.backgroundColor = "#dddddd";
                type_bgcolor.color = "black";
                break;
            default: 
                console.log('Default case of bookmark type ', this.props.type, " here");
        }
        
        return (
            <div className="Bookmark_News_Card">
                <p className="Bookmark_News_Card_Title">
                    {this.props.title}
                    <MdShare style={{ cursor: 'pointer'}} onClick={this.bookmarkShareHandler}/>
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
                    <MdDelete style={{ cursor: 'pointer'}} onClick={this.props.deleteHandler}/>
                </p>
                <center>
                <p className="Bookmark_News_Card_Img_Box">
                    <img className="Bookmark_News_Card_Img"
                        src={this.props.urlToImg} 
                        alt={this.props.urlToImg}  />
                </p>
                </center>
                <p className="Bookmark_News_Card_Time">
                    {this.props.time} 
                    <label className="Bookmark_News_Card_Type" style={type_bgcolor}>{this.props.type} </label>
                    <label className="Bookmark_News_Card_Tag" style={tag_bgcolor}>{this.props.tag.toUpperCase()} </label>
                </p>
            </div>
        );
    }
}

export default BookmarkNewsCard