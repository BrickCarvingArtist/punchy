import {success, error} from "../../utils";
export const category = [
	{
		sup: "UI",
		sub: ["PhotoShop", "Sketch"]
	},
	{
		sup: "HTML",
		sub: ["HTML", "HTML5"]
	},
	{
		sup: "CSS",
		sub: ["CSS", "预编译"]
	},
	{
		sup: "JavaScript",
		sub: ["JavaScript", "前端", "后端"]
	},
	{
		sup: "浏览器",
		sub: ["Chrome", "IE"]
	},
	{
		sup: "建站",
		sub: ["第三方", "测试", "运维", "SEO"]
	},
	{
		sup: "协作",
		sub: ["理论", "工具"]
	},
	{
		sup: "其它",
		sub: ["运动", "猫", "其他"]
	}
];
export default () => ctx => {
	try{
		ctx.body = success(category);
	}catch(e){
		ctx.body = error({
			code: 5000100000,
			ctx,
			e
		});
	}
};