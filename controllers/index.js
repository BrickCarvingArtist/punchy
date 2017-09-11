import Sequelize from "sequelize";
import {resolve} from "path";
import {SERVER, DB} from "../configs";
import {formatSQLAddress, error} from "../utils";
import {verifyToken, page} from "./middlewares";
import article from "./article";
import lottery from "./lottery";
import me from "./me";
import {crossDomain} from "./middlewares";
export const sequelize = new Sequelize(...formatSQLAddress(DB));
const imports = modelPath => sequelize.import(resolve(__dirname, modelPath));
export const Article = imports("../models/article");
export const View = imports("../models/view");
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