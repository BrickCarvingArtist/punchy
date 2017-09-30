import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
import {AUTH_SERVER} from "../../configs";
import {success, error} from "../../utils";
import {getFocuses} from "../../services/relationship";
export default () => async ctx => {
	try{
		const {
			index = 0,
			size = 10,
			user_id
		} = ctx.query;
		const focused_id = await getFocuses({
			index,
			size,
			user_id
		});
		if(!focused_id.length){
			return ctx.body = success([]);
		}
		try{
			const {
				code,
				data,
				message
			} = await (await fetch(`${AUTH_SERVER}/api/profiles?${stringify({
				user_id: focused_id
			})}`)).json();
			if(code){
				throw {
					code
				};
			}
			ctx.body = success(data);
		}catch(e){
			ctx.body = error({
				code: e.code || 5000300001,
				ctx,
				e
			});
		}
	}catch(e){
		ctx.body = error({
			code: 5000300000,
			ctx,
			e
		});
	}
};