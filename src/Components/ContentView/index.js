import React, { Component } from 'react';
import './styles.css';
import storehash from '../../Utils/storehash';
import FileInput from '../FileInput';

export default class ContentView extends Component {
    state = {
        ipfsHash: null,
        buffer: '',
        ethAddress: '...',
        transactionHash: '',
        txReceipt: '',
    };

    componentDidMount = async () => {
        const ethAddress = await storehash.options.address;
        this.setState({ethAddress});
    };

    onHashRecieved = (ipfsHash) => {
        console.log(ipfsHash);
        this.setState({ipfsHash});
    };

    isLoading = (loading) => {
        this.setState({loading});
    };

    render() {
        return (
            <div className="contentView">
                <div className="caption">
                    <h2>Saving file to IPFS</h2>
                </div>
                <div className="main-view">
                    <FileInput onHashRecieved = {this.onHashRecieved} isLoading = {this.isLoading}/>
                    {this.state.loading ?
                            <div className="loader-wrapper">
                                <div className="loader" ></div>
                            </div>
                        : ''
                    }
                    {this.state.ipfsHash ?
                        <table>
                            <thead>
                            <tr>
                                <th>Tx Receipt Category</th>
                                <th></th>
                                <th>Values</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Ethereum Contract Address</td>
                                <td> : </td>
                                <td>{this.state.ethAddress}</td>
                            </tr>
                            <tr>
                                <td>IPFS Hash stored on Ethereum</td>
                                <td> : </td>
                                <td>{this.state.ipfsHash}</td>
                            </tr>
                            </tbody>
                        </table>
                        : ''
                    }
                </div>
            </div>
        );
    }
}
