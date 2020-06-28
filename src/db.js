const url = 'http://localhost:3000/'

export function packProfile(p) {
  return {
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
  }
}

function unpackProfile(p) {
  return {
    id: p.id,
    name: p.name,
    type: p.settings.type,
    sens: p.settings.sens,
    fov_h: p.settings.fov_h,
    fov_type: p.settings.fov_type,
    dpi: p.settings.dpi,
    cm_per_360: p.settings.cm_per_360
  }
}

export function fetchProfiles() {
  return fetch(url + 'sensitivity')
    .then(r => r.json())
    .then(profiles => profiles.map(packProfile))
}

export function createProfile(profile) {
  return fetch(
    //url + 'sensitivity/' + profile.id,
    url + 'sensitivity/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(unpackProfile(profile))
    }
  )
  .then(r => r.json())
}

export function editProfile(profile) {
  return fetch(
    url + 'sensitivity/' + profile.id,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(unpackProfile(profile))
    }
  )
}

export function deleteProfile(id) {
  return fetch(
    url + 'sensitivity/' + id,
    {
      method: 'DELETE',
    }
  )
}

export function fetchActiveProfileId() {
  return fetch(url + 'settings/sensitivity/profile')
    .then(r => r.json())
    .then(profile => profile.id)
}

export function setActiveProfileId(id) {
  return fetch(
    url + 'settings/sensitivity/profile',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": id })
    }
  )
}

export function fetchUnits() {
  return fetch(url + 'settings/sensitivity/units')
    .then(r => r.json())
    .then(units => units.unit)
}