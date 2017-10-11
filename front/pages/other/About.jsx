import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../../actions";
import {BAIDU_ACCESS_KEY} from "../../configs/index";
import {attachStyles} from "../../utils";
@attachStyles(() => require("../../styles/about"))
@connect(() => ({}), dispatch => bindActionCreators(basis, dispatch))
export default class About extends Component{
	componentWillMount(){
		this.props.setTitle("关于我们");
	}
	componentDidMount(){
		const {
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
		setHeaderLeftButton("back");
		setHeaderRightButton();
		this.renderMap();
	}
	loadMap(){
		const {Map, Point, Marker, InfoWindow} = BMap,
			map = new Map("map"),
			point = new Point(120.140868,30.181283),
			marker = new Marker(point),
			infoWindow = new InfoWindow("开发者所在地<br /><br />地址：风尚蓝湾-2幢-1单元2210室", {});
		map.addOverlay(marker);
		map.centerAndZoom(new Point(120.180868,30.221283), 13);
		marker.addEventListener("click", () => {
			map.openInfoWindow(infoWindow, point);
		});
		map.openInfoWindow(infoWindow, point);
	}
	renderMap(){
		const api = document.createElement("script");
		api.src = `https://api.map.baidu.com/api?v=2.0&ak=${BAIDU_ACCESS_KEY}&callback=loadBaiduMap`;
		window.loadBaiduMap = this.loadMap;
		document.body.appendChild(api);
	}
	render(){
		return (
			<div className="page about with-footer">
				<h1>关于开发者</h1>
				<div className="row">
					<label>Github：</label>
					<a className="small" href="https://github.com/BrickCarvingArtist">BrickCarvingArtist</a>
				</div>
				<div className="row">
					<label>QQ号：</label>
					<a className="small" href="http://wpa.qq.com/msgrd?v=3&uin=806321554&site=qq&menu=yes">砖雕艺术家</a>
				</div>
				<div className="row">
					<label>QQ群：</label>
					<a className="small" href="http://shang.qq.com/wpa/qunwpa?idkey=6ff6f2e96e77e3321c42a756bc7a83a64ac70129da6f3d0a59809afe08346998">精通JavaScript</a>
				</div>
				<div className="map" id="map"></div>
				<div className="row">
					<a className="small" href="http://icp.chinaz.com/info?q=%E6%B5%99ICP%E5%A4%8715038011%E5%8F%B7" data-reactid="198">浙ICP备15038011号</a>
				</div>
			</div>
		);
	}
}