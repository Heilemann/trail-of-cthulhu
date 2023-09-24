const validateNumberOrEmpty = (value: string, min: any, max: any) => {
	if (value === '') return true
	const numValue = Number(value)
	const numMin = min !== undefined ? Number(min) : -Infinity
	const numMax = max !== undefined ? Number(max) : Infinity

	if (!isNaN(numValue) && numValue >= numMin && numValue <= numMax) return true

	if (min && max)
		return `Input must be a number between ${min} and ${max} or empty`
	if (min)
		return `Input must be a number greater than or equal to ${min} or empty`
	if (max) return `Input must be a number less than or equal to ${max} or empty`
	return 'Invalid input'
}
export default validateNumberOrEmpty
