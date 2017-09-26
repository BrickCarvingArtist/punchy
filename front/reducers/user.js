export default (state = {
	articles: [],
	favorites: [],
	focuses: []
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
		case "UPDATE_MY_FAVORITES":
			return {
				...state, 
				favorites: (() => {
					const favorites = [...state.favorites];
					favorites.splice(value, value + 1);
					return favorites;
				})()
			};
		case "MY_FOCUSES":
			return isRefresh ? {
				...state,
				focuses: value
			} : {
				...state,
				focuses: [
					...state.focuses,
					...value
				]
			};
		case "UPDATE_MY_FOCUSES":
			return {
				...state, 
				focuses: (() => {
					const focuses = [...state.focuses];
					focuses.splice(value, value + 1);
					return focuses;
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