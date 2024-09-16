const { src, series, dest } = require('gulp')
const replace = require('gulp-replace')
const inlinesource = require('gulp-inline-source')

const cleanUp = () => {
	return src('./dist/*.html')
		.pipe(replace('<link rel="manifest" href="/manifest.json"/>', ''))
		.pipe(replace('<link rel="icon" href="/favicon.ico"/>', ''))
		.pipe(replace('<link rel="apple-touch-icon" href="/logo192.png"/>', ''))
		.pipe(dest('./dist'))
}

const inlineScriptsAndCSS = () => {
	const regex = /<script.*?<\/script>/gs
	return src('./dist/*.html')
		.pipe(replace(regex, ''))
		.pipe(
			replace('</body>', match => {
				return `<script src="./assets/index-Bsz-2xDw.js"></script>${match}`
			}),
		)
		.pipe(replace('.js"></script>', '.js" inline></script>'))
		.pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
		.pipe(
			inlinesource({
				compress: false,
				rootpath: './dist',
			}),
		)
		.pipe(dest('./dist'))
}

const renameAssetsPaths = () => {
	return src('./dist/index.html')
		.pipe(replace('assets/', 'files/'))
		.pipe(dest('./dist'))
}

export default series(cleanUp, inlineScriptsAndCSS, renameAssetsPaths)
