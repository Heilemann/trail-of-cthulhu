const { src, series, dest } = require('gulp')
const replace = require('gulp-replace')
const inlinesource = require('gulp-inline-source')

const cleanUp = () => {
	return src('./build/*.html')
		.pipe(replace('<link rel="manifest" href="/manifest.json"/>', ''))
		.pipe(replace('<link rel="icon" href="/favicon.ico"/>', ''))
		.pipe(replace('<link rel="apple-touch-icon" href="/logo192.png"/>', ''))
		.pipe(dest('./build'))
}

const inlineScriptsAndCSS = () => {
	const regex = /<script.*<\/script>/g
	return (
		src('./build/*.html')
			// move <script> to end of file, as defer won't work with inline scripts
			.pipe(
				replace(regex, function (match) {
					return '' // Remove the script tag from its original position
				}),
			)
			.pipe(
				replace('</body>', function (match) {
					return `${regex.source}${match}` // Add all script tags before </body>
				}),
			)
			// inline js and css
			.pipe(replace('.js"></script>', '.js" inline></script>'))
			.pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
			.pipe(
				inlinesource({
					compress: false,
				}),
			)
			.pipe(dest('./dist'))
	)
}

// rename path to asset files (which are uploaded on installation)
const renameAssetsPaths = () => {
	return src('./dist/index.html')
		.pipe(replace('static/media/', 'files/'))
		.pipe(dest('./dist'))
}

// const watchTask = () => {
// 	watch('build/*.[html, js, css]', inlineScripts)
// }

exports.default = series(cleanUp, inlineScriptsAndCSS, renameAssetsPaths)
