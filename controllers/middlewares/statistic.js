import collect from "../../services/statistics";
import {error} from "../../utils";
export default (action, cb) => async (ctx, next) => {
	if(!~ctx.request.header["user-agent"].indexOf("node-fetch")){
		try{
			collect(action)(cb(ctx));
		}catch(e){
			error({
				code: e.code || 5009700000,
				comment: action,
				ctx,
				e
			});
		}
	}
	await next();
};