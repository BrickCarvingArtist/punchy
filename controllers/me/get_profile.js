import fetch from "isomorphic-fetch";
import {success, error} from "../../utils";
import {AUTH_SERVER} from "../../configs";
import {countAuthorArticles} from "../../services/article"
export default () => async ctx => {
	try{
		const {data} = await (await fetch(`${AUTH_SERVER}/api/profile/${ctx.params.id}`)).json();
		try{
			ctx.body = success({
				...data,
				article_sum: await countAuthorArticles(data.tel)
			});
		}catch(e){
			ctx.body = error({
				code: 5000200102,
				ctx,
				e
			});
		}
	}catch(e){
		ctx.body = error({
			code: 5000200101,
			ctx,
			e
		});
	}
};