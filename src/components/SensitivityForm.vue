<template>
  <div>
    <!-- Game Type Dropdown-->
    <b-row>
      <b-col class="mt-1">
        <b-form-group
          label-size="sm"
          label="Type"
        >
          <b-form-select
            v-model="settings.type"
            :options="sensTypes"
            @change="onSensTypeChange"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="mt-1">
        <!-- FoV Type-->
        <b-form-group
          label-size="sm"
          label="FoV Type"
        >
          <b-form-select
            v-model="settings.fov_type"
            :options="fovTypes"
            @change="onFovTypeChange"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col class="mt-1">
        <!-- Field of View -->
        <b-form-group
          label-size="sm"
          label="Field of View"
        >
          <b-form-input
            v-model="fov"
            type="number"
            min="1"
            max="180"
            step="0.01"
            @change="onFovChange"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="fovTypeNeedsRes">
      <b-col class="mt-1">
        <!-- Resolution Width -->
        <b-form-group
          label-size="sm"
          label="Resolution Width"
        >
          <b-form-input
            v-model="resWidth"
            type="number"
            min="1"
            max="3840"
            step="1"
            @change="onResWidthChange"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="mt-1">
        <!-- Resolution Height -->
        <b-form-group
          label-size="sm"
          label="Resolution Height"
        >
          <b-form-input
            v-model="resHeight"
            type="number"
            min="1"
            max="2160"
            step="1"
            @change="onResHeightChange"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="mt-1">
        <!-- Zoom Sens -->
        <b-form-group
          label-size="sm"
          label="Zoom Multiplier"
        >
          <b-form-input
            v-model="settings.fov_h"
            type="number"
            min="5"
            max="160"
            step="0.01"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="mt-1">
        <!-- Sensitivity -->
        <b-form-group
          label-size="sm"
          label="Sensitivity"
        >
          <b-form-input
            v-model="settings.sens"
            type="number"
            min="0"
            max="10"
            step="0.001"
            @change="onSensChange"
            :disabled="mode==='receive'"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="showAdvanced">
      <b-col class="mt-1">
        <!-- DPI Controls -->
        <b-form-group
          label-size="sm"
          label="DPI"
        >
          <b-form-input
            v-model="settings.dpi"
            type="number"
            min="100"
            max="6400"
            step="50"
            @change="onDpiChange"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="mt-1">
        <!-- Cm per 360 Controls-->
        <b-form-group
          label-size="sm"
          label="Cm per 360"
        >
          <b-form-input
            v-model="settings.cm_per_360"
            type="number"
            min="1"
            max="999"
            step="0.01"
            @change="onCmChange"
            :disabled="mode==='receive'"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  getSensTypes,
  getFovTypes,
  fovTypesToHorz,
  horzFovToTypes,
  sensFromRest,
  cmFromRest,
  sensPrecision,
  fovPrecision,
  cmPrecision,
  round
} from '../sensUtil.js'
import { fetchUnits } from '../db.js'

export default {
  name: "SensitivityForm",
  props: ["settings", "showAdvanced", "mode"],

  data() {
    return {
      sensTypes: [],
      fovTypes: [],
      fovType: "Horizontal",
      fov: 103,
      resWidth: 1920,
      resHeight: 1080,
      units: ""
    }
  },

  async mounted() {
    this.sensTypes = getSensTypes()
    this.fovTypes = getFovTypes()
    this.units = await fetchUnits()
  },

  computed: {
    fovTypeNeedsRes() {
      return this.settings.fov_type != "Horizontal"
    },
  },

  watch: {
    settings: function() {
      this.setFovFromHFov()
    }
  },

  methods: {
    onSensTypeChange() {
      this.refreshSens()
    },

    
    onFovTypeChange() {
      this.setFovFromHFov()
    },

    onFovChange() {
      this.updateHFov()
    },

    onResWidthChange() {
      this.updateHFov()
    },

    onResHeightChange()  {
      this.updateHFov()
    },

    onSensChange() {
      this.settings.cm_per_360 = round(cmFromRest(this.settings), cmPrecision)
    },

    onDpiChange() {
      this.refreshSens()
    },

    onCmChange() {
      this.refreshSens()
    },

    refreshSens() {
      this.settings.sens = round(sensFromRest(this.settings), sensPrecision)
    },

    setFovFromHFov() {
      this.fov = round(horzFovToTypes()[this.settings.fov_type](
        this.settings.fov_h,
        this.resWidth,
        this.resHeight
      ), fovPrecision)
    },

    updateHFov() {
      this.settings.fov_h = round(fovTypesToHorz()[this.settings.fov_type](
        this.fov,
        this.resWidth,
        this.resHeight
      ), fovPrecision)

      if (this.mode === 'receive') {
        this.$emit('updatedFov')
      }
    }
  }
}
</script>
