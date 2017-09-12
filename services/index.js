import {resolve} from "path";
import Sequelize from "sequelize";
import {DB} from "../configs";
import {formatSQLAddress} from "./utils";
export const sequelize = new Sequelize(...formatSQLAddress(DB));
const imports = modelPath => sequelize.import(resolve(__dirname, modelPath));
export const Article = imports("../models/article");
export const View = imports("../models/view");