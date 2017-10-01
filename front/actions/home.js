import {stringify} from "querystring";
import {asyncAction} from "./utils";
export const setArticles = (queries, isRefresh) => asyncAction({
	path: `/api/article?${stringify(queries)}`
}, data => ({
	type: "ARTICLES",
	value: data,
	isRefresh,
	ok: 1
}))();