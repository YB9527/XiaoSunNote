import MyFormData from "./Formdata.js"
import * as Tool from "@/common/js/Tool.js"

export default class UniFormData extends  MyFormData{
	constructor(title,dataApi,pageurl) {
		super(title,dataApi);
		if(pageurl){
			this.pageurl_select = pageurl.pageurl_select
			this.pageurl_update = pageurl.pageurl_update
			this.pageurl_create = pageurl.pageurl_create
			this.pageurl_delete = pageurl.pageurl_delete
		}
	}
	toOptions(options,key="key",value="value"){
		options = uni.vue.$Tool.copy(options);
		uni.vue.$Tool.replaceAttr(options,[value,"text",key,"value",],"children",false);
		return options;
	}
	/**
	 * 跳转到查看页面
	 */
	async goToSelect(id,type="navigateTo"){
		let layout =await this.getSelectLayout(id);
		this.goToPage(this.pageurl_select, "getSelectLayout",id,type);
	}
	/**
	 * 跳转到修改页面
	 */
	async goToUpdate(id,type){
		let layout =await this.getUpdateLayout(id);
		this.goToPage(this.pageurl_update,"getUpdateLayout",id,type);
	}
	/**
	 * 跳转到创建页面
	 */
	async goToCreate(id,type){
		let layout =await this.getCreateLayout(id);
		this.goToPage(this.pageurl_create,"getCreateLayout",id,type);
	}
	/**
	 * 跳转到删除页面
	 */
	async goToDelete(id,type){
		let layout =await this.getDeleteLayout(id);
		this.goToPage(this.pageurl_delete,"getUpdateLayout",id,type);
	}
	goToPage(url,layoutFunctionName,id,type="navigateTo"){
		
		uni.vue.$mRouter[type](url,{id,layoutFunctionName});
	}
}