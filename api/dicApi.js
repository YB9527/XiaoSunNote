
import Api from './api';
import * as Tool from '@/common/js/Tool.js'

var baseURL = Api.baseURL+"/dic";

var findProgramstaus = function(){
	let url =baseURL+"/programstaus";
	return Api.requestGET({url});
}
exports.findProgramstaus = findProgramstaus;


