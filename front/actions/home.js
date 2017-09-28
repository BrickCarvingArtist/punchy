import {asyncAction} from "./utils";
export const setArticles = asyncAction({
	path: "/api/article/random"
}, data => ({
	type: "ARTICLES",
	value: data,
	ok: 1
}), 1);