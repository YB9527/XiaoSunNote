<template>
	<!-- 模板 -->
	<view class="conditionalFilterContentvue" >
		<transition  name="conditioncontent" mode="out-in">
			<view class="conditionalFilterContent" v-if="showconditioncontent">
				<list  :dataArray="dataArray" 
					:showisloadover="false" 
					:showactive="false"
					:datakey="'title'">
					<template  v-slot="{item}">
							<view class="listitem">
								<view class="title"> 
									<text>{{item.title}}</text>
								</view>
								<view  class="itemarray" :class="item.itemchildclass">
									<view  :class="iteminitem.class" class="itemchild" 
											v-for="(iteminitem,j) in item.itemarray"
											:key="j"
											>
										 <view v-if="iteminitem.type === 'button'"  @click="itemChildClick(item,iteminitem)">
											 <text  class="button label">
												{{iteminitem.text}}
											 </text>
										 </view>
										
									</view>
								</view>
								<!-- <text>{{item | test }}</text> -->
							</view>
					</template>
				</list>
				<view class="subgroup aroundrow">
					<view class="cancerbtn  itemchild" v-if="haveclear"  @click="clearConditional">
						 <text  class="button label">
							{{cleartext}}
						 </text>
					</view>
					<view class="okbtn itemchild"  v-if="haveok"  @click="okConditional()">
						 <text  class="button label">
							{{oktext}}
						 </text>
					</view>
				</view>
			</view>
		</transition>
	</view>
	
	
</template>

<script>
	import list from './my_list.vue'
	export default{
		components:{list},
		props:{
			showconditioncontent:{
				type:Boolean,
				default:true,
			},
			dataArray:{
				type:Array,
				default:()=>{
					return [
						{title:"建筑面积",key:"jzmj",itemarray:[
							{value:"50㎡以下",class:"",type:"button",text:"50㎡以下"},
							{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
							{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
							{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
							{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
						]},
						{title:"朝向",key:"chaoxiang",itemarray:[
							{type:"button",class:"",text:"南北"},
							{type:"button",class:"",text:"南北"},
							{type:"button",class:"",text:"南北"},
							{type:"button",class:"",text:"南北"},
							{type:"button",class:"",text:"南北"},
						]},
				/* 		{itemchildclass:"aroundrow",itemarray:[
							{type:"subbutton",class:"cancerbtn", text:"清空条件",click:()=>{
								console.log("清空条件");
							}},
							{type:"subbutton",class:"okbtn",text:"确定"},
						]} */
					];
				},
				
			},
			haveclear:{
				type:Boolean,
				default:true,
			},
			cleartext:{
				type:String,
				default:"清空条件"
			},
			clearClick:Function,
		
			haveok:{
				type:Boolean,
				default:true,
			},
			oktext:{
				type:String,
				default:"确定"
			},
			okClick:Function,
			resultArray:{
				type:Array,
				default:()=>{
					return [
						{key:"jzmj",itemarray:[]}
					];
				}
			}
		},
		data(){
			return{
				active:" active",
			}
		},
		computed:{
			
		},
		watch:{
			
		},
		filters:{
			test(value){
				console.log(value);
				return 123;
			}
		},
		created() {
			
		},
		
		methods:{
			itemChildClick(group,item){
				
				let active = this.active;
				if(	item.class === undefined){
					item.class = "";
				}
				let classstr = item.class;
				if(item.type !== "subbutton"){
					if(classstr.indexOf(active) === -1){
						item.class += active;
						item.have = true;
					}else{
						item.class =classstr.substring(0,classstr.length - active.length);
						item.have = false;
					}
					//如果设置了单选
					if(group.multiple === false){
						for(let child of group.itemarray){
							if(child !== item){
								child.class =classstr.substring(0,classstr.length - active.length);
								child.have = false;
							}
						}
					}
				}
				//console.log(33,this.dataArray)
				item.click && item.click();
			},
			clearConditional(){
				let active = this.active;
				for(let data of this.dataArray){
					if(data.itemarray){
						for(let item of data.itemarray){
							if(item.class.indexOf(active) !== -1){
								item.class =item.class.substring(0,item.class.length - active.length);
								item.have = false;
							}
						}
					}
				} 
				this.clearClick && this.clearClick();
			},
			okConditional(){
				let active = this.active;
				let dataArray = this.$Tool.copy( this.dataArray);
				for(let data of dataArray){
					if(data.itemarray){
						for (var i = 0; i <  data.itemarray.length; i++) {
							if(data.itemarray[i].class.indexOf(active) === -1){
								data.itemarray.splice(i,1);
								i--;
							}
						}
					}
					
				}
				//清楚没有的条件
				for (var i = 0; i < dataArray.length; i++) {
					if(!dataArray[i].itemarray || dataArray[i].itemarray.length === 0){
						dataArray.splice(i,1);
						i--;
					}
				}
				this.okClick && this.okClick();
				this.$emit("ok");
			}
		}
	}
</script>

<style lang="scss" >

	.conditionalFilterContentvue{
		position: relative;
		width: 100%;
		height: auto;
		.conditioncontent-enter-active, .conditioncontent-leave-active {
		  transition: all .5s;
		   opacity: 0.5;
		}
		.conditioncontent-enter, .conditioncontent-leave-to
		/* .list-leave-active for below version 2.1.8 */ {
		  opacity: 0;
		  transform: translateY(-300px);
		}
		.conditionalFilterContent{
			width: 100%;
			top: 0;
			z-index: 2;
			
			
			overflow: hidden;
			::v-deep .listvue{
				height: auto;
			}
			
			.title{
				font-size: var(--fonttitle);
				font-weight: 500;
			}
			.listitem{
				padding: 20rpx;
				background: #FFFFFF;
				border-bottom: 2rpx solid #F1F1F1;
			}
			.itemarray{
				display: flex;
				flex-wrap: wrap;
				.itemchild{
					width: calc(25% - 20rpx);
					margin-top: 20rpx;
					text-align: center;
					background: #F1F1F1;
					height: 50rpx;
					line-height: 50rpx;
					margin-right: 20rpx;
					border-radius: 4rpx;
				}
				
				.active{
					background-color: var(--primary2);
					text{
						color: #FFFFFF;
					}
				}
			}
			.subgroup{
				height: 100rpx;
				align-items: center;
				text-align: center;
				background-color: #FFFFFF;
				position: relative;
				.cancerbtn{
					width: calc(50% - 40px);
					height: 60rpx;
					line-height: 60rpx;
					background: #F1F1F1;
				}
				.okbtn{
					width: calc(50% - 40px);
					height: 60rpx;
					line-height: 60rpx;
					background-color: var(--primary);
					.label{
						color: #FFFFFF;
					}
				}
			}
			.aroundrow{
				display: flex;
				justify-content: space-around;
				
			}
		}
		
	}
</style>
