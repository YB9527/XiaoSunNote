<template>
	<view class="login">
		<view class="input">
			<!-- <view class="item account inputborder">
				<text>手机号</text>
				<input v-model="user.phone"></input>
			</view> -->
			<view class="item account inputborder">
				<text>用户名</text>
				<input v-model="user.username"></input>
			</view>
			<view class="item password inputborder">
					<text>密码</text>
				<input type="password" v-model="user.password"></input>
			</view>
			<view class="item password inputborder">
					<text>确认密码</text>
				<input type="password" v-model="user.confirmpassword"></input>
			</view>
			
			<view  class="item button">
				<button type="primary"  @click="regist">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import userApi from '@/api/userApi.js'
	export default {
		data() {
			return {
				user:{
					username:"",
					phone:"",
					password:"",
					confirmpassword:"",
				}
			}
		},
		methods: {
			async regist(){
				uni.showLoading();
				let user = this.user;
				if( !user.password||!user.username){
					uni.showToast({
						icon:"none",
						title:"账号或者密码不能为空"
					})
					return ;
				}
				if(user.password !== user.confirmpassword){
					uni.showToast({
						icon:"none",
						title:"两次输入的密码不一致"
					})
					return ;
				}
				user.id = this.$Tool.uuid();
				user.date =await this.$SysApi.getSystemDateTime();
				 await userApi.regist(user).then(count=>{
					 uni.showLoading();
					 uni.showToast({
					 	title:"恭喜 "+user.username+" 注册成功"
					 })
					 setTimeout(()=>{
					 	this.$mRouter.navigateTo("login");
					 },1000)
				 }).catch(e=>{
					 uni.showToast({
						 icon:"none",
					 	title:"注册失败，账号重复"
					 })
					 uni.hideLoading();
				 });

			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.login{
		height: 100%;
		width: 100%;
		display: flex;
		background-color: #FFFFFF;
		justify-content: center;
		
		
	}
	.input{
		width: 500rpx;
		margin-top: 300rpx;
	}
	.item{
		margin-bottom: 30rpx;
		text{
			font-weight: 600;
		}
		/deep/ .uni-input-input{
			color: #999999;
		}
	}
	.regist{
		display: flex;
		justify-content: flex-end;
		color: #999999;
		text-decoration: underline;
		font-style:italic;
		letter-spacing: 5rpx;
	}
	.button{
		margin-top: 100rpx;
	}
</style>
