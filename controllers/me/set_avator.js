import fetch from "isomorphic-fetch";
export default () => async ctx => {
	let data;
	ctx.req.on("data", chunk => {
		data += chunk
	});
	ctx.req.on("end", () => {
		console.log(data);
	});
	// await fetch()
};