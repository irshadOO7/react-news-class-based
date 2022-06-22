import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country : "in",
        pageSize : 20
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number
    }
    articles = [
        {
            "source": {
                "id": "bbc-sport",
                "name": "BBC Sport"
            },
            "author": "BBC Sport",
            "title": "Shane Warne memorial - watch & follow updates",
            "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
            "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
            "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
            "publishedAt": "2022-03-30T08:22:26.498888Z",
            "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]

    constructor() {
        super();
        console.log("this is constructor");
        this.state = {
            articles: this.articles,
            loading: true,
            totalResults : 0,
            page : 1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:false})
        let data = await fetch(url);
        let jdata = await data.json()   
        this.setState({
            articles : jdata.articles,
            totalResults : jdata.totalResults,
            loading:true
        })
    }
    handlePrevious = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:false})
        let data = await fetch(url);
        let jdata = await data.json()   
        this.setState({
            page : this.state.page -1,
            articles : jdata.articles,
            loading:true
        })
    }
    handleNext = async() =>{
        if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
            return false
        }
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:false})
        let data = await fetch(url);
        let jdata = await data.json()   
        this.setState({
            page : this.state.page+1,
            articles : jdata.articles,
            loading:true
        })
    }
    fetchMoreData = async() => {
        this.setState({page : this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let jdata = await data.json()   
        this.setState({
            page : this.state.page+1,
            articles : this.state.articles.concat(jdata.articles)
        })
      };
    render() {
        return (
            <>
            <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loader/>}
                    >
            <div className="container mt-5">
                <div className="row">
                    <h3 className='text-center'>Imagine News App</h3><hr/>
                    {this.state.articles.map((ele) => {
                        return <div className="col-md-4 mb-5" key={ele.url}>
                            <NewsItem title={ele.title!=null ? ele.title.slice(0,23) : ""} description={ele.description!= null ? ele.description.slice(0,77) : ""} imgUrl={ele.urlToImage} newsURl={ele.url} />
                        </div>
                    })}
                </div>
                    {/* <div className='row mb-5'>
                    <div className='col-6'>
                    <span className='d-flex justify-content-start'><button className="btn btn-sm btn-dark" disabled={this.state.page<=1} onClick={this.handlePrevious}>Prevoius</button></span>
                    </div><div className='col-6'>
                    <span className='d-flex justify-content-end'><button className="btn btn-sm btn-dark " disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNext}>Next</button></span>
                    </div>
                     </div> */}
            </div>
            </InfiniteScroll>
            </>
        )
    }
}

export default News
