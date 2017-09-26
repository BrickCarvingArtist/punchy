import {sequelize, User, UserInfo, Focus} from "./";
import {filter} from "./utils";
User.hasMany(UserInfo, {
	foreignKey: "user_id",
	sourceKey: "tel",
	as: "info"
});
UserInfo.belongsTo(User, {
	foreignKey: "user_id",
	targetKey: "tel"
});
User.hasMany(Focus, {
	foreignKey: "user_id",
	sourceKey: "tel",
	as: "focus"
});
Focus.belongsTo(User, {
	foreignKey: "user_id",
	targetKey: "tel"
});
export const focus = async ({user_id, author}) => {
	const where = filter({
		user_id,
		author
	});
	try{
		const record = await Focus.findOne({
			where,
			raw: true,
			paranoid: false
		});
		if(record){
			if(record.deleted_at){
				await Focus.restore({
					where
				});
				return {
					user_id,
					focus: 1
				};
			}
			try{
				await Focus.destroy({
					where
				});
				return {
					user_id,
					focus: 0
				};
			}catch(e){
				throw {
					code: 5000300102
				};
			}
		}
		await Focus.create(where);
		return {
			user_id,
			focus: 1
		};
	}catch(e){
		throw {
			code: e.code || 5000300101
		};
	}
};
export const getFocuses = async user_id => (await Focus.findAll({
	where: filter({
		user_id
	}),
	attributes: ["author"],
	raw: true
})).map(({author}) => author);