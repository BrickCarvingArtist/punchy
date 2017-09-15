export default (state = {}, {type, value}) => {
	switch(type){
		case "USER_RELATIONS_TO_ARTICLE":
			return (() => {
				const {
					article_id,
					...relations
				} = value;
				return {
					...state,
					[article_id]: relations
				};
			})();
		case "FAVORITE_ARTICLE":
			return (() => {
				const {
					article_id,
					favorite
				} = value;
				return {
					...state,
					[article_id]: {
						...state[article_id],
						favorite
					}
				};
			})();
		case "SIX_ARTICLE":
			return (() => {
				const {
					article_id,
					thumb
				} = value;
				return {
					...state,
					[article_id]: {
						...state[article_id],
						thumb
					}
				};
			})();
		default:
			return state;
	}
};