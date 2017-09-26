export default (sequelize, {INTEGER, STRING}) => sequelize.define("focus", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: STRING(11),
		allowNull: false
	},
	author: {
		type: STRING(11),
		allowNull: false
	}
}, {
	tableName: "focuses",
	underscored: true,
	paranoid: true
});