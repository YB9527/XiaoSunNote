<template>
	<text class="link" @click="goto">
		<slot></slot>
	</text>
</template>

<script>
	export default {
		props:{
			type:{
				type:String,
				default:"navigateTo",
			},
			text:String,
			data:{},
		},
		methods: {
			goto() {
				
				this.$mRouter[this.type](this.data);
			}
		},
		
	}
</script>

<style lang="scss">
	.link{
		color: $uni-color-primary;
	}
</style>
