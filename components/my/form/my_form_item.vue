<template>
	<view >
			<view  :class="column.class" >
				<view class="label" ><text> {{column.text}} </text></view>
				<view class="value">
					<text v-if="column.type === 'text'" >{{data[column.prop] | textfileter(column.optionmap)}}</text>
					<input
						@blur="childCheck(column)"
						v-if="column.type === 'input'" type="text"  v-model="data[column.prop]"   :placeholder="column.placeholder"/>
					<input
						@blur="childCheck(column)"
						v-if="column.type === 'number'" type="number"  v-model="data[column.prop]"   :placeholder="column.placeholder"/>
					<input
						@blur="childCheck(column)"
						v-else-if="column.type === 'idcard'" type="idcard"    v-model="data[column.prop]"  :placeholder="column.placeholder"/>
					<input
						@blur="childCheck(column)"
						v-else-if="column.type === 'tel'"  type="tel"  v-model="data[column.prop]"  :placeholder="column.placeholder" />
					<input
						@blur="childCheck(column)"
						v-else-if="column.type === 'digit'"  type="digit"  v-model="data[column.prop]"  :placeholder="column.placeholder" />
					<view 
						@blur="childCheck(column)"
						v-else-if="column.type === 'textarea'" >
						  <textarea  
							@blur="childCheck(column)"
							:disabled="column.disabled"
						    v-model="data[column.prop]" 
						    :placeholder="column.placeholder"/>
					</view>
					<radio-group   v-else-if="column.type === 'radio'" @change="radioChange($event,data,column.prop,column)">
						<label class="gender-item" v-for="(radio,j) in column.options" :key=j>
							<radio color="var(--primary)" :checked="data[column.prop] == radio.value" class="gender-item-radio"  :value="radio.value" />
							<text class="gender-item-text">{{radio.text }}</text>
						</label>
					</radio-group>
					<uni-datetime-picker
						v-else-if="column.type === 'date'"
						class="datepicker"
						:disabled="column.disabled"
						type="date" v-model="data[column.prop]">
					</uni-datetime-picker>
					<uni-data-picker 
						:isshow="true"
						v-else-if="column.type === 'datapicker' 
							|| column.type === 'cascader' 
							|| column.type === 'select'"
						:placeholder="column.placeholder" 
						v-model="data[column.prop]"
						:popup-title="column.placeholder" 
						:localdata="column.options"
						:step-searh="true" self-field="code" parent-field="parent_code"
						:textFilter = "column.textFilter"
						@change="onchange($event,column)" 
						@nodeclick="onNodeClick($event,data,column.prop,column)">
					</uni-data-picker>
					<div v-else-if="column.type === 'fj'">
						<!-- <webUploadFile :elupload="column.upload" :idname="column.name"></webUploadFile> -->
						<myUploadFile  :uploadAttr="column.upload" ></myUploadFile>
					</div>
				</view>
			</view>
			<view :class="column.class" class="error" v-if="column.error">
				<view class="label"></view>
				<view class="value">
					<text>*{{column.error}}</text>
				</view>
				
			</view>
								
		</view>
		
	
</template>

<script>
	export default {
		props:{
			column:{},
			data:{},
		},
		filters:{
			textfileter(text,optionmap){
				
				if(optionmap && optionmap[text]){
					return optionmap[text]
				}
				return text;
			}
		},
		methods:{
			radioChange(e,data,prop,row) {
				
				 data[prop] = e.target.value
				 this.childCheck(row);
			},
			onNodeClick(node,data,prop,row){
				data[prop] = node.value;
				this.childCheck(row);
			},
			onchange(e,colum) {
				const value = e.detail.value
				if(colum.change){
					colum.change(value);
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

<style lang="scss">
	textarea{
		border: solid 2px #F1F1F1;
		width: 100%;
		
	}
	.uni-textarea-placeholder{
		font-size: 26rpx;
		color: #dc9f9f;
	}
	.flexrow{
		display: flex;
		view{
			margin-right: 20rpx;
		}
		
	}
	.gender-item{
		margin-right: 60rpx;
	}
	.wraprow{
		.value{
			width: 100%;
		}
	}
	.row{
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: solid 2px #F1F1F1;
		.value{
			
			width: 520rpx;
			uni-input{
				font-size: 34rpx ;
			}
			::v--deep .selected-item{
				font-size: 34rpx !important;
			}
		}
	}
	.label{
		width: 220rpx;
		font-size:  $uni-font-size-label;
		flex-wrap: wrap;
	}
	.error{
		margin-top: -20rpx;
		height: 50rpx;
		color: var(--danger);
	}
	
	
	.uni-data-tree-input{
		::v--deep .input-value-border {
		    border: 0px solid #e5e5e5!important;
		    border-radius: 5px;
		}
	}
	uni-radio-group{
		display: flex;
		justify-content: space-between;
		.gender-item-radio{
			margin-right: 10rpx;
		}
		
	}
	
		
	input{
		
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	
	
	.aroundrow{
		display: flex;
		justify-content: space-around;
		
	}
</style>
