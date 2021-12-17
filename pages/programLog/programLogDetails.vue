<template>
	<view v-if="show" class="programlogdetails">
		<view>
			<view  class="content">
				<view class="row item">
					<view class="label">
						 <text>当前状态：</text>
					</view>
					<ld-select :list="programstausArray"
						:class="note.type"
						class="value"
						label-key="value" 
						value-key="key" 
						placeholder="请选择" v-model="note.type"
						@change="selectStaus"></ld-select>
				</view>
				<view class="row item">
					<view class="content label">
						<text>标题：</text>
					</view>
					<view class="value">
						<input v-model="note.title"  class="inputborder" type="text" placeholder="请输入内容" />
					</view>
					
				</view>
			</view>
			
			<view  class="item ">
				 <view class="content label">
					 <text>内容：</text>
				 </view>
				<view class="value " >
					<!-- <textarea v-model="note.content"  placeholder="请填写内容"/> -->
					<jinEdit :html="note.content" ref="jinEdit" placeholder="请输入内容"  uploadFileUrl="/#"></jinEdit> 
				</view>
			</view>
			</view>
		
			<view class=" button">
				 <button v-if="note.id" type="warn" @click="update">编辑</button>
				 <button v-else type="primary" @click="save">添加</button>
			</view>
		<!-- 添加日志详情 -->
	</view>
</template>

<script>
	import programApi from '@/api/programApi.js'
	import jinEdit from '@/components/jin-edit/jin-edit.vue';
	export default{
		components: {
			jinEdit
		},
		data(){
			return{
				show:false,
				noteid:"",
				note:"",
				projectid:"",
				programstausArray:[],
			}
		},
		onLoad(option) {
			this.projectid = option.projectid;
			this.noteid = option.id;
			this.init();
		},
		methods:{
			async init(){
				let id = this.noteid;
				this.show = false;
				if(id){
					let note =await programApi.findById(id);
					this.note = note;
					if(!note.content){
						note.content = "";
					}
				}else{
					this.note = {type:"",content:"",seq:100,projectid:this.projectid};
				}
				this.programstausArray =await this.$DicApi.findProgramstaus();
				//console.log(this.programstausArray);
				this.show = true;
				this.setTitle();
				
				
			},
			selectStaus(val) {
				this.note.type = val
			},
			setTitle(){
				let title ="";
				if(this.note.id){
					title="编辑程序记录";
				}else{
					title="添加程序记录";
				}
				uni.setNavigationBarTitle({
					title
				})
			},
			async update(){
				uni.showLoading();
				await this.saveBase();
				await programApi.update(this.note);
				uni.hideLoading();
				uni.showToast({
					title:"编辑成功"
				})
			},
			async save(){
				let note = this.note;
				await this.saveBase();
				note.id = this.$Tool.uuid();
				note.userid = uni.loginUser.id;
				note.date =await this.$SysApi.getSystemDateTime();
				
				await programApi.save(this.note);
				uni.showToast({
					title:"保存成功"
				})
				this.noteid = note.id;
				this.init();
				
			},
			async saveBase(){
				let note = this.note;
				let content =await this.$refs.jinEdit.getContent();
				note.content = content;
				if(note.type === "finish"){
					note.finishdate =await this.$SysApi.getSystemDateTime();
				}
			}
			
		}
	}
</script>

<style lang="scss">

	
	.programlogdetails{
		height: 100%;
		padding-top: 20rpx;
		.content{
			padding:  0 20rpx;
			
		}
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.label{
			width: 140rpx;
			color: #999999;
			
		}
		.value{
			width: calc(100%);
			inputborder{
				width: 100%;
			}
		}
		.item{
			margin-bottom: 40rpx;
			
		}
		
		button{
			width: 750rpx;
			border-radius: 0;
		}
		
	}
</style>
