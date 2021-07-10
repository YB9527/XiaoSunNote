
import Api from './api';
import Tool from '@/common/Tool';

var baseURL = Api.baseURL+"/project";


var findByUserid = function(userid){
	let url =baseURL+"/findbyuserid?userid="+userid;
	return Api.requestGET({url});
}
exports.findByUserid = findByUserid;

var findById = function(projectid){
	let url =baseURL+"/findbyid?id="+projectid;
	return Api.requestGETOneData({url});
}
exports.findById = findById;




var update =async function(project,filePath){
	if(filePath){
		
		let imgfile =await Api.uploadFile({filePath:filePath, dir:"xiaosunnote/"+uni.loginUser.id+"/project"});
		project.imageurl = imgfile.path.replace(/\\/g,"/");
	}
	
	let url =baseURL+"/update";
	return Api.requestPOST({url,data:project});
}
exports.update = update;

var save =async function(project,filePath){
	if(filePath){
		let imgfile =await Api.uploadFile({filePath:filePath,dir:"xiaosunnote/"+uni.loginUser.id+"/project"});
		project.imageurl = imgfile.path.replace(/\\/g,"/");
	}
	let url =baseURL+"/add";
	return Api.requestPOST({url,data:project});
}
exports.save = save;
