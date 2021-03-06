import {isUndefined} from "lodash";
import {category} from "./category";
export const validate_labels = (sup_label, sub_label) => {
	if(!isUndefined(sup_label)){
		const supLabel = category[sup_label];
		if(isUndefined(supLabel)){
			return 5000100001;
		}
		if(isUndefined(sub_label)){
			return 5000100002;
		}
		if(isUndefined(supLabel.sub[sub_label])){
			return 5000100003;
		}
	}
};