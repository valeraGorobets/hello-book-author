import React, { Component } from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

import './styles.css';

class App extends Component {
    render() {
        return (
            <div>
                <div className="content">
                    <Header />
                    <Main />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;