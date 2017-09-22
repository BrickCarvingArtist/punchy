export default (state = {
	articles: [],
	favorites: []
}, {type, value, isRefresh}) => {
	switch(type){
		case "MY_ARTICLES":
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