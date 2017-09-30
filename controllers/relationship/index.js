import Router from "koa-router";
import body from "koa-bodyparser";
import authorize from "../middlewares/authorize";
import validate from "../middlewares/validate";
import getFocus from "./get_focus";
import focus from "./focus";
export default () => new Router({
	prefix: "/api/relation"
})
	// 获取用户的关注接口
	.get("/focus", validate({
		query: [
			{
				name: "index",
				alias: "number",
				required: false,
				comment: "页码"
			},
			{
				name: "size",
				alias: "number",
				required: false,
				comment: "每页信息条数"
			},
			{
				name: "user_id",
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