import Router from "koa-router";
import body from "koa-bodyparser";
import authorize from "../middlewares/authorize";
import validate from "../middlewares/validate";
import getMyFocus from "./get_my_focus";
import getFocus from "./get_focus";
import focus from "./focus";
export default () => new Router({
	prefix: "/api/relation"
})
	// 获取我的关注接口
	.get("/focus", authorize(), getMyFocus())
	// 获取用户的关注接口
	.get("/focus/:id", validate({
		params: [
			{
				name: "id",
				alias: "tel",
				comment: "用户id"
			}
		]
	}), getFocus())
	// 关注接口
	.post("/focus", authorize(), body(), validate({
		body: [
			{
				name: "author",
				alias: "tel",
				comment: "作者id"
			}
		]
	}), focus())
	.routes();