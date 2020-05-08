import React, { Component } from 'react';
import NewsCard from '../../Componenets/NewsCard/NewsCard'
import { Link } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader'
import '../../Constants';

class NewsCards extends Component {
    constructor(props){
        super(props);
        this.state = {
            news_cards: null,
            sectionName: this.props.sectionName,
            newsType: this.props.newsType
        }
        this.getNews = this.getNews.bind(this);
    }
    componentDidMount(){
        this.getNews(this.props.sectionName, this.props.newsType)
    }

    getNews(sectionName, type) {
        var api_url;
        if(type === "g" && sectionName === "sports"){
            sectionName = "sport";
        }
        if(type === "n"){
            api_url = global.constants.api_address + "/nytimes?section=" + sectionName;
        }
        else{
            api_url = global.constants.api_address + "/guardian?section=" + sectionName;
        }
        fetch(api_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    news_cards: data,
                    sectionName: sectionName,
                    newsType: type
                })
            });
    }

    render(){
        let content = <p>Wrong</p>;
        let loading = (
            <div className="Loading">
                <div className="inside_Loading">
                    <BounceLoader color="#35D"/>
                    <h1>Loading</h1>
                </div>
            </div>
        );
        if ( this.props.sectionName && this.props.newsType) {
            content = loading;
        }
        if ( this.state.news_cards ){
            let news_cards = <p>Wrong of news_cards</p>;
            news_cards = this.state.news_cards.map(n => {
                return (
                    <Link style={{ textDecoration: 'none' }}
                        key={n.id} 
                        to={{
                            pathname: "/article",
                            search: "?id=" + n.id + "&section=" + n.tag
                        }}>
                        <NewsCard
                            key={n.id}
                            title={n.title}
                            content={n.description}
                            time={n.time}
                            tag={n.tag}
                            url={n.url}
                            urlToImg={n.urlToImg}/>
                    </Link>
                )
            })
            content = news_cards;
        }
        return (
            <section>
                {content}
            </section>
        );
    }
}
export default NewsCards;