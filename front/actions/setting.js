import {stringify} from "querystring";
import {asyncAction, asyncFormAction} from "./utils";
export const setAvator = file => asyncAction({
	method: "PATCH",
	path: "/api/avator",
	body: file
}, data => ({
	type: "USER_AVATOR",
	value: data,
	ok: 1
}), 1)();
export const updateUserName = name => asyncFormAction({
	method: "PATCH",
	path: "/api/profile",
	body: stringify({
		name
	})
}, data => ({
	type: "USER_NAME",
	value: name,
	ok: 1
}), 1)();