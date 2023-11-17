// Todo : add currency
export default (number, dividedBy = 1) => String(( number / dividedBy ).toFixed(2)).replace('.', ',')

export const floatToString = (number) => String(number).replace('.', ',')
