import fetch from "isomorphic-fetch";
import {error} from "../../utils";
export default () => async ctx => {
	try{
		ctx.body = await (await fetch("https://auth.ikindness.cn/api/profile", {
			headers: {
				Authorization: `Bearer ${ctx.cookies.get("sso_token")}`
			}
		})).json();
	}catch(e){
		ctx.body = error({
			code: 5000200100,
			ctx,
			e
		});
	}
};