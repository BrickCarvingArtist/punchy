export default (sequelize, {INTEGER, STRING}) => sequelize.define("favorite", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	article_id: {
		type: INTEGER,
		allowNull: false
	},
	user_id: {
		type: STRING(11),
		allowNull: false
	}
}, {
	underscored: true,
	paranoid: true
});