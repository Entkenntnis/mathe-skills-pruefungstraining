export function getSectorPath(
  x: number,
  y: number,
  outerDiameter: number,
  a1: number,
  a2: number
) {
  const degtorad = Math.PI / 180
  const halfOuterDiameter = outerDiameter / 2
  const cr = halfOuterDiameter - 5
  const cx1 = Math.cos(degtorad * a2) * cr + x
  const cy1 = -Math.sin(degtorad * a2) * cr + y
  const cx2 = Math.cos(degtorad * a1) * cr + x
  const cy2 = -Math.sin(degtorad * a1) * cr + y

  return (
    'M' +
    x +
    ' ' +
    y +
    ' ' +
    cx1 +
    ' ' +
    cy1 +
    ' A' +
    cr +
    ' ' +
    cr +
    ' 0 0 1 ' +
    cx2 +
    ' ' +
    cy2 +
    'Z'
  )
}
