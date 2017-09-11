export default (sequelize, {INTEGER, STRING, TEXT}) => sequelize.define("article_views", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	article_id: {
		type: INTEGER
	},
	ip: {
		type: STRING,
		validate: {
			isIP: true
		}
	},
	user_id: {
		type: STRING(11)
	}
}, {
	timestamps: true,
	createdAt: "viewed_at",
	updatedAt: false,
	underscored: true
});