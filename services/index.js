import {resolve} from "path";
import Sequelize from "sequelize";
import {DB} from "../configs";
import {formatSQLAddress} from "./utils";
export const sequelize = new Sequelize(...formatSQLAddress(DB));
const imports = modelPath => sequelize.import(resolve(__dirname, modelPath));
export const Article = imports("../models/article");
export const View = imports("../models/view");
export const User = imports("../models/user");
export const UserInfo = imports("../models/user_info");
export const Favorite = imports("../models/favorite");
export const Thumb = imports("../models/thumb");
export const Focus = imports("../models/focus");
// Article.sync();
// View.sync();
// Favorite.sync();
// Thumb.sync();
// Focus.sync();