<template>
	<view class="programlog">
		
		<view class="list">
			<view class="item box" 
			v-for="item in programArray"
			:key="item.id"
			@click="gotoDetails(item)">
				<view class="sprow">
					<text>{{item.date}}</text>
					<text class="type" v-if="item.type != 'finish'" :class="item.type">{{item.typevalue}}</text>
				</view>
				<view class="sprow" v-if="item.type == 'finish'">
					<text  style="color: #999999;">{{item.finishdate}}</text>
					<text class="type" :class="item.type">{{item.typevalue}}日期</text>
				</view>
				<view style="color: #999999;"><text>{{item.title}}</text></view>
			</view>
		</view>
		  <uni-fab
				horizontal="right"
				vertical="bottom"
				@fabClick="addNote"
			></uni-fab>
	</view>
</template>

<script>
	import programApi from '@/api/programApi.js'
	export default {
		data() {
			return {
				
				user:"",
				programArray:[],
			}
		},
		onLoad(option) {
	
			
			
		},
		onShow() {
			
			this.init();
		},
		onPullDownRefresh() {
			this.init();
			uni.stopPullDownRefresh();
		},
		methods: {
			init(){
				
				this.user = this.$store.getters.loginUser;
				//console.log(1,this.user)
				if(!this.user){
					return;
				}else{
					//查出所有的记录
					this.findAll();
				}
				
			},
			async findAll(){
				let user = this.user;
				this.programArray =await programApi.findByUserid(user.id);
				//console.log(this.programArray);
			},
			//添加笔记
			addNote(){
				this.$mRouter.navigateTo("programLogDetails");
			},
			gotoDetails(note){
				this.$mRouter.navigateTo("programLogDetails",{id:note.id});
			}
		}
	}
</script>

<style lang="scss">
	.programlog{
		padding: 20rpx;
		.item{
			margin-bottom: 20rpx;
			padding: 20rpx;
			view{
				margin-bottom: 10px;
				font-size: $uni-font-size-lg2;
			}
		}
	}
	.type{
		font-size: $uni-font-size-lg2;
	}
	
</style>
