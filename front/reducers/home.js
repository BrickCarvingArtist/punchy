export default (state = {
	articles: [],
	results: [],
	recommendations: [],
	histories: []
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
	case "SEARCH_RESULTS":
		return {
			...state,
			results: value
		};
	case "RECOMMENDATIONS":
		return {
			...state,
			recommendations: value
		};
	case "VIEWED_HISTORY":
		return {
			...state,
			histories: [
				value,
				...state.histories.filter(({id}) => id != value.id).slice(0, 2)
			]
		};
	case "CLEAR_HISTORY":
		return {
			...state,
			histories: []
		};
	default:
		return state;
	}
};