· <template>
	<!-- 条件筛选 -->
	<view >
		<view class="conditionalFilter">
			<view class="conditionallist" :style="'width:'+ (order?'calc(100% - 40rpx);':'100%')">
				<view  class="conditionalitem row"
					v-for="(item,index) in dataArray" 
					:key="index"
					@click="itemclick(item) ">
					<text class="label" :class="{iconshow:(item.have||item.show) && showconditioncontent }"> {{item.label}}</text>
					<view :class="{conditionalshow:item.have ,show:item.show && showconditioncontent}" class="triangle" v-if="!item.icon"></view>
					<text  v-else :class="item.icon+' '+(item.show?'iconshow':'') "></text>
				</view>
			</view>
			<view  class="ordericon" @click="ordericonClick(order) ">
				<text   :class="{'cuIcon-unfold':order,iconshow:  order && (order.index > -1 || order.show)}"></text>
			</view>
		</view>
		<slot name="content">
			<conditionalFilterContent
				v-show="!order || !order.show"
				@ok="conditionalOk"
				:dataArray="currentcontent" 
				:showconditioncontent="showconditioncontent">
			</conditionalFilterContent>
		</slot>
		<view  v-if="order && order.show">
			<slot name="order">
				<view class="order">
					<view @click="orderClick(-1)" :class="{active:order.index===-1}" class="orderitem"><text>默认排序</text> </view>
					<view class="line"></view>
					<view 
						v-for="(option,index) in order.options" 
						:key="index"
						@click="orderClick(index,option)"
						class="orderitem" 
						:class="{active:order.index===index}" >
						<text>{{option.label}}</text>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	import conditionalFilterContent from '@/components/my/my_conditionalFilterContent.vue'
	export default{
		props:{
			
			click:Function,

			dataArray:{
				type:Array,
				default:()=>{
					return [
						{id:0,label:"广都",have:true},
						{id:0,label:"价格"},
						{id:0,label:"房型",have:true,show:true},
						
					];
				}
			},
			currentcontent:{
				type:Array,
				default:()=>{
					return [
						
					];
				}
			},
			order:{
				type:Object,
				default:()=>{
					return {
						show:false,
						index:1,
						options:[
							{key:"price0",label:"价格从高到低"},
							{id:"price1",label:"价格从高到低"},
							{id:"distance",label:"距离从进到远"},
						],
					}
				}
			}
		},
		components:{conditionalFilterContent},
		data(){
			return{
				showconditioncontent:false,
			}
		},
		computed:{
			
		},
		watch:{

		},
		created() {
			
		},
		methods:{
			//多条件筛选返回
			conditionalOk(){
				this.showconditioncontent = false;
				for(let data of this.dataArray){
					data.show = false;
				}
				this.reflushStyle();
				this.$emit("conditionalOk",this.dataArray)
			},
			itemclick(item){
				if(this.order){
					this.order.show = false;
				}
				for(let data of this.dataArray){
					if(data !== item){
						data.show = false;
					}
				}
				
				let show = !item.show;
				item.show = show;
				
				this.reflushStyle();
				this.showconditioncontent = show;
				if(show){
					this.$Tool.arrayReplace(this.currentcontent,item.content);
				}
			},
			
			
			reflushStyle(){
				if(!this.dataArray){
					return;
				}
				//console.log(this.dataArray);
				for(let data of this.dataArray){
					data.have = false;
					if(!data.content){
						continue;
					}
					for(let contentitem of data.content){
						let itemarray = contentitem.itemarray;
						//debugger
						let have = this.itemHave(itemarray);
						if(have){
							data.have = true;
							break;
						}
					}
				}
			},
			/**
			 * 本组是否有选项
			 * @param {Object} itemarray
			 */
			itemHave(itemarray){
				let flag =false;
				if(itemarray){
					for(let item of itemarray){
						//console.log(item.class)
						if(item.class && item.class.indexOf("active") !== -1){
							return true;
						}
					}
				}
				return flag;
			},
			/**
			 * 排序点击事件
			 * @param {Object} index
			 * @param {Object} option
			 */
			orderClick(index,option){
				this.order.show = false;
				this.order.index = index;
				this.$emit("orderClick",index,option);
			},
			ordericonClick(order){
			
				for(let data of this.dataArray){
					data.show = false;
				}
				if(order){
					order.show = !order.show
					
				}
				
			}
		}
	}
</script>

<style lang="scss" >
	.conditionalFilter{
		display: flex;
		justify-content: space-between;
		height: 60rpx;
		align-items: center;
		
		width: 100%;
		.conditionallist{
			display: flex;

			justify-content: space-around;
		}
		.conditionalitem{
			display: flex;
			align-items: center;
			
		}
		.label{
			line-height: 60rpx;
			margin-right:10rpx;
			font-size: var(--fontsmall);
		}
		.triangle{
			width: 0rpx;
			height: 0rpx;
			border-top: 10rpx solid #333;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
		}
		
		.conditionalshow {
			border-top: 10rpx solid var(--primary);
		}
		.show{
			border-top: 0rpx solid var(--primary);
			border-bottom: 10rpx solid var(--primary);
		}
		.iconshow{
			color:  var(--primary);
			font-weight: 600;
		}
		.ordericon{
			line-height: 80rpx;
			width: 80rpx;
			text-align: center;
			
		}
		
	}
	.order{
		text-align: center;
		.orderitem{
			height: 100rpx;
			line-height: 100rpx;
		}
		.active{
			color: var(--primary);
		}
	}
</style>
