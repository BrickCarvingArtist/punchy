import {resolve} from "path";
import {readFile, error} from "../../utils";
export default () => async ctx => {
	try{
		ctx.body = await readFile(resolve(__dirname, "../../views/lottery_tab.html"), "utf-8");
	}catch(e){
		ctx.body = error({
			code: 5001000100,
			ctx,
			e
		});
	}
};