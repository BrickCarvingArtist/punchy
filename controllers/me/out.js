import fetch from "isomorphic-fetch";
import {sucess, error} from "../../utils";
import {SERVER, AUTH_SERVER} from "../../configs";
export default () => async ctx => {
	const {
		protocol,
		name
	} = SERVER;
	ctx.cookies.set("sso_token", "", {
		maxAge: 0
	});
	ctx.redirect(`${AUTH_SERVER}/api/out?referer=${protocol}${name}`);
};