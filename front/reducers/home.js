export default (state = {
	articles: []
}, {type, value, isRefresh}) => {
	switch(type){
		case "ARTICLES": 
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
		case "UPDATE_RANDOM_ARTICLES":
			return {
				...state,
				articles: (() => {
					const articles = [...state.articles];
					articles.splice(value, 1);
					return articles;
				})()
			};
		default:
			return state;
	}
};