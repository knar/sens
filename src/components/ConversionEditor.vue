<template>
	<b-card class="mt-3 mr-3">
		<b-input-group prepend="Methods" class="mt-2" variant="danger">
			<b-form-select v-model="convProps.method" :options="convProps.methods"></b-form-select>
		</b-input-group>

		<b-input-group prepend="Type" class="mt-2">
			<b-form-select v-model="convProps.type" :options="convProps.types"></b-form-select>
		</b-input-group>

		<b-input-group prepend="Coefficient" class="mt-2">
			<b-form-input id="range-2" v-model="convProps.coefficient" type="range" min="0" max="1" step="0.001"></b-form-input>
			<b-input-group-append>
				<b-form-input v-model="convProps.coefficient" type="number" min="0" max="1" step="0.001"></b-form-input>
			</b-input-group-append>
		</b-input-group>

		<b-input-group prepend="Sensitivity" class="mt-2">
			<b-form-input id="range-2" v-model="convProps.sens" type="range" min="0.001" max="2" step="0.001"></b-form-input>
			<b-input-group-append>
				<b-form-input v-model="convProps.sens" type="number" min="0.001" max="2" step="0.001"></b-form-input>
			</b-input-group-append>
		</b-input-group>

		<b-input-group prepend="FoV" class="mt-2">
			<b-form-input id="range-2" v-model="convProps.fov" type="range" min="60" max="120" step="1"></b-form-input>
			<b-input-group-append>
				<b-form-input v-model="convProps.fov" type="number" min="60" max="120" step="1"></b-form-input>
			</b-input-group-append>
		</b-input-group>

		<div v-if="showMore">
			<b-input-group prepend="Cm/360" class="mt-2">
				<b-form-input id="range-2" v-model="cm" type="range" min="0.001" max="100" step="0.001"></b-form-input>
				<b-input-group-append>
					<b-form-input v-model="cm" type="number" min="0.001" max="100" step="0.001"></b-form-input>
				</b-input-group-append>
			</b-input-group>

			<b-input-group prepend="DPI" class="mt-2">
				<b-form-input id="range-2" v-model="dpi" type="range" min="100" max="3200" step="50"></b-form-input>
				<b-input-group-append>
					<b-form-input v-model="dpi" type="number" min="100" max="3200" step="50"></b-form-input>
				</b-input-group-append>
			</b-input-group>
		</div>

		<b-button-toolbar class="mt-2">
			<b-button-group class="mr-3">
				<b-button variant="success">
					<i class="far fa-save"></i>Save
				</b-button>
			</b-button-group>
			<b-button-group class="mr-3">
				<b-button @click="showMore = !showMore">
					<i class="fas fa-cogs"></i>{{ showMore ? 'Show Less' : 'Show More' }}
				</b-button>
			</b-button-group>
			<b-button-group>
				<b-button variant="primary">
					<i class="fas fa-exchange-alt"></i>Export
				</b-button>
			</b-button-group>
		</b-button-toolbar>
	</b-card>
</template>

<script>

export default {
	name: 'ConversionEditor',
	props: {
		convProps: {
			type: Object,
			required: true
		},
		dpi: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			showMore: false,
		}
	},
}
</script>