
/**
 *@des 登录注册相关接口
 *@author hjp1011 21931118@qq.com
 *@blog http://www.wephp.com
 *@date 2019/11/15 15:14:47
 *@param login.js
 */

import Api from './api';
import Tool from '@/common/Tool';

var baseURL = Api.baseURL+"/user";
var token ="";

var strongeUserKey = "loginUser";

var getStorageUser = function(){
	return new Promise((resole,reject)=>{
		uni.getStorage({
			key: strongeUserKey,
			success(storage){
				let user = storage.data;
				if(user){
					resole(user);
				}else{
					reject();
				}
			},
			fail(e) {
				reject(e);
			}
		});
	});
}
exports.getStorageUser = getStorageUser;

var storageLogin = function(){
	return getStorageUser().then(user=>{
		return login(user);
	});
}
exports.storageLogin = storageLogin;


var login = function(user){
	let url =baseURL+"/login";
	uni.setStorage({
	    key: 'loginUser',
	    data: user
	});
	return Api.requestGETOneData({url,data:user}).then(user=>{
		uni.vue.$store.commit("setLoginUser",user);
		return user;
	});
}
exports.login = login;

var regist = function(user){
	let url =baseURL+"/add";
	return Api.requestPOST({url,data:user}) ;
}
exports.regist = regist;

var loginOut = function(user){
	user.password="";
	uni.setStorage({
	    key: strongeUserKey,
	    data: user
	});
	return true;
	
}
exports.loginOut = loginOut;

