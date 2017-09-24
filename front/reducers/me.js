export default (state = {}, {type, value}) => ({
	USER: {
		...state,
		...value
	},
	NOT_AUTHORIZED: {},
	USER_AVATOR: {
		...state,
		avator: value
	},
	USER_NAME: {
		...state,
		name: value
	}
}[type]) || state;