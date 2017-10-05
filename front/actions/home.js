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
export const search = value => asyncAction({
	path: `/api/article/search/${encodeURIComponent(value.trim())}`
}, value => ({
	type: "SEARCH_RESULTS",
	value,
	ok: 1
}))();
export const setRecommendations = size => asyncAction({
	path: `/api/article/recommendation?${stringify({
		size
	})}`
}, value => ({
	type: "RECOMMENDATIONS",
	value
}))();
export const clearHistory = () => ({
	type: "CLEAR_HISTORY"
});