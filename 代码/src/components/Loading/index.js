import React, { Component } from 'react'
import Bscroll from "better-scroll"
export default class MyLoading extends Component {
    componentDidMount(){
        this.srcoll = new Bscroll("."+this.props.myclass,{
            pullUpLoad:true,
            click:true,
            scrollY:true
        })

        //如果有上拉请求数据加载更多的功能;
        if(this.props.loadingAdd){
            this.srcoll.on("pullingUp",async ()=>{
                await this.props.loadingAdd();
                //数据加载完毕，需要告诉better-scroll数据已经加载;
                this.srcoll.finishPullUp()
                //重新计算better-scroll,dom结构肯定发生变化，调用，保证滚动的正确
                this.srcoll.refresh()
            })
        }
        this.srcollLoading({y:-5})
        //滚动时候触发
        this.srcoll.on("scroll",this.srcollLoading)
    }
    scrollToFn(index){
        let itemList=[...this.refs.scrollBox.querySelectorAll(".item")]
       this.srcoll.scrollTo(0,-itemList[index].offsetTop,500)
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.ind!==this.props.ind){
            this.scrollToFn(nextProps.ind-1)
        }else if(nextProps.tableft!==this.props.tableft){
            this.srcoll.scrollTo(0,-5)
        }
        return true
    }
    srcollLoading=position=>{
        //先获取图片
        let imgList=[...this.refs.scrollBox.querySelectorAll('img')]
        if(!imgList.length){
            //滚动到初始位置
            this.srcoll.scrollTo(0,-5)
            return
        }
        //滚动的时候去加载图片
        imgList.forEach(v=>{
            let imgOrigin=v.dataset.src;
            if(this.refs.scrollBox.clientHeight-position.y>=v.offsetTop){
                v.src=imgOrigin
            }
        })
    }
    render() {
        return (
            <div className={this.props.myclass} ref="scrollBox">
                {this.props.children}
            </div>
        )
    }
}
