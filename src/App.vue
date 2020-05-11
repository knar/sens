<template>
	<div id="app">
		<ProfileEditor/>
	</div>
</template>

<script>
import ProfileEditor from './components/ProfileEditor.vue'

export default {
	name: 'App',

	components: {
		ProfileEditor,
	}
}
</script>

<style>
	#app {
		font-family: Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #222;
	}
</style>
