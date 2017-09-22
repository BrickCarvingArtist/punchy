import fetch from "isomorphic-fetch";
import {error} from "../../utils";
import {AUTH_SERVER} from "../../configs";
export default () => async ctx => {
	try{
		ctx.body = await (await fetch(`${AUTH_SERVER}/api/profile/${ctx.params.id}`)).json();
	}catch(e){
		ctx.body = error({
			code: 5000200101,
			ctx,
			e
		});
	}
};