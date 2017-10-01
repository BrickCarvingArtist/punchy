import oss from "ali-oss";
import co from "co";
import fetch from "isomorphic-fetch";
import {randomBytes} from "crypto";
import {stringify} from "querystring";
import {OSS, AUTH_SERVER} from "../../configs";
import {error} from "../../utils";
const store = oss(OSS);
export default () => async ctx => {
	try{
		const {
			fieldname,
			mimetype,
			buffer
		} = ctx.req.file;
		const {url} = await co(store.put(`avatars/${fieldname}_${randomBytes(8).toString("hex")}`, buffer));
		try{
			ctx.body = await (await fetch(`${AUTH_SERVER}/api/avatar`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Bearer ${ctx.cookies.get("sso_token")}`
				},
				body: stringify({
					avatar: url.replace("http", "https")
				})
			})).json();
		}catch(e){
			ctx.body = error({
				code: 5000200301,
				ctx,
				e
			});
		}
	}catch(e){
		ctx.body = error({
			code: 5000200300,
			ctx,
			e
		});
	}
};