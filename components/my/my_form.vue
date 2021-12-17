<template>
	<!-- 模板 -->
	<!-- 模块标题、键值对关系、编辑、修改、显示、隐藏、数据格式化 -->
	<!--text，input，textarea， checkbox、 radio、单个date，date范围、button，文件上传预览，下载 -->
	<!-- 表单校验 -->
	<view class="my_formvue">
		<!-- {{moduleArray[1].array[5]}} -->
		<view  
			v-for="(module,index) in moduleArray"
			v-if="module.show !== false"
			:key="index"
			class="module"
			:class="module.class">
			<slot v-if="module.slot" ></slot>
			<view class="modulecontent">
				<view v-if="!module.slot" class="title " :class="module.titleclass" ><text> {{module.title}}</text></view>
				<view v-if="!module.slot"  :class="module.modulecontentclass">
					
					
					<view v-for="(column,j) in module.array"  v-if="!(column.show === false)">
						<slot v-if="column.type === 'slot' "  :data="data" :modulerow="column"></slot>
						<view v-else>
							<my_form_item :column="column" :data="data"></my_form_item>
							
						</view>
						
					</view>
				</view>
						
			</view>
			
		</view>
		<view class="subgroup aroundrow" v-if="haveback || haveok">
			<view class="cancerbtn  itemchild" v-if="haveback"  @click="back">
				 <text  class="button label">
					{{backtext}}
				 </text>
			</view>
			<view class="okbtn itemchild"  v-if="haveok"  @click="ok()">
				 <text  class="button label">
					{{oktext}}
				 </text>
			</view>
		</view>
	</view>
</template>

<script>
	import DicJson from '@/common/js/DicJson.js'
	import * as Tool from '@/common/js/Tool.js'
	import myUploadFile from './my-uploadFile'
	import my_form_item from './form/my_form_item.vue'
	export default{
		components:{myUploadFile,my_form_item},
		props:{
			
			data:{
				type:Object,
				default:function(){
					return {
						hzxm:"谢良洲",
						hzzjhm:"511027195211242418",
						txdz:"成都高新区玉成乡海鸣村1组10号",
						xb:"1",
						lxdh:"15968711521"
					}
				}
			},
			moduleArray:{
				type:Array,
				default:function(){
					return [
						{title:"个人信息",titleclass:"",class:"", array:[
							{type:"input",class:"row",labelclass:"",valueclass:"",text:"户主姓名",prop:"hzxm"},
							{type:"idcard", class:"row",labelclass:"",valueclass:"",text:"证件号码",prop:"hzzjhm"},
							{type:"input", class:"row",labelclass:"",valueclass:"",text:"通信地址",prop:"txdz"},
							/* {type:"datapicker", class:"row",labelclass:"",valueclass:"",text:"性别",prop:"xb",options:Tool.mapToArray(DicJson.XB,"value","text")}, */
							{type:"tel", class:"row",labelclass:"",valueclass:"",text:"电话",prop:"15968711521"},
						]},
						{slot:"sfzzm"},//身份證正面
						{slot:"sfzfm"},//身份證反面
						{title:"个人信息2",  titleclass:"",class:"", array:[
							{type:"input",class:"",labelclass:"",valueclass:"",text:"户主姓名",prop:"hzxm"},
							{type:"idcard", class:"",labelclass:"",valueclass:"",text:"证件号码",prop:"hzzjhm"},
							{type:"input", class:"",labelclass:"",valueclass:"",text:"通信地址",prop:"txdz"},
							{type:"radio", class:"",labelclass:"",valueclass:"",text:"性别",prop:"xb",dic:DicJson.XB},
							{type:"tel", class:"",labelclass:"",valueclass:"",text:"电话",prop:"15968711521"},
						]},
					]
				}
			},
			haveback:{
				type:Boolean,
				default:true,
			},
			backtext:{
				type:String,
				default:"返回"
			},
			
			haveok:{
				type:Boolean,
				default:true,
			},
			oktext:{
				type:String,
				default:"确定"
			},
			
		},
		data(){
			return{
			}
		},
		computed:{
			
		},
		watch:{
			
		},
		filters:{
			textfileter(text,optionmap){
				
				if(optionmap && optionmap[text]){
					return optionmap[text]
				}
				return text;
			}
		},
		created() {
			//console.log(DicJson)
			//console.log(this.$DicJson.XB)
			console.log(555,this.$Tool);
			console.log(666,Tool);
		},
		methods:{
			init(){

			},
			radioChange(e,data,prop,row) {
				
				 data[prop] = e.target.value
				 this.childCheck(row);
			},
			onNodeClick(node,data,prop,row){
				data[prop] = node.value;
				this.childCheck(row);
			},
			back(){
				this.$emit("back");
				
			},
			ok(){
				this.$emit("ok");

			},
			onchange(e) {
				const value = e.detail.value
			},
			check(){
				let flag = true;
				for (let module of this.moduleArray) {
					if(module.show === false){
						continue;
					}
					for(let column of module.array){
						if(column.show === false){
							continue;
						}
						let error = this.childCheck(column);
						if(error){
							flag = false;
						}
					}
				}
				if(!flag){
					return false;
				}else{
					return true;
				}
			},
			childCheck(column){
				let data = this.data;
				
				let error="";
				if(column.check && column.prop){
					if(column.check instanceof Array){
						error  = column.check[0](this.data[column.prop],column.check[1]);
					}else{
						error  = column.check(this.data[column.prop]);
					}
				}
				column.error = error;
				return error;
			}
		}
	}
</script>

<style lang="scss" >
	
	.my_formvue{
		.title{
			font-size:  $uni-font-size-title
		}
		.titletag{
			border-left: 12rpx solid $uni-color-primary;
			padding-left: 20rpx;
		}
		
		
		.subgroup{
			display: flex;
			justify-content: space-around;
			button{
				width: 46%;
			}
			height: 100rpx;
			align-items: center;
			text-align: center;
			position: relative;
			letter-spacing: 8rpx;
			.cancerbtn{
				width: calc(50% - 40px);
				height: 60rpx;
				line-height: 60rpx;
				background-color: #FFFFFF;
			}
			.okbtn{
				width: calc(50% - 40px);
				height: 60rpx;
				line-height: 60rpx;
				background-color: $uni-color-primary;
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
		
		
		
	.module{
		margin-bottom: 20rpx;
	}
	.modulecontent{
		padding: 10px;
		border-radius: 15upx;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		background: #FFFFFF;
	}
	
		
	
</style>
