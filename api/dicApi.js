
import Api from './api';
import Tool from '@/common/Tool';

var baseURL = Api.baseURL+"/dic";

var findProgramstaus = function(){
	let url =baseURL+"/programstaus";
	return Api.requestGET({url});
}
exports.findProgramstaus = findProgramstaus;


