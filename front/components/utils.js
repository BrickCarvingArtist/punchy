export const attachStyles = styleRequirement => {
	try{
		styleRequirement();
	}catch(e){}
	return target => target;
};
export const delay = milliseconds => new Promise((resolve, reject) => {
	setTimeout(resolve, milliseconds);
});
export const Time = ((format = a => a < 10 ? `0${a}` : a, diff = ((PRECISION = ["second", "minute", "hour", "date", "month"]) => (s, precision, type = 0, result = "刚刚") => {
	type = ["前", "后"][type];
	const mins = s / 60000 | 0;
	if(!mins){
		return result;
	}
	result = `${mins % 60}分钟${type}`;
	const h = mins / 60 | 0;
	if(!h){
		return result;
	}
	result = `${h % 24}小时${type}`;
	const d = h / 24 | 0;
	if(!d){
		return result;
	}
	result = `${d % 30}天${type}`;
	const mons = d / 30 | 0;
	if(!mons){
		return result;
	}
	return `${mons % 30}月${type}`;
})()) => ({
	split(time){
		const date = new Date(time);
		let y = date.getFullYear(),
			mon = date.getMonth() + 1,
			d = date.getDate(),
			h = date.getHours(),
			min = date.getMinutes(),
			s = date.getSeconds();
		mon = format(mon);
		d = format(d);
		h = format(h);
		min = format(min);
		s = format(s);
		return [y, mon, d, h, min, s];
	},
	toDash(time){
		const [y, mon, d, h, min, s] = this.split(time);
		return `${y}-${mon}-${d} ${h}:${min}:${s}`;
	},
	toSlash(time){
		const [y, mon, d, h, min, s] = this.split(time);
		return `${y}/${mon}/${d} ${h}:${min}:${s}`;
	},
	toChinese(time){
		const [y, mon, d, h, min, s] = this.split(time);
		return `${y}年${mon}月${d}日 ${h}时${min}分${s}秒`;
	},
	diff(t1, t2, precision, type){
		t1 = new Date(t1);
		t2 = new Date(t2);
		const s = t1 - t2;
		if(s > 0){
			return diff(s, precision);
		}
		return diff(s, precision, type);
	}
}))();