import {error} from "../../utils";
export default () => async (ctx, next) => {
	// type 请求类型
	// true 接口
	// false 页面
	if(ctx.state.tel){
		return await next();
	}
	return ctx.body = error({
		code: 5000000203,
		ctx
	});
};