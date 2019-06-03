import React, {Component} from 'react';
import './styles.css'
import web3 from '../../Utils/web3';
import { getTransactionHistory } from '../../Services/TransactionsHistoryService';

export default class Transactions extends Component {
  state = {
    balance: 0,
    transactionHistory: [],
  };
  componentDidMount = async () => {
    this.reloadAccountInfo();
    setInterval(this.reloadAccountInfo, 5000);
  };

  reloadAccountInfo = async () => {
      const transactionHistory = await getTransactionHistory(this.props.authorWalletAddress);
      const balance = await web3.eth.getBalance(this.props.authorWalletAddress);
      console.log(transactionHistory);
      this.setState({
          balance: web3.utils.fromWei(balance, 'ether'),
          transactionHistory,
      });
  };

  render() {
    return (
        <div className="transactions">
            <div className="balance">
                <h2>Balance: {this.state.balance} ETH</h2>
            </div>
            <div className="transactions-list">
                {this.state.transactionHistory.map(transaction => (
                    <div className="card" key={transaction.hash}>
                        <p>{transaction.timeStamp}</p>
                        <div>
                            <p>From : {transaction.from || "No address found"}</p>
                            <p>To : {transaction.to || "No address found"}</p>
                        </div>
                        <p>{transaction.value} ETH</p>
                    </div>
                ))}
            </div>
        </div>
    );
  }
}
