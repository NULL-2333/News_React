var express = require('express');
var app = express();
var fs = require("fs");
var os = require("os");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cors = require('cors');

app.use(cors());

var nytimes_api = "https://api.nytimes.com/svc/topstories/v2/"
var guardian_news_api = "https://content.guardianapis.com/";
var g_home_api = "https://content.guardianapis.com/search?api-key=721208c3-5338-41a4-9d89-3ea1b4999892&section=(sport|business|technology|politics)&show-blocks=all"
var g_section_api = "https://content.guardianapis.com/[SECTION_NAME]?api-key=721208c3-5338-41a4-9d89-3ea1b4999892&show-blocks=all"
var g_search_article_api = 'https://content.guardianapis.com/[ARTICLE_ID]?api-key=721208c3-5338-41a4-9d89-3ea1b4999892&show-blocks=all'
var g_search_query_api = 'https://content.guardianapis.com/search?q=[QUERY_KEYWORD]&api-key=721208c3-5338-41a4-9d89-3ea1b4999892&show-blocks=all'
var n_home_api = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=jAYvOlXdZhM2bn2a2pvvE3TNDVjD2Qsm"
var n_section_api = "https://api.nytimes.com/svc/topstories/v2/[SECTION_NAME].json?api-key=jAYvOlXdZhM2bn2a2pvvE3TNDVjD2Qsm"
var n_search_url_api = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("[ARTICLE_WEB_URL]")&api-key=jAYvOlXdZhM2bn2a2pvvE3TNDVjD2Qsm'
var n_search_city_api = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=[CITY]&api-key=jAYvOlXdZhM2bn2a2pvvE3TNDVjD2Qsm'

app.get('/', function (req, res) {
    res.send("Welcome to Node.js");
});
// guardian with section
app.get('/guardian', function (req, res) {
    if(req.query['section'] == 'all'){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', g_home_api, false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).response.results;
        var result = [];
        for(let i = 0; i < Math.min(10, jsonObj.length); i++){
            var urlToImg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            if(jsonObj[i].blocks === undefined || jsonObj[i].blocks.main === undefined 
                || jsonObj[i].blocks.main.elements[0] === undefined || jsonObj[i].blocks.main.elements[0].assets === undefined){
                urlToImg = urlToImg;
            }
            else if(jsonObj[i].blocks.main.elements[0].assets.length > 0){
                urlToImg = jsonObj[i].blocks.main.elements[0].assets.slice(-1)[0].file
            }
            var tag = jsonObj[i].sectionId;
            if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sport"){
                tag = tag;
            }
            if(tag === "sport"){
                tag = "sports";
            }
            result.push({
                id: jsonObj[i].id,
                type: "g",
                title: jsonObj[i].webTitle,
                url: jsonObj[i].webUrl,
                urlToImg: urlToImg,
                tag: tag,
                time: jsonObj[i].webPublicationDate.split('T')[0],
                description: jsonObj[i].blocks.body[0].bodyTextSummary
            });
        }
        res.send(result);
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', guardian_news_api + req.query['section'] + "?api-key=721208c3-5338-41a4-9d89-3ea1b4999892&show-blocks=all", false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).response.results;
        var result = [];
        for(let i = 0; i < Math.min(10, jsonObj.length); i++){
            var urlToImg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            if(jsonObj[i].blocks === undefined || jsonObj[i].blocks.main === undefined 
                || jsonObj[i].blocks.main.elements[0] === undefined || jsonObj[i].blocks.main.elements[0].assets === undefined){
                urlToImg = urlToImg;
            }
            else if(jsonObj[i].blocks.main.elements[0].assets.length > 0){
                urlToImg = jsonObj[i].blocks.main.elements[0].assets.slice(-1)[0].file
            }
            var tag = jsonObj[i].sectionId;
            if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sport"){
                tag = tag;
            }
            if(tag === "sport"){
                tag = "sports";
            }
            result.push({
                id: jsonObj[i].id,
                type: "g",
                title: jsonObj[i].webTitle,
                url: jsonObj[i].webUrl,
                urlToImg: urlToImg,
                tag: tag,
                time: jsonObj[i].webPublicationDate.split('T')[0],
                description: jsonObj[i].blocks.body[0].bodyTextSummary
            });
        }
        res.send(result);
    }
});


