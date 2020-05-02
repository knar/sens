<template>
	<div id="app">
		<SensitivitySettings/>
	</div>
</template>

<script>
import SensitivitySettings from './components/SensitivitySettings.vue'

export default {
	name: 'App',

	components: {
		SensitivitySettings,
	}
}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #222;
	}
</style>
