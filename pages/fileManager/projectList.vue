<template>
	<view class="projectlist" v-show="show">
		<text class="ing">开发中</text>
		<view class="item" v-if="isedit">
			<button type="primary" @click="editOk">保存</button>
		</view>
		<view class="list">
			<view class="listitem box " :class="item.imageurl?'row':''"
			 v-for="(item,index) in projectlist"
			 :key="index"
			 @click="!isedit&& gotoProgramLog(index,item)"
			 >
			 <view v-if="item.baseimageurl">
				<image  class="logimage" :src="item.baseimageurl" mode="aspectFill"></image>
			 </view>
			 <view :class="item.imageurl?'right':''">
				 <view class="item sprow" >
				 	<text class="projectname" @click="isedit&&gotoProjectDetails(index,item)">{{item.name}}</text>
				 	
					<text class="label">NO.{{index+1}}</text>
					
				 	<view class="switch" v-if="isedit">
				 		<view @click="itemMove(projectlist,item,-1)" v-if="index != 0"><text class="cuIcon-fold"> </text></view>
				 		<view @click="itemMove(projectlist,item,+1)" v-if="index != projectlist.length-1"> <text  class="cuIcon-unfold"></text></view>
				 	</view>
				 </view>
				 <view class="item sprow" >
				 	<!-- <view>
				 		<text class="label">创建日期：</text>
				 		<text  class="label">{{item.date}}</text>
				 	</view> -->
				 	
	
				 </view>
				 <view class="item row" v-if="item.count" >
					 <view 
						style="margin-right: 40rpx;"
						v-for="type of item.typeArray" 
						:key="type.type">
						 <view>
							 <text class="label">{{type.typevalue}}：</text>
							 <text :class="type.type">{{type.count}}</text>
						</view>
					 </view>
				 	<!-- <view  class="row">
				 		<text class="label">数量：</text>
				 		<text class="label">{{item.count}}</text>
				 	</view> -->
				 </view>
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
	import projectApi from '@/api/projectApi.js'
	export default{
		data(){
			return{
				str:"",
				show:false,
				currentindex:-1,
				user:"",
				projectlist:[],
				isedit:false,
				type:"file",
				content:[
					{iconPath:"/static/images/edit.png",text:"编辑"},
					{iconPath:"/static/images/add.png",text:"添加"},
				],
			}
		},
		onLoad(option) {
			if(option){
				let str = JSON.stringify(option);
				if(str.length>4){
					this.str = str;
					//console.log("programoption",str);
				}
			}
			this.init();
		},
		onShow() {
			if(this.currentindex >= 0 ){
				if(this.projectlist.length <= this.currentindex){
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
		methods:{
			async init(){
				this.isedit = false;
				//console.log(1)
				this.user = this.$store.getters.loginUser;
				//console.log(2,this.user);
				if(!this.user){
					return;
				}
				//console.log(2)
				//this.show =false;
				//查出所有的记录
				await this.findAll();
				this.show =true;
			}, 
			itemMove(list,item,value){
				let index = list.indexOf(item);
				let tem =list[index];
				let tem2 =list[index+value];
				list.splice(index,1,tem2);
				list.splice(index+value,1,tem);
			},
			async updateIndex(currentindex){
				let id = this.projectlist[currentindex].id;
				let project =await projectApi.findById(id);
				if(project){
					 this.projectlist.splice(currentindex,1,project);
				}
				this.computedImageUrl();
			},
			
			gotoProjectDetails(index,project){
				//console.log(2);
				this.currentindex = index;
				this.$mRouter.navigateTo("projectDeails",{projectid:project.id});
			},
			computedImageUrl(){
				if(this.projectlist.length > 0){
					for(let project of this.projectlist){
						if(project.imageurl){
							project.baseimageurl = this.$Api.imgpriewurl+project.imageurl;
						}
					
					}
				}
				
			},
			async findAll(){
				let user = this.user;
				if(this.projectlist.length > 0){
					this.projectlist.splice(0,this.projectlist.length);
				}
				let projectlist =await projectApi.findByUseridAndType(user.id,this.type);
				this.projectlist.push(...projectlist)
				this.computedImageUrl();
				//console.log(111,this.projectlist);
			},
			gotoProgramLog(index,project){
				//console.log(1);
				this.currentindex = index;
				this.$mRouter.navigateTo("programLogList",{projectid:project.id,projectname:project.name});
			},
			trigger(item){
				switch(item.index){
					case 0:
						this.isedit = !this.isedit;
						break;
					case 1:
						this.addProject();
						break;
				}
			},
			addProject(){
				this.$mRouter.navigateTo("projectDeails",{type:this.type});
				this.currentindex = this.projectlist.length;
			},
			//保存编辑
			async editOk(){
				let list = this.projectlist;
				for (var i = 0; i < list.length; i++) {
					list[i].seq = i;
				}
				await  projectApi.update(list);
				uni.showToast({
					title:"保存成功"
				});
				this.isedit =false;
			},
		}
	}
</script>

<style lang="scss">
	.projectlist{
		padding: 20rpx 10rpx 100rpx 10rpx;
		.ing{
			font-size: $uni-font-size-max;
			color: #DD514C;
		}
		.listitem{
			margin-bottom: 20rpx;
			padding: 20rpx;
		}
		.item{
			margin-bottom: 10rpx;
			.projectname{
				font-weight: 600;
				font-size: $uni-font-size-lg2;
			}
		}
		.label{
			color: #999999;
		}
		 .row{
			 align-items: center;
		 }
		 .logimage{
			 width: 160rpx;
			 height: 160rpx;
			 border-radius: 8rpx;
			 margin-right: 20rpx;
		 }
		 .right{
			  width: calc(750rpx - 160rpx);
		 }
	}
</style>
