/**
 *@des 登录注册相关接口
 *@author hjp1011 21931118@qq.com
 *@blog http://www.wephp.com
 *@date 2019/11/15 15:14:47
 *@param login.js
 */

import Api from './api';
import Tool from '@/common/Tool';
var token ="";





var storageLogin = function(){
	return new Promise((resole,reject)=>{
		let user = {};
		uni.getStorage({
			key: 'loginUser',
			success(storage){
				let user = storage.data;
				if(login(user)){
					resole();
				}else{
					reject();
				}
			},
			fail(e) {
				reject(e);
			}
		});
	})
}
exports.storageLogin = storageLogin;


var login = function({account,password}){
	if(account == "yb" && password == "123"){
		uni.setStorage({
		    key: 'loginUser',
		    data: {account,password}
		});
		token = "123";
		return true;
	}
	return false;
	
}
exports.login = login;

var loginOut = function(user){
	user.password="";
	uni.setStorage({
	    key: 'loginUser',
	    data: user
	});
	return true;
	
}
exports.loginOut = loginOut;

