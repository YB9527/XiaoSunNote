<template>
	<view class="projectlist" v-show="show">
		<view class="list">
			<view class="listitem box" 
			 v-for="(item,index) in projectlist"
			 :key="index"
			 @click="gotoProgramLog(item)">
				<view class="item sprow">
					<text class="projectname">{{item.projectname}}</text>
					<text class="label">NO.{{index+1}}</text>
				</view>
				<view class="item">
					<text class="label">创建日期：</text>
					<text  class="label">{{item.date}}</text>
				</view>
				<view class="item row" v-if="item.count">
					<text class="label">数量：</text>
					<text class="label">{{item.count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import programApi from '@/api/programApi.js'
	export default{
		data(){
			return{
				show:false,
				user:"",
				projectlist:[],
			}
		},
		onLoad() {
		},
		onShow() {
			this.init();
		},
		onPullDownRefresh() {
			this.init();
			uni.stopPullDownRefresh();
		},
		methods:{
			async init(){
				this.user = this.$store.getters.loginUser;
				if(!this.user){
					return;
				}
				this.show =false;
				//查出所有的记录
				await this.findAll();
				this.show =true;
			},
			async findAll(){
				let user = this.user;
				this.projectlist =await programApi.findByUserid(user.id);
			},
			gotoProgramLog(project){
				this.$mRouter.navigateTo("programLogList",{projectid:project.id,projectname:project.projectname});
			}
		}
	}
</script>

<style lang="scss">
	.projectlist{
		padding: 20rpx 10rpx 100rpx 10rpx;
		.listitem{
			margin-bottom: 20rpx;
			padding: 20rpx;
		}
		.item{
			margin-bottom: 10rpx;
			.projectname{
				font-weight: 600;
				font-size: $uni-font-size-lg2;
			}
		}
		.label{
			color: #999999;
		}
		 .row{
			 align-items: center;
		 }
	}
</style>
