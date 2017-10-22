import collect from "../../services/statistics";
import {error} from "../../utils";
/**
 * the statistic middleware
 * @param {String} action the collecting strategy
 * @param {Function} then the data formatter function, which should returns an object with key value pairs
 * @returns {undefined}
 */
export default (action, then) => (ctx, next) => {
	if(!~ctx.request.header["user-agent"].indexOf("node-fetch")){
		try{
			collect(action)(then(ctx));
		}catch(e){
			error({
				code: e.code || 5009700000,
				comment: action,
				ctx,
				e
			});
		}
	}
	return next();
};