<template>
	<!-- 列表 -->
	<view class="searchpage" :class="{pageall:showpage}">
		<slot>
			<uni-search-bar
				@cancel="selfCancel()"
				@clear="clear"
				@confirm="selfOk(searchkey)"
				@focus="focus"
				:placeholder="placeholder"
				v-model="searchkey"/>
		</slot>
		<view class="content"  v-if="showpage">
			<view class="contentitem dingyue" v-if="showsubscribe">
				<view class="title"><text class="label">已订阅搜索</text></view>
				<view class="list" v-if="subscribeArray.length > 0">
					<view class="listitem"  v-for="item in subscribeArray" :key="item">
						<text>{{item}}</text>
					</view>
					
				</view>
				<view class="list center" v-else>
					<text >暂无相关订阅</text>
				</view>
			</view>
			<view class="contentitem history">
				<view class="title">
					<text class="label">历史搜索</text>
					<text class='cuIcon-delete' @click="clearHistory"></text>
				</view>
				<view class="list" v-if="historyArray.length > 0">
					<view @click="selfOk(item)" class="listitem" v-for="item in historyArray" :key="item">
						<text >{{item}}</text>
					</view>
				</view>
				<view class="list center" v-else>
					<text >暂无查询记录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			tag:String,//用于查找历史记录，//查找订阅
			placeholder:String,
			ok:Function,
			cancel:Function,
			showsubscribe:{
				type:Boolean,
				default:false
			},
			value:"",
		},
		data(){
			return{
				showpage:false,
				searchkey:"",
				subscribeArray:[],
				historyArray:[],
				tableName:"D_subscribe",
			}
		},
		computed:{
			userId(){
				let user =  this.$store.state.loginUser;
				return user&&user.userId;
			},
			
		},
		watch:{
			value(val){
				this.searchkey = val;
			}
		},
		created() {
			this.init();
		},
		methods:{
			init(){
				this.searchkey = this.value;
				if(this.showSubscribe){
					this.findSubscribe();
				}
				this.findHistory();
			},
			clear(){
				this.selfOk("");
				
			},
			selfOk(value){
				this.showpage = false;
				this.ok && this.ok(value);
				if(value){
					value = value.trim();
					let historyArray = this.historyArray;
					//储存到历史记录当中
					//历史记录只存10条数据
					let index = historyArray.indexOf(value);
					if(index >= 0){
						//如果本身有记录，那么就删除以前
						historyArray.splice(index,1);
					}
					historyArray.unshift(value);
					let tag = this.tag;
					if(tag){
						if(historyArray.length > 10){
							historyArray.splice(10,historyArray.length.length - 10);
						}
						uni.setStorage({
						    key: tag,
						    data: historyArray
						});
					}
				}
			},
			selfCancel(){
				this.showpage = false;
				if(this.searchkey){
					this.selfOk("");
				}
				this.cancel && this.cancel();
			},
			/**
			 * 查询订阅
			 */
			async findSubscribe(){
				
				let userId = this.userId;
				if(!userId){
					return;
				}
				return;//暂时不做订阅
				let subscribeArray = this.$Api.selectArrayData(this.tableName,{userId,"@order": "dyrq-"});
				this.$Tool.arrayReplace(this.subscribeArray,subscribeArray);
			},
			/**
			 * 查询搜索的历史记录
			 */
			findHistory(){
				let self = this;
				//console.log(this.$Tool.arrayReplace);
				let tag = this.tag;
				if(!tag){
					return;
				}
				uni.getStorage({
					key: tag,
					success:  (storage)=> {
						let historyArray = storage.data;
						self.$Tool.arrayReplace(self.historyArray,historyArray);
					}
				});
			},
			/**
			 * 清空历史记录
			 */
			clearHistory(){
				if(this.tag){
					this.$Tool.arrayReplace(this.historyArray);
					uni.setStorage({
						key: this.tag,
						data: []
					});
				}
				
			},
			focus(){
				this.showpage = true;
			}
		}
	}
</script>

<style lang="scss" >
	.pageall{
		position: absolute;
		z-index: 3;
		background: #F1F1F1;
		height: 100%;
		top: 0;
	}
	.searchpage{
		width: 100%;
		.content{
			.title{
				padding: 0 40rpx;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				text{
					line-height: 80rpx;
				}
				.label{
					color: #999999;
				}
			}
			.list{
				background: #FFFFFF;
				min-height: 200rpx;
				.listitem{
					padding-left: 40rpx;
					margin-bottom: 20rpx;
					text{
						font-size: 32rpx;
						line-height: 100rpx;
					}
				}
			}
			.center{
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
	}
</style>
