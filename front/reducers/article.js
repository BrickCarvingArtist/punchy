export default (state = {
	articles: [],
	category: []
}, {type, value, isRefresh}) => {
	switch(type){
		case "ALL_ARTICLES":
			return isRefresh ? {
				...state,
				articles: value
			} : {
				...state,
				articles: [
					...state.articles,
					...value
				]
			};
		case "UPDATE_ARTICLES":
			return {
				...state,
				articles: (() => {
					const articles = [...state.articles];
					articles.splice(value, 1);
					return articles;
				})()
			};
		case "ARTICLE_DETAIL":
			return {
				...state,
				[value.id]: value
			};
		case "ARTICLE_CATEGORY":
			return {
				...state,
				category: value
			};
		default:
			return state;
	}
};