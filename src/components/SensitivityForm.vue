<template>
  <div>
    <!-- Game Type Dropdown-->
    <b-form-group
      class="mt-4"
      label-size="sm"
      label="Sensitivity Type"
    >
      <b-form-select
        v-model="settings.type"
        :options="typeOptions"
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
      <b-col>
        <!-- Sensitivity Controls-->
        <b-form-group
          class="mt-1"
          label-size="sm"
          label="Sensitivity"
        >
          <b-form-input
            v-model="settings.sens"
            type="number"
            min="0.0001"
            max="10"
            step="0.01"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <!-- DPI Controls -->
        <b-form-group
          class="mt-1"
          label-size="sm"
          label="DPI"
        >
          <b-form-input
            v-model="settings.dpi"
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
              v-model="settings.cm_per_360"
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
  </div>
</template>

<script>
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
      return this.types.map(t => ({ value: t.name, text: t.name }))
    },
  },

  methods: {
    onTypeChange() {},
    onFovChange() {},
    onSensChange() {},
    onDpiChange() {},
    onCmChange() {},

    fetchGameVars() {
      return [
        {
          name: "Aiming.pro",
          m_yaw: 360 / (1000 * 2 * Math.PI),
        },
        {
          name: "Valorant",
          m_yaw: 0.07,
        },
        {
          name: "CS:GO",
          m_yaw: 0.022,
        }
      ]
    }
  },

  mounted() {
    this.types = this.fetchGameVars()
  }
}
</script>
