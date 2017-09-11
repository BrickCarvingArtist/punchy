import {success, error} from "../../utils";
const prize = [
	{
		name: "1元",
		id: 0
	},
	{
		name: "2元",
		id: 1
	},
	{
		name: "5元",
		id: 2
	},
	{
		name: "10元",
		id: 3
	}
];
export default () => ctx => {
	try{
		ctx.body = success(prize);
	}catch(e){
		ctx.body = error({
			code: 5001000101,
			ctx,
			e
		});
	}
};