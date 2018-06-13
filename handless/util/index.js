const fs = require('fs');

/**
 * 净字符转换成大写
 * @return  {String} 
 */
exports.upperCase  = function(str){
	const strUpperCase = str.replace(/\b\w+\b/g,function(word){
		return word.substring(0,1).toUpperCase() + word.substring(1);
	});
	return strUpperCase;
}

/**
 * 
 * @param {string} path 文件路径
 * @param {string} type 编码格式 默认为'UTF-8'
 */
exports.readJsonSync = (path,type = 'utf-8') => {
    let data = fs.readFileSync(path,type);

    return JSON.parse(data)
}