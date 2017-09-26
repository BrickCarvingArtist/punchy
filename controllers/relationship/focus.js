import {success, error} from "../../utils";
import {focus} from "../../services/relationship";
export default () => async ctx => {
	try{
		ctx.body = success(await focus({
			user_id: ctx.state.tel,
			author: ctx.request.body.author
		}));
	}catch(e){
		ctx.body = error({
			code: 5000300100,
			ctx,
			e
		});
	}
};