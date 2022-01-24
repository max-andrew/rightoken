module.exports = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/artist',
				permanent: true,
			},
		]
	},
}