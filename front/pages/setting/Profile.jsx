import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../../actions";
import {updateUserName} from "../../actions/setting";
@connect(({core, me}) => ({
	name: me.name
}), dispatch => bindActionCreators(basis, dispatch))
@connect()
export default class User extends Component{
	static defaultProps = {
		name: ""
	};
	componentWillMount(){
		const {
			dispatch,
			setMessage,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType,
			history
		} = this.props;
		setTitle("新用户名");
		setHeaderLeftButton("back");
		setHeaderRightButton({
			label: "完成",
			level: 1,
			onClick: async () => {
				const {value} = this.input;
				const ok = await new Promise(async (resolve, reject) => {
					let isEquals = value === this.props.name;
					if(isEquals){
						return resolve(isEquals);
					}
					resolve(dispatch(await updateUserName(value)).ok);
				});
				if(ok){
					setMessage("修改成功");
					history.goBack();
				}
			}
		});
		setFooterType();
	}
	componentWillUnmount(){
		this.props.setHeaderRightButton();
	}
	componentDidMount(){
		const {input} = this;
		const {length} = this.props.name;
		input.focus();
		input.setSelectionRange(length, length);
	}
	render(){
		const {
			headerType,
			name
		} = this.props;
		return (
			<div className="page setting with-footer">
				<input type="text" className="full" placeholder="请输入用户名" defaultValue={name} ref={
					dom => {
						this.input = dom;
					}
				} />
			</div>
		);
	}
}