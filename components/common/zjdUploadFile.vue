<template>
	<uploadFile v-if="show" :uploadAttr="uploadAttr" ></uploadFile>
</template>

<script>
	import uploadFile from './uploadFile.vue'
	import config from 'static/js/config.js';
	export default{
		components:{uploadFile},
		props:['uploadAttr'],
		data(){
			return{
				show:false,
				FJ_TABLE_NAME:"D_fj",
				
			}
		},
		created() {
			this.init();
			
		},
		methods:{
			//查询出附件
			init(){
				let fjArray = this.findFJArray();
			},
			//查找附件对象
			async findFJArray(){
				let ywh = this.uploadAttr.info.ywh;
				let wdmc = this.uploadAttr.info.wdmc;
				let fjArray =await this.$Api.selectArrayData(this.FJ_TABLE_NAME,{ywh,wdmc});
				console.log(fjArray);
				if (fjArray && fjArray.length > 0) {
					for (let fj of fjArray) {
						if (fj) {
							let promiseImgURL = (config.athroot_url + fj.wdfj).replace(/\\/g,"/");
							this.uploadAttr.imageValue.push({
								id:fj.id,
								path: promiseImgURL
							});
						}
					}
				}
				this.show = true;
			},
			async saveAndDelete(){
				this.saveFJ();
				this.deleteFJ();
			},
			async saveFJ(){
				let id = Date.now()/1000;
				for(let imageValue of this.uploadAttr.addimageValue){
					let ywh = this.uploadAttr.info.ywh;
					let wdmc = this.uploadAttr.info.wdmc;
					let qydm = this.uploadAttr.info.qydm;
					
					let path = await this.$Api.saveFileBase(wdmc,imageValue);
					//let promiseImgURL = (config.athroot_url +path).replace(/\\/g,"/");
					//console.log("promiseImgURL",promiseImgURL);
					let fj = {
						id:parseInt(id++),
						ysdm:'224900',
						wdlx:'01',
						wdfj:path,
						ywh,
						wdmc,
						qydm,
					}
					//console.log("fj",fj);
					await this.$Api.saveData(this.FJ_TABLE_NAME,fj);
				}
			},
			async deleteFJ(){
				await this.$Api.deleteData(this.FJ_TABLE_NAME,this.uploadAttr.deleteimageValue); 
			},
		}
	}
</script>

<style lang="scss">
</style>
