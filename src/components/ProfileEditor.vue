<template>
  <b-card class="mt-3 mr-3">
    <b-container>

      <b-row>
        <b-col>
          <h3>Profile</h3>
        </b-col>
        <b-col cols="8">
          <div class="float-right">
            <!-- New Profile Button -->
            <b-button
              size="sm"
              variant="primary"
              v-b-tooltip.hover
              title="New Profile"
            >
              <i class="fas fa-plus-circle"></i> New
            </b-button>

            <!-- Set Active Profile Button -->
            <b-button
              class="ml-2"
              size="sm"
              variant="success"
            >
              <i class="fas fa-check-circle"></i> Choose
            </b-button>
          </div>
        </b-col>

      </b-row>

      <b-input-group class="mt-1">
        <!-- Profile Dropdown -->
        <b-form-input
          v-if="profileNameEditing"
          :value="selectedProfile.name"
          @change="onProfileNameChange"
          @blur="onProfileNameChange"
        ></b-form-input>

        <!-- Selected Profile Name Editor -->
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
          >
            <i class="fas fa-trash-alt"></i>
          </b-button>

          <!-- Save Profile Button -->
          <b-button
            variant="success"
            v-b-tooltip.hover
            title="Save Profile"
          >
            <i class="fas fa-save"></i>
          </b-button>


        </b-input-group-append>
      </b-input-group>

      <!-- Game Type Dropdown-->
      <b-form-group
        class="mt-4"
        label-size="sm"
        label="Sensitivity Type"
      >
        <b-form-select
          v-model="selectedProfile.type"
          :options="types"
        ></b-form-select>
      </b-form-group>

      <b-row>
        <b-col>
          <!-- Field of View Controls-->
          <b-form-group
            class="mt-1"
            label-size="sm"
            label="Field of View"
          >
            <b-input-group>
              <b-form-input
                v-model="selectedProfile.fov_h"
                type="number"
                min="5"
                max="160"
                step="0.01"
              ></b-form-input>
              <b-input-group-append is-text>
                <b-form-checkbox switch class="mr-n2">
                  <span class="sr-only"></span>
                </b-form-checkbox>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col>
          <!-- Sensitivity Controls-->
          <b-form-group
            class="mt-1"
            label-size="sm"
            label="Sensitivity"
          >
            <b-form-input
              v-model="selectedProfile.sens"
              type="number"
              min="0.0001"
              max="10"
              step="0.01"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="advanced">
        <b-col>
          <!-- DPI Controls -->
          <b-form-group
            class="mt-1"
            label-size="sm"
            label="DPI"
          >
            <b-form-input
              v-model="selectedProfile.dpi"
              type="number"
              min="100"
              max="6400"
              step="50"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <!-- Cm per 360 Controls-->
          <b-form-group
            class="mt-1"
            label-size="sm"
            label="Cm per 360"
          >
            <b-input-group>
              <b-form-input
                v-model="selectedProfile.cm_per_360"
                type="number"
                min="5"
                max="160"
                step="1"
              ></b-form-input>
              <b-input-group-append is-text>
                <b-form-checkbox switch class="mr-n2">
                  <span class="sr-only"></span>
                </b-form-checkbox>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button-toolbar class="mt-2">
        <b-button-group class="mr-3">
          <b-button @click="advanced = !advanced">
            <i class="fas fa-head-side-brain"></i>{{ advanced ? 'Simple' : 'Advanced'}}
          </b-button>
        </b-button-group>
        <b-button-group>
          <b-button
            variant="primary"
            @click="toggleConverting"
            v-b-tooltip.hover
            :title="convertButtonToolTip"
          >
            <i class="fas fa-exchange-alt"></i>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-container>
  </b-card>
</template>

<script>
export default {
  name: "ProfileEditor",

  props: ["activeProfileId", "profiles", "types", "converting"],

  data() {
    return {
      selectedProfile: this.profiles.find(p => p.id == this.activeProfileId),
      profileNameEditing: false,
      advanced: false
    };
  },

  computed: {
    profileOptions() {
      return this.profiles.map(p => ({ value: p, text: p.name }));
    },

    convertButtonToolTip() {
      return this.converting ? "Stop Converting" : "Convert";
    }
  },

  methods: {
    onEditProfileName() {
      this.profileNameEditing = !this.profileNameEditing;
    },
    onProfileNameChange() {
      this.profileNameEditing = false;
    },
    toggleConverting() {
      this.$emit("update", this.converting);
    }
  }
};
</script>

<style scoped>
</style>