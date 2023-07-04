export function isNumber(value: any) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}

export function coerceToNumber(value: any): number {
  return isNumber(value) ? Number(value) : 0;
}

export function coerceToBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
