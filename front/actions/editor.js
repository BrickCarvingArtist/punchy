import {stringify} from "querystring";
import {asyncAction, asyncFormAction} from "./utils";
export const saveAll = ({...value}) => ({
	type: "DRAFT_ALL",
	value
});
export const insert = article => asyncFormAction({
	method: "PUT",
	path: "/api/article",
	body: stringify(article)
}, data => ({
	type: "ARTICLE_DETAIL",
	value: data,
	ok: 1
}), 1)();
export const update = article => asyncFormAction({
	method: "PATCH",
	path: "/api/article",
	body: stringify(article)
}, data => ({
	type: "ARTICLE_DETAIL",
	value: data,
	ok: 1
}), 1)();
export const clearDraft = value => ({
	type: "CLEAR_DRAFT",
	value
});