<template>
	<!-- 菜单栏 -->
	<view class="matchparent my_menu_list_vue" >
		<scroll-view
			class="menulist" :style="{width,height}"
			:scroll-y="true"> 		
			<view 
				:class="{itemhorizontal:ishorizontal,activeindex:index===activeIndex.value}" 
				class="item" 
				v-for="(menu,index) in menuArray"
				:key="index"
				@click="itemClick(menu,index)">
				{{menu | menuFilter}}
			</view>
		</scroll-view>
		<scroll-view
			
			:scroll-top="config.scrollTop"
			class="content" :style='{width:"calc(100% - "+width+")",height}'
			:scroll-y="true"
			@scrolltoupper="scrolltoupper"		
			@scrolltolower="scrolltolower"> 		
			<slot 
				name="content"
				:menu="menuArray[activeIndex.value]" 
			 >
			</slot>
		</scroll-view>
	</view>
	
</template>

<script>
	//下拉 上啦两次刷新数据
	export default{
		components:{},
		props:{
			config:{
				type:Object,
				default:()=> {
					return {scrollTop:0}
				},
			},
			scrollChange:{
				type:Boolean,
				default:false,
			},
			activeIndex:{
				type:Object,
				default:()=> {
					return {value:0}
				},
			},
			ishorizontal:{
				type:Boolean,
				default:true,
			},
			width:{
				type:String,
				default:"170rpx",
			},
			height:{
				type:String,
				default:"100%",
			},
			menuArray:{
				type:Array,
				default:()=>[],
			}
		},
		data(){
			return{
				locationing:false,//是否在执行定位中
			}
		},
		filters:{
			menuFilter(menu){
				
				if(!menu || typeof(menu) == "string"){
					return menu;
				}
				return menu.label;
			}
		},
		watch:{
			"activeIndex.value"(index){
				//debugger
				let self = this;
				
				self.locationing = true;
				//debugger
				self.config.scrollTop = 1;
				setTimeout(()=>{
					self.config.scrollTop = 0;
				},100);
				this.$emit("menuChange",this.menuArray[index],location=>{
					
					if(typeof(location) === "number" ){
						try{
							//
						}finally{
							
						}
						self.locationing = false;
					}
				});
			}
		},
		created() {
			
		},
		methods:{
			itemClick(menu,index){
				if(this.activeIndex.value !== index){
					this.activeIndex.value = index;
					
				}
				
			},
			
			//上滚刷新
			scrolltoupper(){
				//debugger
				if(this.locationing){
					//this.locationing = false;
					return;
				}
				if(!this.scrollChange){
					return;
				}
				console.log("上滚刷新"+this.menuArray[this.activeIndex.value].name);
				if(this.activeIndex.value > 0){
					let active = this.activeIndex.value - 1;
					let menu = this.menuArray[active];
					let flag = this.$emit("scrolltoupper",menu);
					if(flag !== false){
						this.activeIndex.value = active;
					}
				}
			},
			//下滚刷新
			scrolltolower(){
				//debugger
				
				if(this.locationing){
					//this.locationing = false;
					return;
				}
				if(!this.scrollChange){
					return;
				}
				console.log("下滚刷新"+this.menuArray[this.activeIndex.value].name);
				if(this.activeIndex.value < this.menuArray.length-1){
					let active = this.activeIndex.value + 1;
					
					let flag = this.$emit("scrolltolower",this.menuArray[active]);
					//debugger
					if(flag !== false){
						this.activeIndex.value = active;
					}
				}
			},
			
		}
	}
</script>

<style lang="scss" >
	.my_menu_list_vue{
		display: flex;
		.menulist{
			background: #F1F1F1;
			.item{
				height: 180rpx;
				line-height: 100rpx;
				text-align: center;
				letter-spacing: 4rpx;
			}
			.activeindex{
				background-color: #FFFFFF;
			}
		}
	}
	
</style>
