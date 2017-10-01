import {stringify} from "querystring";
import {asyncAction, asyncFormAction} from "./utils";
export const setCategory = asyncAction({
	path: "/api/article/category"
}, data => ({
	type: "ARTICLE_CATEGORY",
	value: data,
	ok: 1
}));
export const setArticles = (queries, isRefresh) => asyncAction({
	path: `/api/article?${stringify(queries)}`
}, data => ({
	type: "ALL_ARTICLES",
	value: data,
	isRefresh,
	ok: 1
}))();
export const removeArticle = (articleId, index) => asyncAction({
	method: "DELETE",
	path: `/api/article/${articleId}`
}, () => ({
	type: "UPDATE_ARTICLES",
	value: index,
	ok: 1
}))();
export const getDetail = id => asyncAction({
	path: `/api/article/${id}`
}, data => ({
	type: "ARTICLE_DETAIL",
	value: data,
	ok: 1
}))();
export const getUserRelationsToArticle = id => asyncAction({
	path: `/api/article/relation/${id}`
}, data => ({
	type: "USER_RELATIONS_TO_ARTICLE",
	value: data
}))();
export const addFavorite = id => asyncFormAction({
	method: "PATCH",
	path: "/api/article/favorite",
	body: stringify({
		article_id: id
	})
}, data => ({
	type: "FAVORITE_ARTICLE",
	value: data,
	ok: 1
}))();
export const saySix = id => asyncFormAction({
	method: "PATCH",
	path: "/api/article/say_six",
	body: stringify({
		article_id: id
	})
}, data => ({
	type: "SIX_ARTICLE",
	value: data
}))();