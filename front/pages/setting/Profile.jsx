import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {alert} from "../../components/Dialog";
import {basis} from "../../actions";
import {updateUserName} from "../../actions/setting";
@connect(({core, me}) => ({
	name: me.name || ""
}), dispatch => bindActionCreators({
	...basis,
	dispatch
}, dispatch))
export default class User extends Component{
	static defaultProps = {
		name: ""
	};
	componentWillMount(){
		this.props.setTitle("新用户名");
	}
	componentDidMount(){
		const {
			dispatch,
			setHeaderLeftButton,
			setHeaderRightButton,
			history
		} = this.props;
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
					try{
						resolve(dispatch(await updateUserName(value)).ok);
					}catch(e){
						alert(e);
					}

				});
				if(ok){
					alert("修改成功");
					history.goBack();
				}
			}
		});
	}
	componentDidMount(){
		const {input} = this;
		const {length} = this.props.name;
		input.focus();
		input.setSelectionRange(0, length);
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