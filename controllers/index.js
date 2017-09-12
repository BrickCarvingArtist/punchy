import {sequelize} from "../services";
import {SERVER} from "../configs";
import {error} from "../utils";
import {crossDomain, verifyToken, page} from "./middlewares";
import article from "./article";
import lottery from "./lottery";
import me from "./me";
export default async app => {
	try{
		await sequelize.authenticate();
		console.log("Succeed to connect mysql!");
	}catch(e){
		console.log(`Failed to connect mysql!\n${e}`);
		process.exit();
	}
	app
		.use(crossDomain("http://localhost:5501"))
		.use(verifyToken())
		.use(article())
		.use(lottery())
		.use(me())
		.use(page())
		.listen(SERVER.port)
		.on("error", e => {
			console.log(e);
			error({
				code: 5009999999,
				e
			});
		});
	console.log(`Server started on port ${SERVER.port}.`);
};