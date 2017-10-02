export default (state = {}, {type, value}) => {
	switch(type){
	case "DRAFT_ALL":
		const {
			id,
			...rest
		} = value;
		return {
			...state,
			[id]: {
				...state[id],
				...rest
			}
		};
	case "CLEAR_DRAFT":
		return {
			...state,
			[value]: {}
		};
	default:
		return state;
	}
};