import {success, error} from "../../utils";
export default () => ctx => {
	try{
		ctx.body = success(parseInt(Math.random() * 4));
	}catch(e){
		ctx.body = error({
			code: 5001000102,
			ctx,
			e
		});
	}
};