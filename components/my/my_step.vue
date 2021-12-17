<template>
	<view class="stepvue">
		
		<view class="activetext">
			<text >
			{{nodeArray[active].text+'('+(active+1)+'/'+nodeArray.length+')'}}</text>
		</view>
		<view class="list horizontal"  >
			<view  
				v-for="(item,index) in nodeArray" 
				:key="index"
				
				:style="'width:'+ (100 / nodeArray.length)+'%'"
				class="item row">
				<view style="width: 100%;"
					:class="{steplinegray:active < index,steplinecurrent:active === index,steplinegreen:active > index}" >
					
				</view>
				<!-- <view    v-if="nodeArray.length-1 !== index"></view> -->
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			isvertical:{//是否是垂直
				type:Boolean,
				default:true,
			},
			active:{
				type:Number,
				default:-1,
			},
			nodeArray:{
				type:Array,
				default:()=>{
					return [
						{text:"宅基地申请"},
						{text:"村级审查"},
						{text:"乡镇审批"},
						{text:"建房监管"},
						{text:"竣工验收"},
					]
				}
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	.stepvue{
		.activetext {
			text-align: center;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: var(--primary);
		}
		.horizontal{
			display: flex;
			flex-wrap: wrap;
			text-align: left;
			.steplinegray{
				height: 12rpx;
				line-height: 40rpx;
				border-top: 3px solid gray;
			}
			.steplinegreen {
				height: 12rpx;
				line-height: 40rpx;
				border-top: 3px solid #4dc601;
			}
			.steplinecurrent{
				height: 12rpx;
				line-height: 40rpx;
				border-top: 3px solid #5dff06;
			}
		}
		
		.item {
			display: flex;
			padding: 2rpx;
			.steplinegreen {
			
			}

		
			.descrip{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	
	/* 最后一个调整距离 */
	.stepvue>.item:last-child>.right {
		margin-left: 10px;
	}
</style>
