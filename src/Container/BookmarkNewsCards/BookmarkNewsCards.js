import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap'
import './BookmarkNewsCards.css'
import BookmarkNewsCard from '../../Componenets/BookmarkNewsCard/BookmarkNewsCard'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BookmarkNewsCards extends Component{
    constructor(props){
        super(props);
        var myStorage = window.localStorage;
        if(typeof(myStorage['csci-hw8-ychen875']) === "undefined" 
            || myStorage['csci-hw8-ychen875'] === ""){
                myStorage['csci-hw8-ychen875'] = JSON.stringify({});
        }
        var hw8_data = JSON.parse(myStorage['csci-hw8-ychen875']);
        var bookmarked_news = [];
        for(var data in hw8_data){
            bookmarked_news.push(hw8_data[data]);
        }
        this.state = {
            placeholder: false,
            bookmarked_news: bookmarked_news
        }
    }

    bookmarkDeleteHandler = (e, id) => {
        e.preventDefault();
        var myStorage = window.localStorage;
        if(typeof(myStorage['csci-hw8-ychen875']) === "undefined" 
            || myStorage['csci-hw8-ychen875'] === ""){
                myStorage['csci-hw8-ychen875'] = JSON.stringify({});
        }
        var hw8_data = JSON.parse(myStorage['csci-hw8-ychen875']);
        var saved_title = hw8_data[id].title;
        delete hw8_data[id]
        myStorage.setItem('csci-hw8-ychen875', JSON.stringify(hw8_data));
        var bookmarked_news = [];
        for(var data in hw8_data){
            bookmarked_news.push(hw8_data[data]);
        }
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
                {"Removing " + saved_title}
            </div>
        ), {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false
        });
        // console.log(myStorage);
        var p = this.state.placeholder;
        // console.log(this.state)
        this.setState({
            placeholder: !p,
            bookmarked_news: bookmarked_news
        })
        // console.log("delete");
        
    }

    render(){
        let news_cards = <p>Wrong</p>;
        news_cards = this.state.bookmarked_news.map(n => {
            return (
                <Col className="Card" key={n.id} xs={12} lg={3}>
                <Link key={n.id} 
                    to={{
                        pathname: "/article",
                        search: "?id=" + n.id + "&section=" + n.tag
                    }}
                    style={{ textDecoration: 'none' }}>
                <BookmarkNewsCard 
                    key={n.id}
                    id={n.id}
                    url={n.url}
                    title={n.title}
                    urlToImg={n.urlToImg}
                    time={n.time}
                    type={n.type === "g" ? "GUARDIAN" : "NYTIMES"}
                    tag={n.tag}
                    deleteHandler={(e) => this.bookmarkDeleteHandler(e, n.id)} />
                </Link>
                </Col>
            )
        })
        let return_element = (
            <div>
                <h1 style={{ textAlign: 'left', paddingLeft: '20px' }}>Favourite</h1>
                <Container fluid>
                    <Row>
                        {news_cards}
                    </Row>
                </Container>
            </div>
        )
        if(this.state.bookmarked_news.length === 0){
            return_element = (
                <h1>You have no saved articles</h1>
            )
        }
        return (
            return_element
        );
    }
}

export default BookmarkNewsCards;