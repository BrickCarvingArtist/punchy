import {stringify} from "querystring";
import {asyncAction, asyncFormAction} from "./utils";
export const setMyArticles = (queries, isRefresh) => asyncAction({
	path: `/api/article?${stringify(queries)}`
}, data => ({
	type: "MY_ARTICLES",
	value: data,
	isRefresh,
	ok: 1
}))();
export const setMyFavorites = (queries, isRefresh) => asyncAction({
	path: `/api/article/favorite?${stringify(queries)}`
}, data => ({
	type: "MY_FAVORITES",
	value: data,
	isRefresh,
	ok: 1
}))();
export const updateMyFavorites = value => ({
	type: "UPDATE_MY_FAVORITES",
	value
});
export const getAuthorProfile = author => asyncAction({
	path: `/api/profile/${author}`
}, data => ({
	type: "AUTHOR_PROFILE",
	value: data,
	ok: 1
}))();
export const removeMyArticle = (articleId, index) => asyncAction({
	method: "DELETE",
	path: `/api/article/${articleId}`
}, () => ({
	type: "UPDATE_MY_ARTICLES",
	value: index,
	ok: 1
}))();
export const setAuthorArticles = (queries, isRefresh) => asyncAction({
	path: `/api/article?${stringify(queries)}`
}, data => ({
	type: "AUTHOR_ARTICLES",
	value: data,
	isRefresh,
	author: queries.author,
	ok: 1
}))();
export const focus = author => asyncFormAction({
	method: "POST",
	path: "/api/relation/focus",
	body: stringify({
		author
	})
}, data => ({
	type: "UPDATE_FOCUS",
	value: data,
	ok: 1
}))();
export const setMyFocuses = (queries, isRefresh) => asyncAction({
	path: `/api/relation/focus?${stringify(queries)}`
}, data => ({
	type: "MY_FOCUSES",
	value: data,
	isRefresh,
	ok: 1
}))();
export const updateMyFocuses = value => ({
	type: "UPDATE_MY_FOCUSES",
	value
});