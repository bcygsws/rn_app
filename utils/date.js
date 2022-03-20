import React from 'react';
// 时间格式化
export default React.Component.prototype.dateFormat = function (str) {
	let dt = new Date(parseInt(str));
	const year = dt.getFullYear().toString();
	const month = (dt.getMonth() + 1).toString().padStart(2, '0');
	const day = dt.getDate().toString().padStart(2, '0');
	const hours = dt.getHours().toString().padStart(2, '0');
	const minutes = dt.getMinutes().toString().padStart(2, '0');
	const seconds = dt.getSeconds().toString().padStart(2, '0');
	return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};
