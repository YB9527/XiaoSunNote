
/**
 * 根据key 获取 strongdata
 * @param {Object} key
 */
export var getStorageData = function (key) {
	try {
	    const value = uni.getStorageSync(key);
	    return value;
	} catch (e) {
	    console.log(e);
	}
};


/**
 * 设置 strong
 * @param {Object} key
 * @param {Object} data
 */
export var setStorageData = function(key,data){
	try {
	    uni.setStorageSync(key, data);
	} catch (e) {
	    console.log("e",e);
	}

}


/**
 * 弹出确定按钮
 * @param {Object} content
 */
export var showModalTip = function(content,data={type:"none"}){
	data.showCancel = false;
	return showMoal(content,data);
}

export var showMoal = function(content,data={}){
	return new Promise((resole,reject)=>{
		uni.showModal({
			title:data.title?data.title:"提示",
			content:content,
			showCancel:data.showCancel,
			confirmColor:data.confirmColor,
			 success: function (res) {
			        if (res.confirm) {
			            resole(true);
			        } else if (res.cancel) {
			            resole(false);
			        }
			    }
		});
	})
}


export var showToast = function(title,data={icon:"none"}){
	 uni.showToast({
	 	title,
		icon:data.icon,
		mask:true,
	 })
 }
 
var isShowLoading = false;


/**
 * 显示loading
 */
export var showLoading = function(title="请稍等...",showcover=true){
	
	
	if(showcover || !isShowLoading){
		uni.showLoading({
			title,
		})
		isShowLoading = true;
	}
	
}
/**
 * 隐藏loading
 */
export var hideLoading = function(){
	uni.hideLoading();
	isShowLoading = false;
}



/**
 * 预览对象里面的图片
 */
export var previewImageInDataArray = function(index,dataArray,key="url"){
	if(dataArray){
		let urls = [];
		dataArray.forEach(data=>{
			
			urls.push(data[key]);
		});
		previewImage(urls[0],urls);
	}
}


/**
 * 预览图片
 * @param {Object} url
 * @param {Object} urlArray
 */
export var previewImage = function(url,urlArray){
	if(!urlArray){
		urlArray = [url];
	}
	uni.previewImage({current:url,urls:urlArray});
}


/**
 * 选择文件上传
 */
export var chooseFile = function(data = {extension:['.zip','.rar'],count:1}){
	return new Promise((resole,reject)=>{
		// #ifdef H5
		uni.chooseFile({
		  count: data.count, //默认100
		  extension:data.extension,
			success: function (res) {
				let tempFiles = res.tempFiles;
				resole(tempFiles);
			},
			fail(e) {
				reject(e);
			},
			
		});
		// #endif
	})
}


export var downloadFile = function(url){
	
	uni.openDocument({
		filePath:url
	})
	return;
	return new Promise((resolve,reject)=>{
		uni.downloadFile({
			url: url, //仅为示例，并非真实的资源
			success: (res) => {
				if (res.statusCode === 200) {
					//console.log('下载成功');
					window.open(res.tempFilePath);
					
					//console.log(res.tempFilePath);
					resolve(true);
				}else{
					reject(res);
				}
			},
			fail:(e)=> {
				console.log(e);
				showModalTip("资源链接失败");
				reject(e);
			}
		});
	});
	
}

export var removeStorage = function(key){ 
	uni.removeStorage({
	    key: key,
	    success: function (res) {
	       // console.log('success');
	    }
	});
}


