<template>
  <div>
     <!-- Conversion Method Dropdown-->
    <b-row>
      <b-col class="mt-1">
        <b-form-group
          label-size="sm"
          label="Conversion Method"
        >
          <b-form-select
            v-model="method"
            :options="methods"
            @change="recalcSens"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- TODO: Add fields for monitor aspect ratio, monitor match percentage -->

    <SensitivityForm
      :settings="convertedSettings"
      :showAdvanced="showAdvanced"
      :mode="'receive'"
      @updatedFov="recalcSens"
    />

    <b-row>
      <b-col class="mt-1">
         <div class="float-right">
            <b-button @click="onSaveAsNewProfile">
              <i class="fas fa-save"></i> Save As New Profile
            </b-button>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import { getMatchMethods, cmFromMethod, sensFromRest, sensPrecision, cmPrecision, round } from '../sensUtil.js'
import SensitivityForm from './SensitivityForm.vue'

export default {
  name: "ConversionForm",
  props: ["baseSettings", "showAdvanced"],
  components: { SensitivityForm },

  data() {
    return {
      method: "",
      methods: [],
      convertedSettings: {
        type: "Aiming.pro",
        sens: 0.5,
        fov_h: 103,
        fov_type: "Horizontal",
        cm_per_360: 40,
        dpi: 800
      }
    }
  },

  mounted() {
    this.methods = getMatchMethods()
    this.method = this.methods[0]
  },

  methods: {
    recalcSens() {
      this.convertedSettings.cm_per_360 = cmFromMethod(this.method, 0.5, this.baseSettings, this.convertedSettings)
      this.convertedSettings.sens = round(sensFromRest(this.convertedSettings), sensPrecision)
      this.convertedSettings.cm_per_360 = round(this.convertedSettings.cm_per_360, cmPrecision)
    },

    onSaveAsNewProfile() {
      this.$emit('saveAsNewProfile', this.convertedSettings)
    }
  }
}
</script>