module.exports = {
	plugins: [
		new webpack.IgnorePlugin({
			resourceRegExp: /^electron$/
		}),
	]
}