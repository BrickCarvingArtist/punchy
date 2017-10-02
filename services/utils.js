import {isUndefined} from "lodash";
export const formatSQLAddress = ({dialect, user, password, host, port, dbname}) => [
	dbname,
	user,
	password,
	{
		host,
		port,
		dialect,
		define: {
			charset: "utf8",
			collate: "utf8_general_ci"
		}
	}
];
export const filter = (option, data = {}) => {
	for(let i in option){
		if(isUndefined(option[i])){
			delete option[i];
		}
	}
	return {
		...data,
		...option
	};
};