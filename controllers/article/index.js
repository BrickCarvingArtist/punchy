import Router from "koa-router";
import body from "koa-bodyparser";
import get from "./get";
import insert from "./insert";
import category from "./category";
import random from "./random";
import list from "./list";
import update from "./update";
import remove from "./remove";
import detail from "./detail";
import validate from "../middlewares/validate";
import authorize from "../middlewares/authorize";
export default () => {
	return new Router({
		prefix: "/api/article"
	})
	// 类目接口
	.get("/category", category())
	// 所有文章接口
	.get("/", validate({
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
				name: "sup_label",
				alias: "number",
				required: false,
				comment: "一级类目"
			},
			{
				name: "sub_label",
				alias: "number",
				required: false,
				comment: "二级类目"
			},
			{
				name: "from",
				alias: "time",
				required: false,
				comment: "开始时间"
			},
			{
				name: "to",
				alias: "time",
				required: false,
				comment: "截止时间"
			}
		]
	}), get())
	// 增接口
	.put("/", authorize(), body(), validate({
		body: [
			{
				name: "title",
				comment: "文章标题"
			},
			{
				name: "sup_label",
				alias: "number",
				comment: "一级类目"
			},
			{
				name: "sub_label",
				alias: "number",
				comment: "二级类目"
			},
			{
				name: "content",
				alias: "notEmpty",
				comment: "文章内容",
			}
		]
	}), insert())
	// 改接口
	.patch("/", authorize(), body(), validate({
		body: [
			{
				name: "id",
				comment: "文章id"
			},
			{
				name: "title",
				comment: "文章标题",
				required: false
			},
			{
				name: "sup_label",
				alias: "number",
				required: false,
				comment: "一级类目"
			},
			{
				name: "sub_label",
				alias: "number",
				required: false,
				comment: "二级类目"
			},
			{
				name: "content",
				alias: "notEmpty",
				comment: "文章内容",
				required: false
			}
		]
	}), update())
	// 删接口
	.delete("/:id", authorize(), validate({
		params: [
			{
				name: "id",
				alias: "number",
				comment: "文章id"
			}
		]
	}), remove())
	// 随机文章接口
	.get("/random", random())
	// 根据用户查文章列表接口
	// .get("/list", authorize(), list())
	// 查详情接口
	.get("/:id", validate({
		params: [
			{
				name: "id",
				alias: "number"
			}
		]
	}), detail())
	.routes();
};