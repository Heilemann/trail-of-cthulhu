const validateNumberOrEmpty = (value: string) => {
	return (
		value === '' || !isNaN(Number(value)) || 'Input must be a number or empty'
	)
}

export default validateNumberOrEmpty
