export default (state = {}, {type, value}) => ({
	USER: {
		...state,
		...value
	},
	NOT_AUTHORIZED: {
		...state,
		user: {
			tel: 0
		}
	},
	USER_AVATOR: {
		...state,
		avator: value
	},
	USER_NAME: {
		...state,
		name: value
	}
}[type]) || state;