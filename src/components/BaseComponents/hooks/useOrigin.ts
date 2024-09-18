// returns the origin of the current window
// e.g. 'http://localhost:3000'

const useOrigin = (devPort = ':3000') => {
	const protocol = window.location.protocol
	const host = window.location.hostname
	const port = process.env.NODE_ENV === 'development' ? devPort : ''
	const origin = `${protocol}//${host}${port}`

	return {
		protocol: protocol,
		host: host,
		port: port,
		origin: origin,
	}
}

export default useOrigin
