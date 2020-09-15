import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FullRow from '../components/FullRow.js';

export class NewsScreen extends React.Component {
  render() {
    return <div>
      <FullRow>
        <nav className="breadcrumb-container">
          <ol className="breadcrumb">
            <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
            <li className="breadcrumb-item"><Link to="/news">Competition News</Link></li>
          </ol>
        </nav>
      </FullRow>
      <FullRow>
          <div align="center"><img src="/img/colombia/news.png" /></div>
          </FullRow>
          <FullRow style={{padding: '2em 1em'}}>     
        <h3>News Sept 15th 2020</h3>   
        <p>The tank registration period starts today! Don't forget to join your tank to the league!</p>
      </FullRow>
      <FullRow style={{padding: '2em 1em'}}>     
        <h3>News Sept 4th 2020</h3>   
        <p>The registration period has been extended to Sept 14th 2020!</p>
      </FullRow>
      <FullRow style={{padding: '2em 1em'}}>     
        <h3>News August 20th 2020</h3>   
        <p>Jalasoft’s Universal JsBattle Championship has started! Visit our <a href="#/competition">competition page</a> to learn more!</p>
      </FullRow>
     


    </div>;
  }
}

export default connect()(NewsScreen);
