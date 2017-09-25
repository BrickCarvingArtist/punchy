export default (state = {
	articles: [],
	favorites: []
}, {type, value, isRefresh, author}) => {
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
		case "MY_FAVORITES":
			return isRefresh ? {
				...state,
				favorites: value
			} : {
				...state,
				favorites: [
					...state.favorites,
					...value
				]
			};
		case "UPDATE_MY_FAVORITE":
			return {
				...state, 
				favorites: (() => {
					const favorites = [...state.favorites];
					favorites.splice(value, value + 1);
					return favorites;
				})()
			};
		case "AUTHOR_PROFILE":
			return {
				...state,
				[value.tel]: {
					...state[value.tel],
					...value
				}
			};
		case "AUTHOR_ARTICLES":
			return isRefresh ? {
				...state,
				[author]: {
					...state[author],
					articles: value
				}
			} : {
				...state,
				[author]: {
					...state[author],
					articles: [
						...state[author].articles,
						...value
					]
				}
			};
		default:
			return state;
	}
};