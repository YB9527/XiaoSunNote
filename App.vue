<script>
	import userApi from '@/api/userApi.js'
	export default {
		onLaunch: function() {
			uni.vue = this;
			this.$mRouter.setVue(this);
			setTimeout(()=>{
				this.checkLogin();
			},500);
		},
		onShow: function() {
		},
		onHide: function() {
		},
		methods:{
			checkLogin(){
				//检查当前的网页是否需要登录
				//var url = window.location.pathname;
				//var search =  window.location.search;
				let pages = getCurrentPages();
				if(pages.length == 0){
					this.$mRouter.navigateTo("login");
					return;
				}
				//console.log("/"+pages[pages.length-1].route);
				var url ="/"+pages[pages.length-1].route;
				let routeMap = this.$mRouter.routeMap;
				for(let key in routeMap){
					
					let route = routeMap[key];
					if(route.path === url){
						if(route.requiresAuth && !userApi.token){
							userApi.storageLogin().then().catch(e=>{
								this.$mRouter.navigateTo("login");
							});
							//this.$mRouter.switchTab("projectList");
						}
						break;
					}
				}
			}
					
					
			
		}
	}
</script>

<style lang="scss">
	// 导入colorUI
	@import '/static/css/colorui/main.css';
	@import '/static/css/colorui/icon.css';
	@import '/static/css/colorui/animation.css';
	// 导入阿里巴巴矢量图标库
	/*#ifdef MP*/
	@import './static/css/iconfont/iconfont.css';
	/*#endif*/
	/*#ifndef MP*/
	@import url('https://at.alicdn.com/t/font_1823374_98c45zxwb3c.css');
	/*#endif*/
	@import './static/css/reset.scss';
	@import './static/css/uni.scss';
	/*每个页面公共css */
	page, uni-page-body {
		height: 100%;
		background-color: #F1F1F1;
	}
	.box {
		border-radius: 15upx;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		background-color: #FFFFFF;
	}
	.row{
		display: flex;
	}
	.sprow{
		display: flex;
		justify-content: space-between;
	}
	.inputborder{
		border-bottom: 1px solid #999999;
	}
	.itemmargin{
		margin-top: 20rpx;
	}
	.stop{
		color: #aaffff;
	}
	.wait{
		color: #FBBD08;
	}
	.finish{
		color: #999999;
	}
	.bug{
		color: #ff007f;
	}
	.switch{
		display: flex;
		margin-left: 20rpx;
		view{
			text{
				font-size: $uni-font-size-lg2;
				font-weight: 600;
				color: #DD524D;
			}
			margin-left: 20rpx;
			width: 50rpx;
			text-align: center;
			height: 50rpx;
	
		}
	}
</style>