// guardian with search
app.get('/guardian/search', function (req, res) {
    var article_id = req.query['article_id'];
    var q = req.query['q'];
    if(typeof(article_id) != 'undefined'){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://content.guardianapis.com/' + article_id + '?api-key=721208c3-5338-41a4-9d89-3ea1b4999892&show-blocks=all', false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).response.content;
        var result;
        var urlToImg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        if(jsonObj.blocks === undefined || jsonObj.blocks.main === undefined 
            || jsonObj.blocks.main.elements[0] === undefined || jsonObj.blocks.main.elements[0].assets === undefined){
            urlToImg = urlToImg;
        }
        else if(jsonObj.blocks.main.elements[0].assets.length > 0){
            urlToImg = jsonObj.blocks.main.elements[0].assets.slice(-1)[0].file
        }
        var tag = jsonObj.sectionId;
        if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sport"){
            tag = tag;
        }
        if(tag === "sport"){
            tag = "sports";
        }
        result = {
            id: jsonObj.id,
            type: "g",
            title: jsonObj.webTitle,
            url: jsonObj.webUrl,
            urlToImg: urlToImg,
            tag: tag,
            time: jsonObj.webPublicationDate.split('T')[0],
            description: jsonObj.blocks.body[0].bodyTextSummary
        };
        res.send(result);
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://content.guardianapis.com/search?q=' + q + '&api-key=721208c3-5338-41a4-9d89-3ea1b4999892&show-blocks=all', false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).response.results;
        var result = [];
        for(let i = 0; i < Math.min(10, jsonObj.length); i++){
            var urlToImg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            if(jsonObj[i].blocks === undefined || jsonObj[i].blocks.main === undefined 
                || jsonObj[i].blocks.main.elements[0] === undefined || jsonObj[i].blocks.main.elements[0].assets === undefined){
                urlToImg = urlToImg;
            }
            else if(jsonObj[i].blocks.main.elements[0].assets.length > 0){
                urlToImg = jsonObj[i].blocks.main.elements[0].assets.slice(-1)[0].file
            }
            var tag = jsonObj[i].sectionId;
            if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sport"){
                tag = tag;
            }
            if(tag === "sport"){
                tag = "sports";
            }
            result.push({
                id: jsonObj[i].id,
                type: "g",
                title: jsonObj[i].webTitle,
                url: jsonObj[i].webUrl,
                urlToImg: urlToImg,
                tag: tag,
                time: jsonObj[i].webPublicationDate.split('T')[0],
                description: jsonObj[i].blocks.body[0].bodyTextSummary
            });
        }
        res.send(result);
    }
});


// nytimes with section
app.get('/nytimes', function (req, res) {
    if(req.query['section'] == 'all'){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', n_home_api, false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).results;
        var result = [];
        for(let i = 0; i < Math.min(10, jsonObj.length); i++){
            var urlToImg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            for(let j = 0; j < jsonObj[i].multimedia.length; j++){
                if(jsonObj[i].multimedia[j].width >= 2000){
                    urlToImg = jsonObj[i].multimedia[j].url;
                }
            }
            var tag = jsonObj[i].section, tag2 = jsonObj[i].subsection;
            if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sports"){
                if(tag === 'us' && tag2 === 'politics' )
                    tag = "politics";
                else{
                    tag = tag
                }
            }
            result.push({
                id: jsonObj[i].url,
                type: "n",
                title: jsonObj[i].title,
                url: jsonObj[i].url,
                urlToImg: urlToImg,
                tag: tag,
                time: jsonObj[i].published_date.split('T')[0],
                description: jsonObj[i].abstract
            });
        }
        res.send(result);
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', nytimes_api + req.query['section'] + ".json?api-key=jAYvOlXdZhM2bn2a2pvvE3TNDVjD2Qsm", false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).results;
        var result = [];
        for(let i = 0; i < Math.min(10, jsonObj.length); i++){
            var urlToImg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            for(let j = 0; j < jsonObj[i].multimedia.length; j++){
                if(jsonObj[i].multimedia[j].width >= 2000){
                    urlToImg = jsonObj[i].multimedia[j].url;
                }
            }
            var tag = jsonObj[i].section, tag2 = jsonObj[i].subsection;
            if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sports"){
                if(tag === 'us' && tag2 === 'politics' )
                    tag = "politics";
                else{
                    tag = tag
                }
            }
            result.push({
                id: jsonObj[i].url,
                type: "n",
                title: jsonObj[i].title,
                url: jsonObj[i].url,
                urlToImg: urlToImg,
                tag: tag,
                time: jsonObj[i].published_date.split('T')[0],
                description: jsonObj[i].abstract
            });
        }
        res.send(result);
    }
});

