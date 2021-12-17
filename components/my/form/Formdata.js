import * as Tool from "@/common/js/Tool.js"
class FormData {
	static SELECT = "SELECT";
	static CREATE = "CREATE";
	static UPDATE = "UPDATE";
	static DELETE = "DELETE";

	constructor(title,dataApi,pageurl) {
		this.title = title;
		this.dataApi = dataApi;
		if(pageurl){
			this.pageurl_select = pageurl.pageurl_select
			this.pageurl_update = pageurl.pageurl_update
			this.pageurl_create = pageurl.pageurl_create
			this.pageurl_delete = pageurl.pageurl_delete
		}
	}
	/**检查数据
	 * @param {Object} moduleArray
	 */
	check(data,moduleArray){
		let flag = true;
		for (let module of moduleArray) {
			if(module.show === false){
				continue;
			}
			for(let item of module.array){
				if(item.show === false){
					continue;
				}
				let error = this.moduleItemCheck(data,item);
				if(error){
					flag = false;
				}
			}
		}
		if(!flag){
			return false;
		}else{
			return true;
		}
	}
	/**检查
	 * @param {Object} data
	 * @param {Object} moduleitem
	 */
	moduleItemCheck(data,moduleitem){
		let error="";
		if(moduleitem.check && moduleitem.prop){
			if(moduleitem.check instanceof Array){
				error  = moduleitem.check[0](this.data[moduleitem.prop],moduleitem.check[1]);
			}else{
				error  = moduleitem.check(this.data[moduleitem.prop]);
			}
		}
		moduleitem.error = error;
		return error;
	}
	baselayout() {

	}
	arrayToOptionMap(typeArray){
		let map = {};
		for(let type of typeArray){
			map[type.key] = type.value;
		}
		return map;
	}
	mapToOptionMap(dicmap){
		let map = {};
		for(let key in dicmap){
			map[key] = dicmap[key].value;
		}
		return map;
	}
	
	async findDataById(id) {
  	if(id){
  		return this.dataApi.findDataById(id);
  	}
  }

	async getSelectLayout(id) {
		this.state = FormData.SELECT;
		let formconfig = this.baseModuleArray();
		formconfig.title = this.title + "-查看";
		let data =await this.findDataById(id);
		formconfig.data = data;
		this.data = formconfig.data;
		this.moduleArray = formconfig.moduleArray;
		return formconfig;
	}
	async getUpdateLayout(id) {
		this.state = FormData.UPDATE;
		let formconfig = this.baseModuleArray();
		formconfig.title = this.title + "-修改";
		let data =await this.findDataById(id);
		formconfig.data = data;
		this.data = formconfig.data;
		this.moduleArray = formconfig.moduleArray;
		return formconfig;
	}
	async getCreateLayout(id) {
		this.state = FormData.CREATE;
		let formconfig = this.baseModuleArray();

		formconfig.title = this.title + "-添加"
		formconfig.data = {};
		this.data = formconfig.data;
		this.moduleArray = formconfig.moduleArray;
		return formconfig;
	}
	async getDeleteLayout(id) {
		this.state = FormData.DELETE;
		let formconfig = this.baseModuleArray();
		formconfig.title = this.title + "-删除确认";
		let data =await this.findDataById(id);
		formconfig.data = data;
		this.data = formconfig.data;
		this.moduleArray = formconfig.moduleArray;
		return formconfig;
	}
	
	/**
	 * 跳转到查看页面
	 */
	async goToSelect(id,type="navigateTo"){
		let layout =await this.getSelectLayout(id);
		uni.vue.$mRouter[type](this.pageurl_select,layout);
	}

	
	//当前数据要执行操作，保存，修改，删除...
	 ok(callback) {
		let data = this.data;
		let moduleArray = this.moduleArray;
		let promise;
		let checkflag;
		switch (this.state) {
			case FormData.SELECT:
				break;
			case FormData.UPDATE:
				checkflag = this.check(data,moduleArray);
				if(checkflag) promise = this.updateData(data);
				break;
			case FormData.CREATE:
				checkflag = this.check(data,moduleArray);
				if(checkflag) promise =  this.saveData(data);
				break;
			case FormData.DELETE:
				promise = this.deleteData(data);
				break;
		}
    let datakey = [this.datakey];
    let self = this;
		if(promise){
			promise
			  .then(async result=>{
				if(result instanceof Object && result.success === false){
				  //返回不成功
				  //Message.error(result.msg);
				  callback(false);
				}else{
				  data =await this.findDataById(data[datakey]);
				  callback(this.state,data);
				}
					})
				}
		if(checkflag){
			callback(false);
		}
	}
	/**修改对象
	 * @param {Object} data
	 */
	updateData(data){
    return this.dataApi.updateData(data);
		//console.log("编辑",data);
	}
	/**保存对象
	 * @param {Object} data
	 */
	saveData(data){

    return this.dataApi.saveData(data)
		//console.log("保存",data);
	}
	/**删除对象
	 * @param {Object} data
	 */
	deleteData(data){
    return this.dataApi.deleteData(data);
		//console.log("删除",data);
	}
	
	
}
export default FormData = FormData;
