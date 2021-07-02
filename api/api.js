//var ip  = "http://192.168.3.3:3333";
var ip  = "https://sunliying.shop:11443";
exports.ip = ip; 

var imgpriewurl  = ip+"/imgpriew/";
exports.imgpriewurl = imgpriewurl;

exports.baseURL  = ip+"/datawaiter/restaurant";

/**
 * 请求数据
 */
var requestPOST = function({url,data,header}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url, //仅为示例，并非真实接口地址。
			method: "POST",
			data,
			header: header ? header : {
				"Content-Type": "application/json;chartset=uft-8"
			},
			success: (res) => {
				if (res.data.success) {
					resolve(res.data.data);
				} else {
					reject(res);
				}
			},
			fail(e) {
				reject(e);
			}
		});
	});
}
exports.requestPOST =requestPOST;
/**
 * 请求数据
 */
var requestGET = function({url,data,header}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url, //仅为示例，并非真实接口地址。
			method: "GET",
			data,
			header: header,
			success: (res) => {
				if(res.data.isOk){
					resolve(res.data.data);
				}else{
					reject(res);
				}
				
			},
			fail(e) {
				reject(e);
			}
		});
	});
}
exports.requestGET =requestGET;



var requestGETOneData = function(req){
	return requestGET(req)
		.then(datas=>{
			if(datas && datas.length > 0){
				return datas[datas.length-1];
			}else{
				return undefined;
			}
		});
	
}
exports.requestGETOneData =requestGETOneData;

var uploadFile = function({filePath,dir,dirs}) {

	let url = ip + "/file/upload";
	console.log(url)
	return new Promise((resolve,reject)=>{
		uni.uploadFile({
			url: url, //仅为示例，非真实的接口地址
			filePath: filePath,
			name: 'file',
			formData:{
				dir:dir?dir:"",
				dirs:dirs?dirs:""
			},
			success: (uploadFileRes) => {
				let data = JSON.parse(uploadFileRes.data);
				if(data.isOk){
					resolve(data.data[0]);
				}else{
					reject(uploadFileRes);
				}
			},
			fail: (e) => {
				reject(e);
			}
		});
	}) 
}
exports.uploadFile =uploadFile;