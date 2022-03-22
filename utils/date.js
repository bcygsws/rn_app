// 时间格式化
export default Date.prototype.format = function (fmt) {
	//  this一个new Date()实例，因为是为构造函数Date绑定原型方法，那么this自然指得是Date的new 实例
	var o = {
		'M+': this.getMonth() + 1, //月份
		'd+': this.getDate(), //日
		'h+': this.getHours(), //小时
		'm+': this.getMinutes(), //分
		's+': this.getSeconds(), //秒
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + '').substring(4 - RegExp.$1.length)
		);
	// format('yyyy/MM/dd hh:mm:ss') format中的字符串中捕获分组，将传入的fmt:'yyyy/MM/dd hh:mm:ss'逐个替换成了数值时间
	// 每次遍历到此处时，都是唯一的那个捕获分组，子配项使用RegExp.$1拿到
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1
					? o[k]
					: ('00' + o[k]).substring(('' + o[k]).length)
			);
	return fmt;
};
