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
export const removeArticle = (articleId, index) => asyncAction({
	method: "DELETE",
	path: `/api/article/${articleId}`
}, () => ({
	type: "UPDATE_RANDOM_ARTICLES",
	value: index,
	ok: 1
}))();