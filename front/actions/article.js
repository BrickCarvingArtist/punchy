import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
import {SERVER_NAME} from "../configs";
export const setCategory = () => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article/category`)).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "ARTICLE_CATEGORY",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const setArticles = (queries, isRefresh) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article?${stringify(queries)}`)).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "ALL_ARTICLES",
			value: data,
			isRefresh,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const getDetail = id => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article/${id}`, {
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "ARTICLE_DETAIL",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const getUserRelationsToArticle = id => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article/relation/${id}`, {
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "USER_RELATIONS_TO_ARTICLE",
			value: data
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const addFavorite = id => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article/favorite`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: stringify({
				article_id: id
			}),
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "FAVORITE_ARTICLE",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const saySix = id => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article/say_six`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: stringify({
				article_id: id
			}),
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message,
				ok: 1
			};
		}
		return {
			type: "SIX_ARTICLE",
			value: data
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();