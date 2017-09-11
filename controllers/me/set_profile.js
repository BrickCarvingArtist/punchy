import fetch from "isomorphic-fetch";
export default () => async ctx => {
	const {name} = ctx.request.body;
	try{
		return ctx.body = await (await fetch("https://auth.ikindness.cn/api/profile", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${ctx.cookies.get("sso_token")}`
			},
			body: `user=${name}`
		})).json();
	}catch(e){
		console.log(e);
	}
};