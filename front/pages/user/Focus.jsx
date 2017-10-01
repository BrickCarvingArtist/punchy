import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Scroller from "../../components/Scroller";
import {basis, setSlideOnBar} from "../../actions";
import {setMyFocuses, focus, updateMyFocuses} from "../../actions/user";
@connect(({me, user}) => ({
	user: me.tel || 19999999999,
	data: user.focuses
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar,
	updateMyFocuses
}, dispatch))
@connect()
export default class Focus extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	async componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("我的关注");
		setHeaderLeftButton("back");
		setHeaderRightButton();
		setFooterType();
	}
	componentWillReceiveProps(nextProps){
		const nextLength = nextProps.data.length,
			{
				data,
				size
			} = this.props;
		this.setState({
			ending: data.length == nextLength || nextLength % size
		});
	}
	async getData(index, isRefresh){
		const {
			dispatch,
			size,
			user
		} = this.props;
		dispatch(await setMyFocuses({
			user_id: user,
			index,
			size
		}, isRefresh)).ok || this.setState({
			ending: 1
		});
	}
	async cancelFocus(author, index){
		const {
			dispatch,
			setMessage,
			updateMyFocuses
		} = this.props;
		const {ok} = dispatch(await focus(author));
		if(ok){
			updateMyFocuses(index);
			setMessage("取消关注成功");
		}
	}
	renderAuthors({tel, name, avatar}, index){
		return (
			<section>
				<Link to={`/${tel}`}>
					<img src={avatar || "/avatar.png"} alt="作者头像" />
					<strong>{name || tel}</strong>
				</Link>
				<a className="border-button blue" onClick={this.cancelFocus.bind(this, tel, index)}>取消关注</a>
			</section>
		);
	}
	render(){
		return (
			<Scroller className="page my-focus with-footer" loadData={::this.getData} ending={this.state.ending}>
				{
					this.props.data.map(::this.renderAuthors)
				}
			</Scroller>
		);
	}
}