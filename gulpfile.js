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
	return (
		src('./build/*.html')
			.pipe(
				replace(/([\s\S]*)/, function (match) {
					let newString = match
					let scripts = ''

					// Collect and remove all script tags
					newString = newString.replace(
						/<script[\s\S]*?<\/script>/g,
						function (scriptTag) {
							scripts += scriptTag + '\n'
							return ''
						},
					)

					// Append collected scripts before </body>
					newString = newString.replace('</body>', scripts + '\n</body>')
					return newString
				}),
			)
			// Inline JS and CSS
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
		.pipe(replace('static/media/', 'files/')) // react
		.pipe(replace('assets/', 'files/')) // vite
		.pipe(dest('./dist'))
}

// const watchTask = () => {
// 	watch('build/*.[html, js, css]', inlineScripts)
// }

exports.default = series(cleanUp, inlineScriptsAndCSS, renameAssetsPaths)
