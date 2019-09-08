import React,{ Component } from 'react';
import './style.css';
import OrderItem from '../OrderItem'

export default class OrderList extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        fetch('/mock/orders.json').then(res=>{
            if(res.ok){
                res.json().then(data=>{
                    this.setState({
                        data:data
                    })
                })
            }
        })
    }
    render(){
        return(
            <div>
                {
                    this.state.data.map(item=>{
                        return(
                            <OrderItem key={item.id} data={item} 
                            onSubmit={this.handelSubmit}
                            /> 
                        )
                    })
                }
            </div>
        )
    }
    handelSubmit=(id,comment,stars)=>{
        // fetch('saveComment').then(()=>{
        // })
        const newData = this.state.data.map(item=>{
            return item.id === id ?
            {
                ...item,comment,stars,ifCommented:true
            }:item;
        });
        this.setState({
            data:newData
        });
    }
}