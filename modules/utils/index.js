export function stripUnit(value) {
  const unitlessValue = parseFloat(value)
  if (isNaN(unitlessValue)) return value
  return unitlessValue
}

export function em(pxValue) {
  const unitlessValue = stripUnit(pxValue)
  return `${unitlessValue / 16}em`
}
