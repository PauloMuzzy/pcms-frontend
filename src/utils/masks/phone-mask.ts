export function phoneMask(value: string): string {
  const cleanedValue = value.replace(/\D/g, '')
  let formattedValue = ''
  if (cleanedValue.length >= 1) {
    formattedValue = `(${cleanedValue.substring(0, 2)}`
  }
  if (cleanedValue.length >= 3) {
    formattedValue += `) ${cleanedValue.substring(2, 7)}`
  }
  if (cleanedValue.length >= 7) {
    formattedValue += `-${cleanedValue.substring(7, 11)}`
  }
  return formattedValue
}
