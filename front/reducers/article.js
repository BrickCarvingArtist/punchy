export default (state = {
	articles: [],
	category: []
}, {type, value}) => {
	switch(type){
		case "ALL_ARTICLES":
			return {
				...state,
				articles: value
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