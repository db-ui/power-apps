module.exports = {
	module: {
		rules: [
			{
				test: [/\.(woff|woff2)$/],
				type: 'asset/resource',
				generator: {
					filename: '[name][ext]'
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	}
};




