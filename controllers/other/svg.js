import {resolve} from "path";
import {readFile, error} from "../../utils";
export default () => async ctx => {
	try{
		ctx.set("Content-Type", "image/svg+xml");
		ctx.body = await readFile(resolve(__dirname, "../../statics/test.svg"), "utf-8");
	}catch(e){
		ctx.body = error({
			code: 5009900000,
			ctx,
			e
		});
	}
};