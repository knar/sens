<template>
  <b-container>
    <b-row>
      <b-card class="mt-3 mr-3 card">
        <div class="profile-toolbar float-right">
          <b-button-group class="mx-1">
            <!-- Set Active Hipfire Profile Button -->
            <b-button
              :disabled="isSelectedProfileActiveHipfire"
              @click="onChooseHipfireProfile"
            >
              Hipfire
            </b-button>

            <!-- Set Active ADS Profile Button -->
            <b-button
              :disabled="isSelectedProfileActiveADS"
              @click="onChooseADSProfile"
            >
              ADS
            </b-button>
          </b-button-group>
          <b-button-group>
            <!-- New Profile Button -->
            <b-button @click="onNewProfile">
              <i class="fas fa-plus-circle"></i>
            </b-button>

            <!-- Delete Profile Button -->
            <b-button v-b-modal.delete-profile-modal>
              <i class="fas fa-trash-alt"></i>
            </b-button>

            <!-- Delete Modal -->
            <b-modal
              id="delete-profile-modal"
              ok-variant="danger"
              ok-title="Delete"
              title="Deleting a Profile"
              @ok="onProfileDelete"
            >
              Are you sure you want to delete "{{ selectedProfile.name }}"?
            </b-modal>

            <!-- Save Profile Button -->
            <b-button
              @click="onProfileSave"
            >
              <i class="fas fa-save"></i>
            </b-button>
          </b-button-group>
        </div>

        <b-form-group
          label-size="lg"
          label="Selected Profile"
        >
          <b-input-group>
            <!-- Selected Profile Name Editor -->
            <b-form-input
              v-if="profileNameEditing"
              v-model="selectedProfile.name"
              @change="onProfileNameChange"
              @blur="onProfileNameChange"
              autofocus
            ></b-form-input>

            <!-- Profile Dropdown -->
            <b-form-select v-else v-model="selectedProfile" :options="profileOptions"></b-form-select>

            <b-input-group-append>
              <!-- Edit Profile Name Button -->
              <b-button
                @click="onEditProfileName"
              >
                <i class="fas fa-pencil-alt"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <SensitivityForm
          :settings="selectedProfile.settings"
          :showAdvanced="showAdvanced"
        />

        <b-row>
          <b-col>
            <div class="float-right">
              <b-button @click="onAdvanced">
                <i class="fas fa-brain"></i> {{ showAdvanced ? 'Simple' : 'Advanced' }}
              </b-button>

              <b-button class="ml-1"
                @click="onConvert"
              >
                <i class="fas fa-exchange-alt"></i> Convert
              </b-button>
            </div>
          </b-col>
        </b-row>

      </b-card>

      <b-card v-if="converting" class="mt-3 card">
        <ConversionForm
          :baseSettings="selectedProfile.settings"
          :showAdvanced="showAdvanced"
          @saveAsNewProfile="saveConvertedSettings"
        />
      </b-card>

    </b-row>
  </b-container>
</template>

<script>
import * as db from '../db.js'
import SensitivityForm from './SensitivityForm.vue'
import ConversionForm from './ConversionForm.vue'

export default {
  name: "ProfileEditor",

  components: {
    SensitivityForm,
    ConversionForm,
  },

  data() {
    return {
      selectedProfile: {
        id: -1,
        name: "",
        settings: {
          type: "",
          sens: 0,
          fov_h: 0,
          fov_type: "Horizontal",
          cm_per_360: 0,
          dpi: 0
        }
      },
      activeHipfireProfile: this.selectedProfile,
      activeADSProfile: this.selectedProfile,
      profiles: [],
      profileNameEditing: false,
      showAdvanced: false,
      converting: false
    };
  },

  computed: {
    isSelectedProfileActiveHipfire() {
      return this.activeHipfireProfile === this.selectedProfile
    },

    isSelectedProfileActiveADS() {
      return this.activeADSProfile === this.selectedProfile
    },

    profileOptions() {
      return this.profiles.map(p => {
        let profileName = p.name
        if (p == this.activeHipfireProfile)
          profileName += ' - Hipfire'
        if (p == this.activeADSProfile)
          profileName += ' - ADS'
        
        return { value: p, text: profileName }
      })
    },
  },

  methods: {
    onProfileNameChange() {
      this.profileNameEditing = false;

      db.editProfile(this.selectedProfile)
    },

    onProfileDelete() {
      db.deleteProfile(this.selectedProfile.id)

      this.profiles = this.profiles.filter(p => p != this.selectedProfile)

      if (this.profiles.length == 0) {
        this.addNewProfile("Default")
      }

      this.selectedProfile = this.profiles[0]

      if (!this.getProfile(this.activeProfile.id)) {
        this.activeProfile = this.selectedProfile
        // TODO: api call to set new active profile if needed
      }
    },

    onProfileSave() {
      db.editProfile(this.selectedProfile)
    },

    onChooseHipfireProfile() {
      this.activeHipfireProfile = this.selectedProfile
      // TODO: api call to overwrite active profile id with selected's
    },

    onChooseADSProfile() {
      this.activeADSProfile = this.selectedProfile
    },

    async onNewProfile() {
      this.selectedProfile = await this.addNewProfile("New")
    },

    onEditProfileName() {
      this.profileNameEditing = !this.profileNameEditing;
    },

    onAdvanced() {
      this.showAdvanced = !this.showAdvanced
    },

    onConvert() {
      this.converting = !this.converting;
    },

    async addNewProfile(name, s) {
      let profile = {
        name: name,
        settings: (s ? s : {
          type: "Aiming.pro",
          sens: 0.5,
          fov_h: 103,
          fov_type: "Horizontal",
          cm_per_360: 39.9,
          dpi: 800
        })
      }
      profile = db.packProfile(await db.createProfile(profile))

      this.profiles.push(profile)

      return profile
    },

    getProfile(id) {
      return this.profiles.find(p => (p.id == id))
    },

    saveConvertedSettings(s) {
      this.addNewProfile(this.selectedProfile.name + " (converted)", s)
    }
  },

  async mounted() {
    this.profiles = await db.fetchProfiles()
    this.activeProfile = this.getProfile(await db.fetchActiveProfileId())
    this.selectedProfile = this.activeProfile
  }
};
</script>

<style scoped>
.profile-toolbar {
  position: absolute;
  right: 20px;
}
.card {
  width: 450px;
}
</style>
