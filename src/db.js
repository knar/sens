const url = 'http://localhost:3000/'

export function fetchProfiles() {
  return fetch(url + 'sensitivity')
    .then(r => r.json())
    .then(profiles => profiles.map(p => ({
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
    })))
}
/**
function createProfile(id) {

}

function editProfile(id) {

}

function deleteProfile(id) {

}
*/
export function fetchActiveProfileId() {
  return fetch(url + 'settings/sensitivity/profile')
    .then(r => r.json())
    .then(profile => profile.id)
}

/**
function setActiveProfileId() {

}
*/

export function fetchUnits() {
  return fetch(url + 'settings/sensitivity/units')
    .then(r => r.json())
    .then(units => units.unit)
}

/**
function setUnits() {

}
 */