import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import BounceLoader from 'react-spinners/BounceLoader'
import './DetailedNews.css'
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import Comments from '../../Componenets/Comments/Comments';
import { Element, scroller } from 'react-scroll';
import '../../Constants';

class DetailedNews extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadedNews: null,
            bookmarked: false,
            omitted: true,
            omitted_des: null,
            full_des: null,
            need_show_button: true
        }
        this.loadData = this.loadData.bind(this);

    }
    
    componentDidMount () {
        // console.log(this.props.searchId, this.props.newsType);
        this.loadData(this.props.searchId, this.props.newsType, this.props.sectionName);
    }

    loadData (id, type, sectionName) {
        var api_url;
        if(id.substr(0, 4) === "http"){
            type = "n"
        }
        else{
            type = "g"
        }

        if(type === "n"){
            api_url = global.constants.api_address + "/nytimes/search?web_url=" + id;
        }
        else{
            api_url = global.constants.api_address + "/guardian/search?article_id=" + id;
        }
        fetch(api_url)
            .then((response) => {
                return response.json();
            })
            .then((jsonObj) => {
                jsonObj['tag'] = sectionName;
                var myStorage = window.localStorage;
                if(typeof(myStorage['csci-hw8-ychen875']) === "undefined" 
                    || myStorage['csci-hw8-ychen875'] === ""){
                        myStorage['csci-hw8-ychen875'] = JSON.stringify({});
                }
                var hw8_data = JSON.parse(myStorage['csci-hw8-ychen875']);
                var bookmarked = false;
                if(typeof(hw8_data[jsonObj.id]) === "undefined" || hw8_data[jsonObj.id] === ""){
                    bookmarked = false;
                }
                else{
                    bookmarked = true;
                }
                var arr = jsonObj.description.split('.');
                var omitted_des, full_des;
                if(arr.length <= 4){
                    omitted_des = (
                        <div>
                            {jsonObj.description}
                        </div>
                    );
                    full_des = (
                        <div>
                            {jsonObj.description}
                        </div>
                    );
                }
                else{
                    omitted_des = (
                        <div>
                            {arr.slice(0, 4).join('.') + '.'}
                        </div>
                    );
                    full_des = (
                        <div>
                            <br />
                            {arr.slice(4).join('.') + '.'}
                        </div>
                    );
                }
                if(arr.length <= 4){
                    this.setState({
                        loadedNews: jsonObj,
                        bookmarked: bookmarked,
                        omitted_des: omitted_des,
                        full_des: full_des,
                        need_show_button: false
                    });
                }
                else{
                    this.setState({
                        loadedNews: jsonObj,
                        bookmarked: bookmarked,
                        omitted_des: omitted_des,
                        full_des: full_des,
                        need_show_button: true
                    });
                }
                
            });
        
    }

    toggleDes(event){
        if(event.target.className === "fa fa-angle-up"){
            event.target.className = "fa fa-angle-down";
        }
        else{
            event.target.className = "fa fa-angle-up";
        }
        var tmp = this.state.omitted;
        if(event.target.className === "fa fa-angle-up"){
            scroller.scrollTo('test', {
                duration: 1000,
                delay: 100,
                smooth: true,
                containerId: '',
                offset: 0
            })
            this.setState({
                omitted: !tmp
            });
        }
        else{
            scroller.scrollTo('head', {
                duration: 1000,
                delay: 0,
                smooth: true,
                containerId: '',
                offset: 0
            })
            setTimeout(() => {this.setState({
                omitted: !tmp
            })}, 1000);
        }
        
    }

    detailedNewsBookmarkClickHandler(){
        let tmp = this.state.bookmarked;
        var myStorage = window.localStorage;
        if(typeof(myStorage['csci-hw8-ychen875']) === "undefined" 
            || myStorage['csci-hw8-ychen875'] === ""){
                myStorage['csci-hw8-ychen875'] = JSON.stringify({});
        }
        var hw8_data = JSON.parse(myStorage['csci-hw8-ychen875']);
        if(!tmp){
            toast.configure({
                position: "top-center",
                autoClose: false,
                newestOnTop: false,
                closeOnClick: false,
                rtl: false,
                pauseOnVisibilityChange: false,
                draggable: false,
                transition: Zoom
            })
            toast((
                <div className="Bookmarded_Msg">
                    {"Saving " + this.state.loadedNews.title}
                </div>
            ), {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false
            });
        }
        if(!tmp){
            hw8_data[this.state.loadedNews.id] = this.state.loadedNews;
            // console.log(hw8_data)
            myStorage.setItem('csci-hw8-ychen875', JSON.stringify(hw8_data));
            // console.log(myStorage)
        }
        if(tmp){
            delete hw8_data[this.state.loadedNews.id]
            myStorage.setItem('csci-hw8-ychen875', JSON.stringify(hw8_data));
            // console.log(myStorage)
        }
        if(tmp){
            toast.configure({
                position: "top-center",
                autoClose: false,
                newestOnTop: false,
                closeOnClick: false,
                rtl: false,
                pauseOnVisibilityChange: false,
                draggable: false,
                transition: Zoom
            })
            toast((
                <div className="Bookmarded_Msg">
                    {"Removing " + this.state.loadedNews.title}
                </div>
            ), {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false
            });
        }
        this.setState({
            bookmarked: !tmp
        })
        
    }

    render () {
        let news = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        let loading = (
            <div className="Loading">
                <div className="inside_Loading">
                    <BounceLoader color="#35D"/>
                    <h1>Loading</h1>
                </div>
            </div>
        );
        const style = {
            width: '96%',
            marginTop: '10px',
            marginBottom: '30px',
            boxShadow: '0 5px 3px 5px #dddddd',
            border: '1px solid #ebebeb',
            borderRadius: '3px',
            textAlign: 'left',
            color: 'black'
        };
        if ( this.props.searchId ) {
            news = loading;
        }
        if ( this.state.loadedNews ) {
            // console.log(this.state)
            news = (
                <div>
                <Container fluid style={style}>
                    <Row>
                        <Col className="Detailed_News_Title" xs={12} lg={12}>
                            {this.state.loadedNews.title}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="Detailed_News_Time" xs={12} lg={12}>
                            {this.state.loadedNews.time}
                            <div className="Detailed_Bookmark" 
                                onClick={this.detailedNewsBookmarkClickHandler.bind(this)}
                                data-tip data-for='bookmark'>
                                    {this.state.bookmarked?<FaBookmark />:<FaRegBookmark />}
                            </div>
                            <ReactTooltip id='bookmark' aria-haspopup='true' effect='solid'>
                                <span>Bookmark</span>
                            </ReactTooltip>
                            <div className="Detailed_Share">
                                <span data-tip data-for='facebook'>
                                    <FacebookShareButton className="Share" 
                                        url={this.state.loadedNews.url}
                                        hashtag="#CSCI_571_NewsApp">
                                            <FacebookIcon size={25} round />                            
                                    </FacebookShareButton>
                                </span>
                                <ReactTooltip id='facebook' aria-haspopup='true' effect='solid'>
                                    <span>Facebook</span>
                                </ReactTooltip>
                                <span data-tip data-for='twitter'>
                                    <TwitterShareButton className="Share"
                                        url={this.state.loadedNews.url} hashtags={["CSCI_571_NewsApp"]}>
                                            <TwitterIcon size={25} round />
                                    </TwitterShareButton>
                                </span>
                                <ReactTooltip id='twitter' aria-haspopup='true' effect='solid'>
                                    <span>Twitter</span>
                                </ReactTooltip>
                                
                                <span data-tip data-for='email'>
                                    <EmailShareButton className="Share" 
                                        url={this.state.loadedNews.url} 
                                        title={this.state.loadedNews.title}
                                        subject="#CSCI_571_NewsApp">
                                            <EmailIcon size={25} round />
                                    </EmailShareButton>
                                </span>
                                <ReactTooltip id='email' aria-haspopup='true' effect='solid'>
                                    <span>Email</span>
                                </ReactTooltip>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: 'center'}} xs={12} lg={12}>
                            <img className="Detailed_News_Img" 
                                src={this.state.loadedNews.urlToImg} 
                                alt={this.state.loadedNews.urlToImg} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="Detailed_News_Description" xs={12} lg={12}>
                                {this.state.omitted_des}
                        </Col>
                        <Element name="test">
                            <Col className="Detailed_News_Description" xs={12} lg={12}>
                                {this.state.omitted ? null: this.state.full_des}
                            </Col>
                        </Element>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: 'right'}} xs={12} lg={12}>
                            {this.state.need_show_button ?
                            <button className="Detailed_News_Show_Button">
                                <i className="fa fa-angle-down" 
                                    onClick={this.toggleDes.bind(this)} />
                            </button>:null}
                        </Col>
                    </Row>
                </Container>
                <Container fluid style={{ width: '100%' }}>
                    <Row>
                        {/* <div className="test" id="test2"></div> */}
                        <Comments id={this.state.loadedNews.id}/>
                    </Row>
                </Container>
                </div>
            );
        }
        return news;
    }
}

export default DetailedNews;