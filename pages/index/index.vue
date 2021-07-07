<template>
	<view class="indexcontent">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			goto(urltag){
				this.$mRouter.navigateTo(urltag);
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
	
</style>
