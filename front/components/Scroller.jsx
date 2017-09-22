import React, {Component, Children} from "react";
import {findDOMNode} from "react-dom";
import classNames from "classnames";
export default class Scroller extends Component{
	static defaultProps = {
		loadingHeight: 30
	};
	state = {
		index: -1,
		canloadable: 0,
		loading: 0
	};
	componentWillMount(){
		this.loadData(1);
	}
	async loadData(isRefresh){
		await this.setState({
			canloadable: 0,
			loading: 1,
			index: isRefresh ? 0 : ++this.state.index
		});
		await this.props.loadData(this.state.index, isRefresh);
		this.setState({
			canloadable: 1,
			loading: 0
		});
	}
	scrollBack(distance){
		const scroller = findDOMNode(this),
			{loadingHeight} = this.props,
			t = setInterval(() => {
				scroller.style.paddingTop = `${--distance}px`;
				scroller.style.backgroundPositionY = `${distance - loadingHeight}px`;
				if(distance <= 0){
					clearInterval(t);
					scroller.style.paddingTop = 0;
				}
			}, 1);
	}
	render(){
		const {
			children,
			className,
			loadData,
			ending,
			loadingHeight
		} = this.props;
		let scroller, startY, distance;
		return (
			<div className={classNames("scroller", className)} ref={
				dom => {
					scroller = dom;
				}
			} onScroll={
				async e => {
					const needLoad = scroller.offsetHeight + scroller.scrollTop + 200 > scroller.scrollHeight;
					needLoad && this.state.canloadable && !ending && this.loadData();
				}
			} onTouchStart={
				({touches}) => {
					startY = touches[0].pageY;
				}
			} onTouchMove={
				({changedTouches}) => {
					const realDistance = changedTouches[0].pageY - startY;
					if(realDistance < 0 || scroller.scrollTop > 0){
						return;
					}
					distance = Math.sqrt(10 * realDistance);
					scroller.style.paddingTop = `${distance}px`;
					scroller.style.backgroundPositionY = `${distance - loadingHeight}px`;
				}
			} onTouchEnd={
				async ({changedTouches}) => {
					if(!distance){
						return;
					}
					await new Promise((resolve, reject) => {
						if(distance > 0 && distance < 40){
							return resolve();
						}
						resolve(this.loadData(1));
					});
					this.scrollBack(distance);
				}
			}>
				{
					Children.map(children, (item, index) => item)
				}
				{
					this.state.loading ? <p className="note">奋力加载中...</p> : null
				}
				{
					ending ? <p className="note">不好，底都被你看光了...</p> : null
				}
			</div>
		);
	}
};