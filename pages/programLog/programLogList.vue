<template>
	<view class="programlog">
		<view class="item" v-if="isedit">
			<button type="primary" @click="editOk">保存</button>
		</view>
		<view class="list">
			<view class="listitem box" 
			:class="item.type == 'finish'?'finish':''"
			v-for="(item,index) in programArray"
			:key="item.id"
			>
				<view class="item sprow">
					<view class="row" @click="gotoDetails(index,item)">
						<view class="title"><text>{{item.title}}</text></view>
						<text class="type" :class="item.type" v-if="item.type != 'finish'" >{{item.typevalue}}</text>
					</view>
					
					<view class="switch" v-if="isedit">
						<view @click="itemMove(programArray,item,-1)" v-if="index != 0"><text class="cuIcon-fold"> </text></view>
						<view @click="itemMove(programArray,item,+1)" v-if="index != programArray.length-1"> <text  class="cuIcon-unfold"></text></view>
					</view>
					
				
				</view>
				
				<view class="item">
					<text style="color: #999999;">{{item.date}}</text>
				</view>
				<view class="item sprow" v-if="item.type == 'finish'">
					<text  style="color: #999999;">{{item.finishdate}}</text>
					<text class="type" >{{item.typevalue}}日期</text>
				</view>
				
				
			</view>
		</view>
		 <uni-fab
		 	horizontal="right"
		 	vertical="bottom"
		 	:content="content"
		 	@trigger="trigger"
		 ></uni-fab>
	</view>
</template>

<script>
	import programApi from '@/api/programApi.js'
	export default {
		data() {
			return {
				currentindex:-1,
				projectid:"",
				programArray:[],
				isedit:false,
				content:[
					{iconPath:"/static/images/edit.png",text:"编辑"},
					{iconPath:"/static/images/add.png",text:"添加"},
				],
			}
		},
		onLoad(option) {
			this.projectid =option.projectid;
			let projectname =option.projectname;
			if(projectname){
				uni.setNavigationBarTitle({
					title:projectname
				})
			}
			this.init();
		},
		onShow() {
			
			if(this.currentindex >= 0){
				if(this.programArray.length <= this.currentindex){
					//新增情况
					this.init();
				}else{
					//修改情况
					this.updateIndex(this.currentindex);
				}
				
				
			}
			
		},
		onPullDownRefresh() {
			this.init();
			uni.stopPullDownRefresh();
		},
		methods: {
			init(){
				if(!this.projectid){
					return;
				}
				//查出所有的记录
				this.findAll();
			},
			 itemMove(list,item,value){
				let index = list.indexOf(item);
				let tem =list[index];
				let tem2 =list[index+value];
				list.splice(index,1,tem2);
				list.splice(index+value,1,tem);
			},
			async updateIndex(currentindex){
				let id = this.programArray[currentindex].id;
				let program =await programApi.findById(id);
				if(program){
					 this.programArray.splice(currentindex,1,program);
				}
			},
			async findAll(){
				let projectid = this.projectid;
				this.programArray =await programApi.findByProjectid(projectid);
				//console.log(2,this.programArray);
			},
			trigger(item){
				switch(item.index){
					case 0:
						this.isedit = !this.isedit;
						break;
					case 1:
						this.addNote();
						break;
				}
			},
			//添加笔记
			addNote(){
				this.$mRouter.navigateTo("programLogDetails",{projectid:this.projectid});
				this.currentindex = this.programArray.length;
			},
			gotoDetails(index,note){
				this.currentindex = index;
				this.$mRouter.navigateTo("programLogDetails",{id:note.id});
			},
			//保存编辑
			async editOk(){
				let list = this.programArray;
				for (var i = 0; i < list.length; i++) {
					list[i].seq = i;
				}
				await  programApi.update(list);
				uni.showToast({
					title:"保存成功"
				});
				this.isedit =false;
			},
		}
	}
</script>

<style lang="scss">
	.programlog{
		padding: 20rpx;
		.listitem{
			padding: 20rpx;
			margin-bottom: 20rpx;
			view{
				font-size: $uni-font-size-lg2;
			}
			.item{
				margin-bottom: 10rpx;
				
				.title{
					margin-right: 30rpx;
					text{
						font-size: $uni-font-size-lg;
					}
					
				}
			}
			text{
				font-size: $uni-font-size-base;
			}
		}
	}
	.type{
		font-size: $uni-font-size-lg2;
	}
	
</style>
