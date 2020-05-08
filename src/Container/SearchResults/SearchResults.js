import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap'
import './SearchResults.css'
import SearchResult from '../../Componenets/SearchResult/SearchResult'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../Constants';

class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            search_keyword: this.props.search_keyword,
            news_type: this.props.news_type,
            search_results: null
        }
    }
    componentDidMount(){
        this.getSearchResults(this.props.search_keyword, this.props.news_type)
    }

    getSearchResults(search_keyword, type){
        var api_url;
        if(type === "n"){
            api_url = global.constants.api_address + "/nytimes/search?q=" + search_keyword;
        }
        else{
            api_url = global.constants.api_address + "/guardian/search?q=" + search_keyword;
        }
        
        fetch(api_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    search_results: data
                })
            });
    }
    render(){
        let search_results = <p></p>;
        if(this.state.search_results )
            search_results = this.state.search_results.map(n => {
                return (
                    <Col className="Card" key={n.id} xs={12} lg={3}>
                        <Link key={n.id} 
                            to={{
                                pathname: "/article",
                                search: "?id=" + n.id + "&section=" + n.tag
                            }}
                            style={{ textDecoration: 'none' }}>
                            <SearchResult 
                                key={n.id}
                                id={n.id}
                                url={n.url}
                                title={n.title}
                                urlToImg={n.urlToImg}
                                time={n.time}
                                type={n.type === "g" ? "GUARDIAN" : "NYTIMES"}
                                tag={n.tag}/>
                        </Link>
                    </Col>
                )
            })
        let return_element = (
            <div>
                <h1 style={{ textAlign: 'left', paddingLeft: '20px' }}>Results</h1>
                <Container fluid>
                    <Row>
                        {search_results}
                    </Row>
                </Container>
            </div>
        )
        if(this.state.search_results === null || this.state.search_results.length === 0){
            return_element = (
                <h1 style={{ textAlign: 'left', paddingLeft: '20px' }}>Results</h1>
            )
        }
        return (
            return_element
        );
    }
}

export default SearchResults;