function roundToPrecision(x, precision) {
  let y = +x + (precision === undefined ? 0.5 : precision/2);
  return y - (y % (precision === undefined ? 1 : +precision));
}

function getCoef(game) {
  if (game == "Aiming.pro") {
    return 360 / (1000 * 2 * Math.PI)
  }
  else if (game == "Valorant") {
    return 0.07
  }
  else if (game == "CS:GO") {
    return 0.022
  }
}

function sensFromRest(cm, dpi, type) {
  return roundToPrecision(2.54 * 360 / (cm * dpi * getCoef(type)), 0.0001)
}

function cmFromRest(sens, dpi, type) {
  return roundToPrecision(2.54 * 360 / (sens * dpi * getCoef(type)), 0.01)
}

export { sensFromRest, cmFromRest}