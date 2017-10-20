import Router from "koa-router";
import body from "koa-bodyparser";
import svg from "./svg";
import test from "./test";
export default () => new Router()
	// 测试svg
	.get("/svg", svg())
	// 测试
	.post("/test", body(), test())
	.routes();