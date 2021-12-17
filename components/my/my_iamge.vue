<template>
	<!-- 模板 -->
	<view class="myimage matchparent" :key="src">
		<image
			@click="click"
			v-if="src"
			mode="aspectFit"
			:src="src" 	
			@error="error"></image>
		<image
			v-else-if="losturl"
			mode="aspectFit"
			:src="losturl" 	
			></image>
		<view v-else class="error">
			<slot name="error">
				<text>{{errortext}}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			src:String,
			model:String,
			losturl:String,
			errortext:{
				type:String,
				default:"加载失败"
			}
		},
		data(){
			return{
				loaderror:false,
			}
		},
		computed:{
			
		},
		watch:{
			
		},
		created() {
			//console.log(this.loaderror,this.src);
		},
		methods:{
			error(val){
				this.loaderror = true
			},
			click(){
				
				this.$emit("click");
			}
		}
	}
</script>

<style lang="scss" >
	.myimage{
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 100%;
			height: 100%;
		}
		.error{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			color: #c0c4cc;
			vertical-align: middle;
			background: #f5f7fa;
			padding: 20rpx;
		}
	}
</style>
