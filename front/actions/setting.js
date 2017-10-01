import {stringify} from "querystring";
import {asyncAction, asyncFormAction} from "./utils";
export const setAvatar = file => asyncAction({
	method: "PATCH",
	path: "/api/avatar",
	body: file
}, data => ({
	type: "USER_avatar",
	value: data,
	ok: 1
}))();
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
}))();