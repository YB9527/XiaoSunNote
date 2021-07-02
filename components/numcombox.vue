<template>
	<view  class="countset">
		<view class="menu-add"  v-if="data[prop]">
			<image v-show="data[prop] !== min" mode="aspectFill" @click="setCount(data,-1)" src="/static/images/subtract.png">
		</view>
		
		<input v-if="unit == 0 &&  data[prop]" class="input" @input="change" v-model="data[prop]" type="number" />
		<text v-else-if="data[prop]"> {{data[prop]}}</text>
		<view class="menu-add">
			<image mode="aspectFill" @click="setCount(data,1)" src="/static/images/icon_add.png">
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{},
			prop:"",
			step:{
				default:1
			},
			min:{
				default:0,
			},
			unit:{
				default:"1",//int
			}
		},
		created() {
			//console.log(this.unit);
		},
		methods:{
			setCount(data,value){
				
				data[this.prop] = data[this.prop]*1 +value*1;
				if(data[this.prop] < this.min ){
					data[this.prop] = this.min;
				}
				this.$emit("change",data);
			},
			change(val){
				//console.log(val);
				let data = this.data;
				val = data[this.prop]*1;
				data[this.prop] =val.toFixed(1)*1;
				//data[this.prop] = val*1;
				this.$emit("change",data);
				//console.log(11,this.data[this.prop]);
			}
		}
	}
</script>

<style lang="scss">
	.countset{
		width: 100%;
		display: flex;
		justify-content: space-between;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		.input {
			
			border-bottom: 1px solid #333333;
		}
	}
</style>
