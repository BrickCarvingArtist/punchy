import {sucess, error} from "../../utils";
export default () => async ctx => {
	ctx.cookies.set("sso_token", null);
	try{
		ctx.redirect("/");
	}catch(e){
		ctx.body = error({
			code: 5000200300,
			ctx,
			e
		});
	}
};