export default (state = {}, {type, value}) => ({
	USER: {
		...state,
		...value
	},
	NOT_AUTHORIZED: {},
	USER_avatar: {
		...state,
		avatar: value
	},
	USER_NAME: {
		...state,
		name: value
	}
}[type]) || state;