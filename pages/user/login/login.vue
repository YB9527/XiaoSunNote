<template>
	<view class="login">
		<view class="input">
			<view class="item account inputborder">
				<text>用户名</text>
				<input v-model="user.username"></input>
			</view>
			<view class="item password inputborder">
					<text>密码</text>
				<input type="password" v-model="user.password"></input>
			</view>
			<view class="item regist">
				<text @click="gotoRegist">注册</text>
			</view>
			<view  class="item button">
				<button type="primary"  @click="login">登录</button>
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
					password:"",
				}
			}
		},
		onLoad(option) {
			this.autoLogin();
			//console.log("loginoption",option);
		},
		methods: {
			async autoLogin(){
				
				setTimeout(()=>{
					 userApi.getStorageUser().then(user=>{
						if(user){
							this.user = user;
							if(user && user.username && user.password){
								uni.showLoading({
									title:"自动登录中..."
								})
								this.login();
							}
						}
					
					}).catch(e=>{
						uni.hideLoading();
					})
				},500);
				
			},
			async login(){
				
				let user = await userApi.login(this.user);
				if(user){
					this.$mRouter.switchTab("projectList");
				}else{
					uni.showToast({
						title:"账号密码错误",
						icon:"none"
					});
				}
				uni.hideLoading();
			},
			gotoRegist(){
				this.$mRouter.navigateTo("regist");
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
