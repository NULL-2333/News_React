import React from 'react';
import { Route } from 'react-router-dom';
import NewsCards from '../NewsCards/NewsCards'
import { withRouter } from 'react-router-dom';
import DetailedNews from '../DetailedNews/DetailedNews';
import BookmarkNewsCards from "../BookmarkNewsCards/BookmarkNewsCards"
import SearchResults from '../SearchResults/SearchResults'

const News = (props) => {
    return (
        <div>
            <Route path="/" exact render={() => <NewsCards key={props.type} sectionName="all" newsType={props.type} />} />
            <Route path="/World" exact render={() => <NewsCards key={props.type} sectionName="world" newsType={props.type} />} />
            <Route path="/Politics" exact render={() => <NewsCards key={props.type} sectionName="politics" newsType={props.type} />} />
            <Route path="/Business" exact render={() => <NewsCards key={props.type} sectionName="business" newsType={props.type} />} />
            <Route path="/Technoloy" exact render={() => <NewsCards key={props.type} sectionName="technology" newsType={props.type} />} />
            <Route path="/Sports" exact render={() => <NewsCards key={props.type} sectionName="sports" newsType={props.type} />} />
            <Route path="/article" render={() => 
                <DetailedNews
                    searchId={props.location.search.split('?id=')[1].split('&section=')[0]}
                    sectionName={props.location.search.split('?id=')[1].split('&section=')[1]}
                    newsType={props.type} />
            } />
            <Route path="/favourites" exact render={() => <BookmarkNewsCards />}/>
            <Route path="/search" render={() => 
                <SearchResults 
                    key={props.location.search.split('?q=')[1]} 
                    search_keyword={props.location.search.split('?q=')[1]} 
                    news_type={props.type} />
            }/>
        </div>
    );
}

export default withRouter(News);