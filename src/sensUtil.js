export const sensPrecision = 4
export const fovPrecision = 2
export const cmPrecision = 2

export function getSensTypes() {
  return [
    "Aiming.pro",
    "Valorant",
    "CS:GO",
    "Overwatch",
    "Call of Duty"
  ]
}

function sensTypesCoef() {
  return {
    "Aiming.pro": 360 / (1000 * 2 * Math.PI),
    "Valorant": 0.07,
    "CS:GO": 0.022,
    "Overwatch": 0.0066,
    "Call of Duty": 0.0066,
  }
}

export function getMatchMethods() {
  return [
    "360 Distance Matching",
    "Focal Length Scaling",
    "Monitor Distance Matching"
  ]
}

export function getFovTypes() {
  return [
    "Horizontal",
    "Vertical",
    "Source"
  ]
}

export function fovTypesToHorz() {
  return {
    "Horizontal": (f) => f,
    "Vertical": (f, w, h) => fovAspectRatio(f, h, w),
    "Source": (f, w, h) => fovAspectRatio(f, 4*h/3, w)
  }
}

export function horzFovToTypes() {
  return {
    "Horizontal": (f) => f,
    "Vertical": (f, w, h) => fovAspectRatio(f, w, h),
    "Source": (f, w, h) => fovAspectRatio(f, w, 4*h/3)
  }
}

function fovAspectRatio(fov, a, b) {
  return Math.atan(b * Math.tan(fov*Math.PI/360) / a) * 360 / Math.PI
}

function zoomRatio(fov1, fov2) {
  return Math.tan(fov1 * Math.PI / 360) / Math.tan(fov2 * Math.PI / 360)
}

function monitorDistanceRatio(fov1, fov2, q) {
  const theta1 = Math.atan(q * Math.tan(fov1 * Math.PI / 360))
  const theta2 = Math.atan(q * Math.tan(fov2 * Math.PI / 360))
  return theta1 / theta2
}

export function cmFromMethod(method, q, base, converted) {
  const methods = getMatchMethods()
  let cm
  if (method == methods[0]) {
    cm = base.cm_per_360
  }
  else if (method == methods[1]) {
    cm = base.cm_per_360 * zoomRatio(base.fov_h, converted.fov_h)
  }
  else if (method == methods[2]) {
    cm = base.cm_per_360 * monitorDistanceRatio(base.fov_h, converted.fov_h, q)
  }
  return cm
}

export function sensFromRest(settings) {
  return 2.54 * 360 / (settings.cm_per_360 * settings.dpi * sensTypesCoef()[settings.type])
}

export function cmFromRest(settings) {
  return 2.54 * 360 / (settings.sens * settings.dpi * sensTypesCoef()[settings.type])
}

export function round(value, decimals) {
  return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}
