<template>
	<view class="indexcontent">
		<uni-grid :column="3" :showBorder="false"  :square="false">
		    <uni-grid-item >
				<view class="item" @click="goto('canZhuo')">
					<image  src="/static/images/store.png"></image>
					<text class="text">餐厅</text>
				</view>
		    </uni-grid-item>
		    <uni-grid-item >
				<view class="item"  @click="goto('foodTypeManager')">
					<image src="/static/images/foodmenu.png"></image>
					<text class="text">菜类管理</text>
				</view>
		    </uni-grid-item>
		    <uni-grid-item >
				<view class="item" @click="goto('evaluateManger')">
					<image  src="/static/images/evaluate.png"></image>
					<text class="text">评价管理</text>
				</view>
			</uni-grid-item>
			<uni-grid-item >
				<view class="item" @click="goto('restaurantConfig')">
					<image src="/static/images/shop.png"></image>
					<text class="text">店铺配置</text>
				</view>
				
			</uni-grid-item>
			<uni-grid-item >
				<view class="item" @click="goto('historyTable')">
					<image src="/static/images/history.png"></image>
					<text class="text">历史餐桌</text>
				</view>
			</uni-grid-item>
			<uni-grid-item >
				<view class="item" @click="goto('business')">
					<image src="/static/images/purse.png"></image>
					<text class="text">营业详情</text>
				</view>
			</uni-grid-item>
			<!-- <uni-grid-item>
				<view class="item" @click="goto('/pages/test/test')">
					<image src="/static/logo.png"></image>
					<text class="text">骑手管理</text>
				</view>
			</uni-grid-item> -->
		</uni-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		methods: {
			goto(urltag){
				//console.log(url)
				this.$mRouter.navigateTo(urltag);
				/* uni.navigateTo({
				    url
				}); */
			}
		}
	}
</script>

<style lang="scss">
	.uni-grid-item {
		.item{
			display: flex;
			flex-direction: column;
			text-align: center;
			margin-top: 200rpx;
			image{				width: 100rpx;
				height: 100rpx;margin: 0 auto;
			}
			text {
				font-size: $uni-font-size-lg;
			}
		}
		
	}
	/* .indexcontent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	} */
</style>
