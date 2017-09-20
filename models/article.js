export default (sequelize, {INTEGER, STRING, TEXT}) => sequelize.define("article", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: STRING(40),
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	author: {
		type: STRING(12),
		allowNull: false
	},
	description: {
		type: STRING(100),
		allowNull: true
	},
	content: {
		type: TEXT,
		allowNull: false
	},
	sup_label: {
		type: INTEGER,
		allowNull: false
	},
	sub_label: {
		type: INTEGER,
		allowNull: false
	}
}, {
	underscored: true,
	paranoid: true,
	hooks: {
		beforeCreate(article){
			article.description = article.content.substring(0, 100);
		},
		beforeUpdate(article){
			article.description = article.content.substring(0, 100);
		}
	}
});