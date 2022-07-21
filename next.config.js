module.exports = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/invest',
				permanent: true,
			},
		]
	},
}