export default (state = {
	articles: []
}, {type, value}) => ({
	ARTICLES: {
		...state,
		articles: value
	}
}[type]) || state;