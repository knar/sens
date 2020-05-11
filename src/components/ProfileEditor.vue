<template>
  <b-container>
    <b-row>
      <b-card class="mt-3 mr-3">
        <b-row>
          <b-col>
            <h3>Profile</h3>
          </b-col>
          <b-col cols="8">
            <div class="float-right">
              <!-- New Profile Button -->
              <b-button
                variant="primary"
                v-b-tooltip.hover
                title="New Profile"
                @click="onNewProfile"
              >
                <i class="fas fa-plus-circle"></i>
              </b-button>

              <!-- Set Active Profile Button -->
              <b-button
                class="ml-2"
                variant="success"
                :disabled="isSelectedProfileActive"
                @click="onProfileChoose"
              >
                <i class="fas fa-check-circle"></i>
              </b-button>
            </div>
          </b-col>
        </b-row>
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
              variant="warning" 
              v-b-tooltip.hover
              title="Edit Profile Name"
              @click="onEditProfileName"
            >
              <i class="fas fa-pencil-alt"></i>
            </b-button>

            <!-- Delete Profile Button -->
            <b-button
              variant="danger"
              v-b-tooltip.hover
              title="Delete Profile"
              v-b-modal.delete-profile-modal
            >
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

            <b-button
              variant="success"
              v-b-tooltip.hover
              title="Save Profile"
              @click="onProfileSave"
            >
              <i class="fas fa-save"></i>
            </b-button>
          </b-input-group-append>
        </b-input-group>

        <SensitivityForm
          :settings="selectedProfile.settings"
          :allowConvert=true
        />

        <b-button-toolbar class="mt-2">
          <b-button-group>
            <b-button
              variant="primary"
              @click="onConvert"
            >
              <i class="fas fa-exchange-alt"></i> Convert
            </b-button>
          </b-button-group>
        </b-button-toolbar>

      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import SensitivityForm from './SensitivityForm.vue'

export default {
  name: "ProfileEditor",

  components: {
    SensitivityForm
  },

  data() {
    return {
      activeProfile: {
        id: -1,
        name: "",
        settings: {
          type: "Aiming.pro",
          sens: 0.5,
          fov_h: 103,
          fov_type: "h",
          cm_per_360: 40,
          dpi: 800
        }
      },
      selectedProfile: {
        id: -1,
        name: "",
        settings: {
          type: "Aiming.pro",
          sens: 0.5,
          fov_h: 103,
          fov_type: "h",
          cm_per_360: 40,
          dpi: 800
        }
      },
      profiles: [],
      unitPref: "",
      profileNameEditing: false,
      converting: false
    };
  },

  computed: {
    isSelectedProfileActive() {
      return this.activeProfile === this.selectedProfile
    },
    profileOptions() {
      // TODO: highlight active profile in some way
      return this.profiles.map(p => {
        if (p == this.activeProfile) {
          return { value: p, text: p.name + ' - Active'}
        }
        return { value: p, text: p.name }
      });
    },
  },

  methods: {
    onProfileNameChange() {
      this.profileNameEditing = false;
      // TODO: api call to overwrite selected profile
    },

    onProfileDelete() {
      this.profiles = this.profiles.filter(p => p != this.selectedProfile)

      if (this.profiles.length == 0) {
        this.addNewProfile("Default")
      }

      this.selectedProfile = this.profiles[0]
      // TODO: api call to delete selected profile

      if (!this.getProfile(this.activeProfile.id)) {
        this.activeProfile = this.selectedProfile
        // TODO: api call to set new active profile if needed
      }
    },

    onProfileSave() {
      // TODO: api call to overwrite selected profile
    },

    onProfileChoose() {
      this.activeProfile = this.selectedProfile
      // TODO: api call to overwrite active profile id with selected's
    },

    onNewProfile() {
      this.selectedProfile = this.addNewProfile("New")
      // TODO: api call to add new profile
    },

    nextAvailableId() {
      const ids = this.profiles.map(p => p.id)
      ids.sort()

      for (let id = 0; id < ids.length; id++) {
        if (ids[id] != id)
          return id
      }
      return ids.length
    },

    onEditProfileName() {
      this.profileNameEditing = !this.profileNameEditing;
    },

    onConvert() {
      this.$emit("update", this.converting);
    },

    addNewProfile(name) {
      const profile = {
        id: this.nextAvailableId(),
        name: name,
        settings: {
          type: "Aiming.pro",
          sens: 0.5,
          fov_h: 103,
          fov_type: "h",
          cm_per_360: 40,
          dpi: 800
        }
      }
      this.profiles.push(profile)
      return profile
    },

    getProfile(id) {
      return this.profiles.find(p => (p.id == id))
    },

    // Dummy data to simulate inital API GETs
    // TODO: actual API calls, put these in another file
    fetchActiveProfileId() {
      return 0
    },
    fetchProfiles() {
      return [
        {
          "id":0,
          "name": "my valorant sens",
          "type": "Valorant",
          "sens": 0.502,
          "fov_type": "h",
          "fov_h": 103,
          "cm_per_360": 32.5,
          "dpi": 800,
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
      ]
    },
    fetchUnitPref() {
      return { "unit": "cm" }
    },
  },

  mounted() {
    // These will all use API calls later
    this.profiles = this.fetchProfiles().map(p => ({
      id: p.id,
      name: p.name,
      settings: {
        type: p.type,
        sens: p.sens,
        fov_h: p.fov_h,
        fov_type: p.fov_type,
        dpi: p.dpi,
        cm_per_360: p.cm_per_360
      }
    }))

    this.activeProfile = this.getProfile(this.fetchActiveProfileId())

    this.selectedProfile = this.activeProfile

    this.unitPref = this.fetchUnitPref()
  }
};
</script>

<style scoped>
</style>