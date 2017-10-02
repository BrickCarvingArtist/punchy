import fetch from "isomorphic-fetch";
import {sucess, error} from "../../utils";
import {SERVER, AUTH_SERVER} from "../../configs";
export default () => async ctx => {
	const ssoToken = ctx.cookies.get("sso_token"),
		{
			protocol,
			name
		} = SERVER,
		referer = `${protocol}${name}`;
	if(ssoToken){
		ctx.cookies.set("sso_token", "", {
			maxAge: 0
		});
		return ctx.redirect(`${AUTH_SERVER}/api/out?referer=${referer}`);
	}
	ctx.redirect(referer);
};