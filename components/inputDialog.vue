<template>

		<uni-popup v-if="popshow" ref="popup" type="dialog" :animation="false" >
		   <uni-popup-dialog 
		   :title="dialog.title" 
		   :placeholder="dialog.placeholder"
			@confirm="confirm"  
			@close="close"
			:mode="dialog.model?dialog.model:'input'"   
			:value="dialog.value"></uni-popup-dialog>
		</uni-popup>
	
	
</template>

<script> 
	export default{
		props:{
			dialog:{
				placeholder:"",
				title:"",
				content:"",
				value:"",
				model:"",
			}
		},
		data(){
			return {
				popshow:false,
			}
		},
		created() {
			
			
		},
	
		methods:{
			test(){
				setTimeout(()=>{
					console.log(this.dialog.show);
					this.test();
				},1000);
			},
			open(){
				if(this.popshow){
					this.$refs.popup.open();
				}else{
					this.popshow = true;
					setTimeout(()=>{
						this.$refs.popup.open();
					},100);
				}
			},
			confirm(value){
				this.$emit("confirm",value);
			},
			close(){
			}
		}
	}
</script>

<style>
</style>
