<template>
	<scroll-view class="my_page"  scroll-y @scrolltolower="scrolltolower" >
		<my_searchpage  
			:ok="searchEvent.ok" 
			:cancel="searchEvent.cancel"
			:tag="searchdata.tag"
			:placeholder="searchdata.placeholder"
			:showpage="searchdata.showpage"
			:showsubscribe="searchdata.showsubscribe"
			:value="searchdata.value"
			>
		</my_searchpage>
			
		<conditionalFilter 
			ref="conditionalFilter" 
			@orderClick="orderClick"
			@conditionalOk="conditionalOk" 
			:dataArray="conditionalfilterprop.dataArray"
			:currentcontent="conditionalfilterprop.currentcontent"
			:order="conditionalfilterprop.order"
			 >
		</conditionalFilter>
		<mylist  ref="table" 
			style="height: calc(100% - 100rpx)" 
			:datakey="formdata.datakey" 
			:datatotal="datatotal" 
			:dataArray="dataArray"
			:pagesize="pagesize"
			:event="tableEvent">
			<template v-slot="{item,index}">
				<slot name="listitem" :item="item" index="index"></slot>
			</template>
		</mylist>
	</view>
	</scroll-view>
</template>

<script>
	import my_searchpage from '@/components/my/my_searchpage'
	import conditionalFilter from '@/components//my/my_conditionalFilter.vue'
	import mylist from '@/components/my/my_list'
	import FormData from './form/Formdata.js'
	
	export default {
		components: {
			mylist,
			my_searchpage,
			conditionalFilter,
		},
		props:{
			conditionalfilterprop:Object,
			formdata: FormData,
			datatotal: Number,
			pagesize:Number,
			dataArray: Array,
			searchdata :{
				type:Object,
				default: ()=>{
					return {
						tag:"未定义",//用于查找历史记录，//查找订阅
						placeholder:"",
						showpage:false,
						showsubscribe:true,
						value:"",
					}
				}
			},
		},
		data() {
			return {
				searchEvent: {
					ok: (value) => {
						//console.log("查询",value);
						this.$emit("searchOk", value, this.reFushData);
					},
					clear: () => {
						//console.log("清除");
						this.$emit("searchClear", this.reFushData);
					}
				},
				tableEvent: {
					itemClick: (index, data)=>{
						this.$emit("itemClick", index, data);
					},
					handleCurrentChange: async (pageindex,pagesize, datacallback) => {

						this.$emit("findData", pageindex,pagesize, datacallback);
					},
				},
			}
		},
		onShow() {
			uni.setSelfThem();
		},
		created() {
			
		},
		methods: {
			
			/**刷新数据
			 * @param {Object} datas
			 */
			reFushData(datas) {
				this.$Tool.arrayReplace(this.datas, datas);
			},

			//多条件筛选
			conditionalOk(val){
				
				this.conditionalfilterprop.showconditioncontent = false;
				this.$refs.table.handleCurrentChange(1);
			},
			findOnePageData(){
				this.$refs.table.handleCurrentChange(1);
			},
			orderClick(index,option){
				this.findOnePageData();
			},
			scrolltolower(){
				this.$refs.table.scrolltolower();
			}
		}
	}
</script>

<style lang="scss">
	uni-page-body,
	page {
		background-color: #F1F1F1;
	}
	
	.my_page {
		height: 100%;
		width: 100%;
		.listitem{
			margin-top: 10rpx;
			margin-bottom: 40rpx;
			background: #FFFFFF;
		}
	}
</style>
