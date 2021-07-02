<template>
	<view class="login">
		<view class="input">
			<view class="item account inputborder">
				<text>账号</text>
				<input v-model="user.account"></input>
			</view>
			<view class="item password inputborder">
					<text>密码</text>
				<input type="password" v-model="user.password"></input>
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
					account:"yb",
					password:"123",
				}
			}
		},
		methods: {
			async login(){
				let result = await userApi.login(this.user);
				if(result){
					uni.showToast({
						title:"登录成功"
					});
					console.log(this.$mRouter)
					this.$mRouter.switchTab("index");
				}else{
					uni.showToast({
						icon:"none",
						title:"账号：yb，密码：123"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.login{
		height: 100%;
		width: 100%;
		display: flex;
		
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
	.button{
		margin-top: 100rpx;
	}
</style>
