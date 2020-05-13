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
            :options="types"
            @change="onTypeChange"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="mt-1">
        <!-- Field of View Controls-->
        <b-form-group
          label-size="sm"
          label="Field of View"
        >
          <b-input-group>
            <b-form-input
              v-model="settings.fov_h"
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
      <b-col class="mt-1">
        <!-- Sensitivity Controls-->
        <b-form-group
          label-size="sm"
          label="Sensitivity"
        >
          <b-form-input
            v-model="settings.sens"
            type="number"
            min="0.0001"
            max="10"
            step="0.01"
            @change="onSensChange"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
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
          <b-input-group>
            <b-form-input
              v-model="settings.cm_per_360"
              type="number"
              min="5"
              max="160"
              step="1"
              @change="onCmChange"
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
  </div>
</template>

<script>
import { sensFromRest, cmFromRest } from '../sensUtil.js'

export default {
  name: "SensitivityForm",
  props: ["settings", "allowConvert"],

  data() {
    return {
      types: [],
    }
  },

  computed: {
    typeOptions() {
      return this.types.map(t => ({ value: t, text: t.name }))
    },
  },

  methods: {
    onTypeChange() {
      this.refreshSens()
    },
    onFovChange() {},
    onSensChange() {
      this.refreshCm()
    },
    onDpiChange() {
      this.refreshSens()
    },
    onCmChange() {
      this.refreshSens()
    },

    refreshSens() {
      this.settings.sens = sensFromRest(
        this.settings.cm_per_360,
        this.settings.dpi,
        this.settings.type
      )
    },
    
    refreshCm(){
      this.settings.cm_per_360 = cmFromRest(
        this.settings.sens,
        this.settings.dpi,
        this.settings.type
      )
    },

    fetchTypes() {
      return [
        "Aiming.pro",
        "Valorant",
        "CS:GO",
      ]
    }
  },

  mounted() {
    this.types = this.fetchTypes()
  }
}
</script>
