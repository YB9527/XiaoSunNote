
import api from './api.js';
var baseURL = api.ip+"/sys";

/**
 * 获取系统时间
 */
var getSystemDateTime = function(){
	let url =baseURL+"/getdatetime";
	return api.requestGET({url});
	
}
exports.getSystemDateTime = getSystemDateTime;

