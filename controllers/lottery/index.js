import Router from "koa-router";
import tabPage from "./tab_page";
import flipPage from "./flip_page";
import getPrize from "./get_prize";
import getResult from "./get_result";
export default () => new Router({
	prefix: "/lottery"
})
// 转盘抽奖页
.get("/tab", tabPage())
// 翻牌抽奖页
.get("/flip", flipPage())
// 奖品类别接口
.get("/prizes", getPrize())
// 抽奖结果接口
.post("/", getResult())
.routes();