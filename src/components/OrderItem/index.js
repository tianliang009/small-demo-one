import React,{ Component } from 'react';
import './style.css';
export default class OrderItem extends Component{
    constructor(props){
        super(props);
        this.state={
            editing:false,
            stars:props.data.star||0,
            comment:props.data.comment||""
        }
    }
    render(){
        const { shop , product , price , picture ,  ifCommented } = this.props.data;
        return(
            <div className="orderItem">
                <div className="orderItem__priContainer">
                    <img className="orderItem__pic" src={picture} />
                </div>
                <div className="orderItem__content">
                    <div className="orderItem_product">{product}<div/>
                    <div className="orderItem__shop">{shop}</div>
                    <div className="orderItem__detail">
                        <div className="orderItem__price">{price}</div>
                        <div>
                            {
                                ifCommented ? (
                                   <button className="orderItem__btn orderItem__btn--grey">已评价</button>
                                ):(
                                   <button className="orderItem__btn orderItem__btn--red" 
                                   onClick={this.handelOpenEditArea}
                                   >评价</button>
                                )
                            }
                        </div>
                    </div>
                    </div>
                </div>
                {this.state.editing ? this.renderEditArea():null}
            </div>
        )
    }
    handelOpenEditArea=()=>{
        this.setState({
            editing:true
        })
    }
    handelCommentChange=(e)=>{
        this.setState({
            comment:e.target.value
        })
    }
    renderEditArea(){
        return(
            <div className="orderItem__commentContainer">
                <textarea 
                onChange={this.handelCommentChange}
                value={this.state.comment}
                className="orderItem__comment" />
                {this.renderStars()}
                <button className="orderItem__btn orderItem__btn--red"
                onClick={this.handelSubmitComment}
                >提交</button>
                <button className="orderItem__btn orderItem__btn--grey"
                onClick={this.handelCancelComment}
                >取消</button>
            </div>
        )
    }
    handelSubmitComment=()=>{
        const {id} = this.props.data;
        const { comment , stars} =this.state; 
        this.setState({
            editing:false
        })
        this.props.onSubmit(id,comment,stars)
    }
    handelCancelComment=()=>{
        this.setState({
            editing:false,
            stars:this.props.data.star||0,
            comment:this.props.data.comment||""
        })
    }
    handelClickstars=(stars)=>{
        this.setState({
            stars:stars
        })
    }
    renderStars(){
        const {stars} = this.state;
        return(
            <div>
                {
                    [1,2,3,4,5].map((item,index)=>{
                        const lightClass = stars >= item ?
                        "orderItem__star--light":""
                        return(
                            <span key={index}
                            className={"orderItem__star "+lightClass}
                            onClick={this.handelClickstars.bind(this,item)}>★</span>
                        )
                    })
                }
            </div>
        )
    }
}