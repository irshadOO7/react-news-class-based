import React, { Component } from 'react'
import Navbar from './component/Navbar'
import News from './component/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={10}
        // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path="/" element={<News key="home" pageSize={6} category="general"  apikey={this.apiKey}/> }></Route>
          <Route exact path="/general" element={<News key="general" pageSize={6} category="general"  apikey={this.apiKey}/> }></Route>
          <Route exact path="/business" element={<News key="business" pageSize={6} category="business"   apikey={this.apiKey} /> }></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} category="entertainment"   apikey={this.apiKey} /> }></Route>
          <Route exact path="/health" element={<News key="health" pageSize={6} category="health"   apikey={this.apiKey} /> }></Route>
          <Route exact path="/science" element={<News key="science" pageSize={6} category="science"   apikey={this.apiKey} /> }></Route>
          <Route exact path="/sports" element={<News key="sports" pageSize={6} category="sports"   apikey={this.apiKey} /> }></Route>
          <Route exact path="/technology" element={<News key="technology" pageSize={6} category="technology"  apikey={this.apiKey}/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