// nytimes with search
app.get('/nytimes/search', function (req, res) {
    var web_url = req.query['web_url'];
    var q = req.query['q'];
    if(typeof(web_url) == 'undefined'){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + q + '&api-key=jAYvOlXdZhM2bn2a2pvvE3TNDVjD2Qsm', false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).response.docs;
        var result = [];
        for(let i = 0; i < Math.min(10, jsonObj.length); i++){
            var urlToImg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            for(let j = 0; j < jsonObj[i].multimedia.length; j++){
                if(jsonObj[i].multimedia[j].width >= 2000){
                    urlToImg = jsonObj[i].multimedia[j].url;
                }
            }
            if(urlToImg.substr(0, 5) !== "https"){
                urlToImg = "https://static01.nyt.com/" + urlToImg
            }
            // var tag = jsonObj[i].section, tag2 = jsonObj[i].subsection;
            // if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sports"){
            //     if(tag === 'us' && tag2 === 'politics' )
            //         tag = "politics";
            //     else{
            //         tag = tag
            //     }
            // }
            var tag = jsonObj[i].news_desk;
            if(typeof(tag) === 'undefined'){
                tag = "world"
            }
            else if(tag === ""){
                tag="world"
            }
            result.push({
                id: jsonObj[i].web_url,
                type: "n",
                title: jsonObj[i].headline.main,
                url: jsonObj[i].web_url,
                urlToImg: urlToImg,
                tag: tag.toLowerCase(),
                time: jsonObj[i].pub_date.split('T')[0],
                description: jsonObj[i].lead_paragraph
            });
        }
        res.send(result);
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + web_url + '")&api-key=jAYvOlXdZhM2bn2a2pvvE3TNDVjD2Qsm', false);
        xhr.send(null);
        res.setHeader('Content-Type', 'application/json; charset=utf8');
        var jsonObj = JSON.parse(xhr.responseText).response.docs[0];
        var result;
        var urlToImg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        for(let j = 0; j < jsonObj.multimedia.length; j++){
            if(jsonObj.multimedia[j].width >= 2000){
                urlToImg = jsonObj.multimedia[j].url;
            }
        }
        if(urlToImg.substr(0, 5) !== "https"){
            urlToImg = "https://static01.nyt.com/" + urlToImg
        }
        // var tag = jsonObj.section, tag2 = jsonObj.subsection;
        // if(tag !== "world" && tag !== "politics" && tag !== "business" && tag !== "technology" && tag !== "sports"){
        //     if(tag === 'us' && tag2 === 'politics' )
        //         tag = "politics";
        //     else{
        //         tag = tag
        //     }
        // }
        result = {
            id: jsonObj.web_url,
            type: "n",
            title: jsonObj.headline.main,
            url: jsonObj.web_url,
            urlToImg: urlToImg,
            tag: jsonObj.news_desk.toLowerCase(),
            time: jsonObj.pub_date.split('T')[0],
            description: jsonObj.abstract,
            snippet: jsonObj.snippet
        };
        res.send(result);
    }
});

app.listen(8081, function(){
    console.log("http://localhost:8081");
})