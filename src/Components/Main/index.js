import React, {Component} from 'react';
import './styles.css';
import ContentView from "../ContentView";
import Transactions from "../Transactions";

export default class Main extends Component {
  state = {
    authorWalletAddress: '0x744cdf92e7b218ad8eC566870B602545e7278F77',
  };

  render() {
    return ( 
      <div className="container">
        <div className="analyticsData">
            <Transactions authorWalletAddress = {this.state.authorWalletAddress}/>
            <ContentView />
        </div>
      </div>
    );
  }
}