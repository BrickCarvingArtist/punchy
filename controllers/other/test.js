import {success} from "../../utils";
export default () => ctx => {
	ctx.body = success();
};