import fetch from "isomorphic-fetch";
import {AUTH_SERVER} from "../../configs";
import {error} from "../../utils";
export default () => async ctx => {
	try{
		return ctx.body = await (await fetch(`${AUTH_SERVER}/api/profile`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${ctx.cookies.get("sso_token")}`
			},
			body: `user=${ctx.request.body.name}`
		})).json();
	}catch(e){
		ctx.body = error({
			code: 5000200200,
			ctx,
			e
		});
	}
};