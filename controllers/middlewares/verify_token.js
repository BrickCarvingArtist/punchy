import {verify} from "jsonwebtoken";
import {TOKEN_SECRET} from "../../configs";
import {error} from "../../utils";
export default () => (ctx, next) => {
	const sso_token = ctx.query.sso_token || ctx.cookies.get("sso_token");
	if(!sso_token){
		return next();
	}
	try{
		const {
			tel,
			exp
		} = verify(sso_token, TOKEN_SECRET);
		ctx.cookies.set("sso_token", sso_token, {
			expires: new Date(exp * 1000)
		});
		ctx.state.tel = tel;
	}catch(e){
		error({
			code: 5000100000,
			ctx,
			e
		});
	}
	next();
};