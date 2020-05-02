<template>
  <b-container><b-row>
    <ProfileEditor
      :profProps="profileEditorProps"
      :dpi="dpi"
      :rename="rename"
      :converting="converting" @update="onConvertingUpdate"
    />
    <div v-if="converting">
      <ConversionEditor
        :convProps="conversionEditorProps"
        :dpi="dpi"
      />
    </div>
  </b-row></b-container>
  
</template>

<script>
import ProfileEditor from './ProfileEditor.vue'
import ConversionEditor from './ConversionEditor.vue'

export default {
  name: 'SensitivitySettings',
    
  components: {
    ProfileEditor,
    ConversionEditor
  },

  data() {
    return {
      profileEditorProps: {
        profile: 0,
        profiles: [
          { value: 0, text: "Profile 1" },
          { value: 1, text: "My Profile 2" },
          { value: 2, text: "My Profile 3" }
        ],
        type: 1,
        types: [
          { value: 0, text: "Distance(cm) per 360" },
          { value: 1, text: "Aiming.pro" },
        ],
        sens: 0.6138,
        fov: 103,
        fovType: 'h',
      },

      conversionEditorProps: {
        method: 1,
        methods: [
          { value: 0, text: "360 Distance" },
          { value: 1, text: "Monitor Distance" }
        ],
        coefficient: 0,
        type: 0,
        types: [
          { value: 0, text: 'Valorant' },
        ],
        sens: 1.0,
        fov: 100,
        fovType: 'h',
      },

			dpi: 800,
      rename: '',
      converting: true,
    }
  },

  methods: {
    fetchProfiles() {
      return fetch('https://aiming.pro/api/v1/user/sensitivity/', { mode: 'no-cors' })
        .then(response => console.log(response))
    },

    onConvertingUpdate() {
      this.converting = !this.converting
    }
  },

  mounted() {
    this.fetchProfiles().then(data => {
      console.log(data)
      //this.profiles = data
    })
  }
}
</script>