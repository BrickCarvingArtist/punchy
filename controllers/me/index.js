import {resolve} from "path";
import Router from "koa-router";
import body from "koa-bodyparser";
import multer from "koa-multer";
import validate from "../middlewares/validate";
import {authorize} from "../middlewares";
import getMyProfile from "./get_my_profile";
import getProfile from "./get_profile";
import setAvatar from "./set_avatar";
import setProfile from "./set_profile";
import out from "./out";
export default () => new Router({
	prefix: "/api"
})
	.get("/profile", authorize(), getMyProfile())
	.get("/profile/:id", validate({
		params: [
			{
				name: "id",
				alias: "tel",
				comment: "作者id"
			}
		]
	}), getProfile())
	.patch("/profile", authorize(), body(), validate({
		body: [
			{
				name: "name",
				alias: "user"
			}
		]
	}), setProfile())
	.patch("/avatar", authorize(), multer({
		storage: multer.memoryStorage()
	}).single("avatar"), setAvatar())
	.get("/out", out())
	.routes();