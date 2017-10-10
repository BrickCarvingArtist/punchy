import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Scroller from "../../components/Scroller";
import {alert} from "../../components/Dialog";
import {basis, setSlideOnBar} from "../../actions";
import {setMyFocuses, focus, updateMyFocuses} from "../../actions/user";
@connect(({me, user}) => ({
	user: me.tel,
	data: user.focuses
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar,
	updateMyFocuses,
	dispatch
}, dispatch))
export default class Focus extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	componentDidMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
		setTitle("我的关注");
		setHeaderLeftButton("back");
		setHeaderRightButton();
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
		try{
			dispatch(await setMyFocuses({
				user_id: user,
				index,
				size
			}, isRefresh)).ok || this.setState({
				ending: 1
			});
		}catch(e){
			alert(e);
		}
	}
	async cancelFocus(author, index){
		const {
			dispatch,
			updateMyFocuses
		} = this.props;
		try{
			const {ok} = dispatch(await focus(author));
			if(ok){
				updateMyFocuses(index);
				alert("取消关注成功");
			}
		}catch(e){
			alert(e);
		}
	}
	renderAuthors({tel, name, avatar}, index){
		return (
			<section>
				<Link to={`/${tel}`}>
					<img src={avatar || "/avatars/avatar.png"} alt="作者头像" />
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