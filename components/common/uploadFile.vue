<template>
	<uni-file-picker 
		:disabled="tem.h5disabled" 
		:url="uploadAttr.url"
		:auto-upload="false" 
		v-model="uploadAttr.imageValue" 
		file-mediatype="image" mode="grid"
		file-extname="jpeg,png,jpg" 
		:limit="uploadAttr.limit" 
		@delete="deleteUniFile"
		@select="select" 
		:readonly="uploadAttr.readonly">
			<!-- #ifdef  MP-WEIXIN -->
			<view class="uploadbtn" @click="wxupload">选择图片</view>
			<!-- #endif -->
	</uni-file-picker>
</template>

<script>
	import zjdsqRequest from '@/pages/works/zjdsq/js/zjdsqRequest.js'
	import config from 'static/js/config.js';

	export default {
		props: {
			uploadAttr: {
				url:{
					type:String,
					default:"http://baidu.com",
				},
				readonly: false,
				limit:{
					type:Number,
					default:1,
				},
				imageValue: [],
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
		},
		methods: {
			wxupload() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						// 获取的格式是数组，多选会同时返回，单选只返回一项
						const tempFilePaths = chooseImageRes.tempFilePaths;
						for (let tempFile of tempFilePaths) {
							this.uploadAttr.imageValue.push({
								path: tempFile
							});
						}
					}
				});
			},
			deleteUniFile({tempFile,tempFilePath}){
				let uploadAttr = this.uploadAttr;
				for (var i = 0; i < uploadAttr.imageValue.length; i++) {
					if (uploadAttr.imageValue[i].path === tempFile.path) {
						uploadAttr.imageValue.splice(i, 1);
						if(!tempFile.uuid){
							uploadAttr.deleteimageValue.push(tempFile);
						}
						for (var j = 0; j < uploadAttr.addimageValue.length; j++) {
							if (uploadAttr.addimageValue[j].path === tempFile.path) {	
								uploadAttr.addimageValue.splice(j,1);
							}
						}
						break;
					}
				}
			},
			// 获取上传状态
			select(e) {
				this.uploadAttr.addimageValue.push(...e.tempFiles);
				this.uploadAttr.imageValue = [...this.uploadAttr.imageValue, ...e.tempFiles];
			},
		}
	}
</script>

<style>
</style>
