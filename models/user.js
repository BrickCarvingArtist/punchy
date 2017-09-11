export default (sequelize, {INTEGER, STRING}) => sequelize.define("users", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: STRING(12),
		allowNull: true
	},
	tel: {
		type: STRING(11),
		unique: {
			msg: "此手机号已被注册。"
		},
		allowNull: false,
		validate: {
			len: 11
		}
	},
	password: {
		type: STRING(60),
		allowNull: false
	}
}, {
	underscored: true
});