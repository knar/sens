<template>
  <b-container>
    <b-row>
      <ProfileEditor
        :activeProfileId="profileId"
        :profiles="profiles"
        :types="types"
        :converting="converting"
        @update="onConvertingUpdate"
      />
      <div v-if="converting">
        <ConversionEditor :convProps="conversionEditorProps" :dpi="dpi" />
      </div>
    </b-row>
  </b-container>
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
      profileId: 0,
      profiles: [
        {
          "id":0,
          "name": "my valorant sens",
          "type": "Valorant",
          "sens": 0.5,
          "fov_type": "h",
          "fov_h": 103,
          "cm_per_360": 32,
          "dpi": 400,
        },
        {
          "id": 1,
          "name": "my CS:GO sens",
          "type": "CS:GO",
          "sens": 0.7,
          "fov_h": 106,
          "fov_type": "h",
          "dpi": 400,
          "cm_per_360": 28
        },
        {
          "id": 2,
          "name": "my Fortnite sens",
          "type": "Fortnite",
          "sens": 11.7,
          "fov_h": 80,
          "fov_type": "h",
          "dpi": 400, 
          "cm_per_360": 16
        }
      ],

      types: [
        "Valorant",
        "CS:GO",
        "Fortnite",
      ],

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

      converting: false,
    }
  },

  methods: {
    fetchProfiles() {
      return fetch('https://aiming.pro/api/v1/user/sensitivity/', { mode: 'no-cors' })
        .then(console.log)
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