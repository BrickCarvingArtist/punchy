import {resolve} from "path";
import {readFile, error} from "../../utils";
import {View} from "../";
export default () => async ctx => {
	const {id} = ctx.params,
		{tel} = ctx.state;
	try{
		await View.create({
			article_id: id,
			user_id: tel,
			ip: ctx.ip
		});
		ctx.body = await readFile(resolve(__dirname, "../../views/detail.html"), "utf-8");
	}catch(e){
		ctx.body =  error({
			code: 5000100300,
			ctx,
			e
		});
	}
};