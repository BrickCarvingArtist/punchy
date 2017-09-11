import Router from "koa-router";
import body from "koa-bodyparser";
import homePage from "./home_page";
import discoverPage from "./discover_page";
import svg from "./svg";
import planPage from "./plan_page";
import test from "./test";
import notFound from "./not_found";
export default () => new Router()
	// 首页
	.get("/", homePage())
	// 发现
	.get("/discover", discoverPage())
	// 测试svg
	.get("/svg", svg())
	// 测试svg
	.get("/plan", planPage())
	// 测试
	.post("/test", body(), test())
	// 404
	.get("*", notFound())
	.routes();