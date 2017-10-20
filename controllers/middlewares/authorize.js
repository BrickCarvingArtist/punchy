import {error} from "../../utils";
/**
 * authorization middleware
 * @module Middlewares/authorize
 * @param {Object} ctx Koa context
 * @param {Function} next the next function
 * @returns {undefined}
 */
export default () => async (ctx, next) => {
	if(ctx.state.tel){
		return next();
	}
	return ctx.body = error({
		code: 5000000203,
		ctx
	});
};