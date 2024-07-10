export function cpfMask(value: string): string {
  const cleanedValue = value.replace(/\D/g, '')
  let formattedValue = ''
  if (cleanedValue.length > 0) {
    formattedValue = cleanedValue.substring(0, 3)
  }
  if (cleanedValue.length > 3) {
    formattedValue += '.' + cleanedValue.substring(3, 6)
  } else {
    formattedValue += cleanedValue.substring(3)
  }
  if (cleanedValue.length > 6) {
    formattedValue += '.' + cleanedValue.substring(6, 9)
  } else if (cleanedValue.length > 3) {
    formattedValue += '.' + cleanedValue.substring(6)
  }
  if (cleanedValue.length > 9) {
    formattedValue += '-' + cleanedValue.substring(9, 11)
  } else if (cleanedValue.length > 6) {
    formattedValue += '-' + cleanedValue.substring(9)
  } else if (cleanedValue.length > 3) {
    formattedValue += '-' + cleanedValue.substring(6)
  }
  return formattedValue
}
