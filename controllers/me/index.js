import {resolve} from "path";
import Router from "koa-router";
import body from "koa-bodyparser";
// import multer from "koa-multer";
import validate from "../middlewares/validate";
import oss from "ali-oss";
import {authorize} from "../middlewares";
import getProfile from "./get_profile";
import setAvator from "./set_avator";
import setProfile from "./set_profile";
import out from "./out";
// const upload = multer();
const store = oss({
	accessKeyId: "LTAIivs5Cr0HKhX0",
	accessKeySecret: "7HFvwOp3pZqjWHExM4R9sYF5JYgBxk",
	bucket: "ikindness-static",
	region: "oss-cn-hangzhou"
});
// console.log(store);
export default () => new Router({
	prefix: "/api"
})
.get("/profile", authorize(), getProfile())
.patch("/profile", authorize(), body(), validate({
	body: [
		{
			name: "name",
			alias: "user"
		}
	]
}), setProfile())
.patch("/avator", authorize(), setAvator())
.get("/out", authorize(), out())
.routes();