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
		default:
			return state;
	}
};