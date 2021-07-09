<template>
	<view v-if="show" class="projectDeails">
		<view class="row item">
			<view class="label">
				<text>项目：</text>
			</view>
			<view class="value">
				<input v-model="project.projectname"  class="inputborder" type="text" placeholder="请输入内容" />
			</view>
		</view>
		<view class="imgitem">
			<text>项目图片</text>
			<view class="imgcontent">
				<uni-file-picker  ref="upload"
					@delete="deleteUniFile"
					@select="select" 
					:url="uploadAttr.url" 
					:auto-upload="false"
					 v-model="uploadAttr.imageValue" 
					 file-mediatype="image" mode="grid"
					file-extname="jpeg,png,jpg,JPEG" :limit="1" :readonly="uploadAttr.readonly" />
			</view>
		</view>
		<view class="onebtnview">
			<button v-if="projectid" type="primary" @click="update()">修改</button>
			<button v-else type="primary" @click="save()">新增</button>
			
		</view>
	</view>
</template>

<script>
	import projectApi from '@/api/projectApi.js'


	export default{
		
		data(){
			return{
				show:false,
				projectid:"",
				project:"",
				uploadAttr: {
					readonly: false,
					url: "http://baidu.com",
					imageValue: [],
				},
			}
		},
		onLoad(option) {
			this.projectid = option.projectid;
			this.init();
		},
		methods:{
			async init(){
				let id = this.projectid;
				this.setTitle();
				this.show = false;
				if(id){
					this.project = await projectApi.findById(id);
					if(this.project.imageurl){
						let url =  this.$Api.imgpriewurl+this.project.imageurl;
						this.uploadAttr.imageValue.push({path:url});
					}
				}else{
					this.project = {};
				}
				this.show = true;
			},
			setTitle(){
				let title ="";
				if(this.projectid){
					title="编辑项目";
				}else{
					title="添加项目";
				}
				uni.setNavigationBarTitle({
					title
				})
			},
			async update(){
				uni.showLoading();
				
				let imgfile;
				if(this.uploadAttr.imageValue.length > 0){
					imgfile = this.uploadAttr.imageValue[0];
				}
				
				await projectApi.update(this.project,imgfile&&imgfile.path);
				uni.hideLoading();
				uni.showToast({
					title:"编辑成功"
				})
			},
			async save(){
				uni.showLoading();
				let project = this.project;
				project.id = this.$Tool.uuid();
				project.seq=100;
				project.userid = uni.loginUser.id;
				project.date =await this.$SysApi.getSystemDateTime();
				
				let imgfile;
				if(this.uploadAttr.imageValue.length > 0){
					imgfile = this.uploadAttr.imageValue[0];
				}
				//保存图片，拿到
				await projectApi.save(project,imgfile&&imgfile.path);
				uni.hideLoading();
				uni.showToast({
					title:"保存成功"
				})
				this.projectid = project.id;
				this.init();
				
			},
			deleteUniFile({tempFile,tempFilePath}){
				for (var i = 0; i < this.uploadAttr.imageValue.length; i++) {
					this.uploadAttr.imageValue[i] === tempFile && this.uploadAttr.imageValue.splice(i,1);
				}
			},
			// 获取上传状态
			select(e) {
				//console.log(e);
				this.uploadAttr.imageValue = [...this.uploadAttr.imageValue, ...e.tempFiles, ];
			},
		}
	}
</script>

<style lang="scss">
	.projectDeails{
		height: 100%;
		padding: 60rpx 20rpx 60rpx 20rpx;
		background-color: #FFFFFF;
		
		.label{
			width: 140rpx;
			color: #999999;
		}
		.value{
			width: calc(100% - 150rpx);
			inputborder{
				width: 100%;
			}
		}
		.item{
			margin-bottom: 40rpx;
			
		}
		.content{
			margin: 20rpx -20rpx 0 -16rpx;
			width: 100%;
		}
		.button{
			position: absolute;
			bottom: 10rpx;
			left: 0;
			right: 0;
		}
		.imgitem{
			height: 200rpx;
			margin-bottom: 60rpx;
			/* #ifndef H5 */
			.imgcontent{
				position: relative;
				top: -30rpx;
				left: 250rpx;
			}
			/* #endif */
			
		}
		.onebtnview{
			margin-top: 150rpx;
			padding: 0 50rpx;
		
		}
	}
</style>
