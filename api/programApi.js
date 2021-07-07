
import Api from './api';
import Tool from '@/common/Tool';

var baseURL = Api.baseURL+"/program";

var findByUserid = function(userid){
	let url =baseURL+"/findbyuserid?userid="+userid;
	return Api.requestGET({url});
}
exports.findByUserid = findByUserid;

var findById = function(id){
	let url =baseURL+"/findbyid?id="+id;
	return Api.requestGETOneData({url});
}
exports.findById = findById;

var update = function(programlog){
	let url =baseURL+"/update";
	return Api.requestPOST({url,data:programlog});
}
exports.update = update;

var save = function(programlog){
	let url =baseURL+"/save";
	return Api.requestPOST({url,data:programlog});
}
exports.save = save;
