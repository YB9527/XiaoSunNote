<template>
	<uni-file-picker 
		:disabled="tem.h5disabled" 
		:url="uploadAttr.url"
		:auto-upload="false" 
		v-model="uploadAttr.filelist" 
		file-mediatype="image" mode="grid"
		file-extname="jpeg,png,jpg" 
		:limit="uploadAttr.limit?uploadAttr.limit:undefined" 
		@delete="deleteUniFile"
		@select="select" 
		:readonly="uploadAttr.disabled">
			<!-- #ifdef  MP-WEIXIN -->
			<view class="uploadbtn" @click="wxupload">选择图片</view>
			<!-- #endif -->
	</uni-file-picker>
</template>

<script>
	
	export default {
	
		props: {
			uploadAttr: {
				url:{
					type:String,
					default:"http://baidu.com",
				},
				disabled: false,
				limit:{
					type:Number,
					default:1,
				},
				filelist: [],
				deleteimageValue:[],
				addimageValue:[],
			},
		},
		data() {
			return {
				tem:{
					/* #ifdef  MP-WEIXIN */
					h5disabled: true,
					/* #endif */
					
				}
				
			}
		},
		created() {
			let uploadAttr = this.uploadAttr;
			if(!uploadAttr.deleteimageValue){
				uploadAttr.deleteimageValue = [];
			}
			if(!uploadAttr.addimageValue){
				uploadAttr.addimageValue = [];
			}
			if(uploadAttr.filelist){
				for(let file of uploadAttr.filelist){
					if(file.url){
						file.path = file.url;
					}
					
				}
			}
		},
		methods: {
			wxupload() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						// 获取的格式是数组，多选会同时返回，单选只返回一项
						const tempFilePaths = chooseImageRes.tempFilePaths;
						for (let tempFile of tempFilePaths) {
							this.uploadAttr.filelist.push({
								path: tempFile
							});
						}
					}
				});
			},
			deleteUniFile({tempFile,tempFilePath}){
				let uploadAttr = this.uploadAttr;
				for (var i = 0; i < uploadAttr.filelist.length; i++) {
					
					if (uploadAttr.filelist[i].id === tempFile.id) {
						uploadAttr.filelist.splice(i, 1);
						i--;
						if(!tempFile.uuid){
							uploadAttr.deleteimageValue.push(tempFile);
						}
						break;
					}
				}
				for (var j = 0; j < uploadAttr.addimageValue.length; j++) {
					if (uploadAttr.addimageValue[j].path === tempFile.path) {	
						uploadAttr.addimageValue.splice(j,1);
						break;
					}
				}
				this.$emit("change")
			},
			// 获取上传状态
			select(e) {
				//console.log(e);
				this.uploadAttr.addimageValue.push(...e.tempFiles);
				this.uploadAttr.filelist = [...this.uploadAttr.filelist, ...e.tempFiles];
				this.$emit("change")
			},
		}
	}
</script>

<style>
</style>
