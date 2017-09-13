import {View} from "./";
const collectArticleView = ({user_id, article_id, ip}) => {
	try{
		View.create({
			article_id,
			user_id,
			ip
		});
	}catch(e){
		throw {
			code: 5009700001
		};
	}
}
export default action => ({
	collectArticleView
}[action]) || function(){};