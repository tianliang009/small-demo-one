import React,{ Component } from 'react';
import './style.css';
import OrderList from '../OrderList'
import Header from '../Header'
export default class App extends Component{
    render(){
        return(
            <div className="App">
                <Header />
                <OrderList />
            </div>
        )
    }
}