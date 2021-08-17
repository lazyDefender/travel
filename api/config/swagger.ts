import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Travel App API',
		version: '1.0.0',
		description: '',
		license: {
			name: 'Licensed Under MIT',
			url: 'https://spdx.org/licenses/MIT.html',
		},
	},
	servers: [
		{
			url: `http://localhost:${process.env.PORT || 3050}`,
			description: 'Development server',
		},
	],
};

const options = {
	swaggerDefinition,
	apis: ['./docs/**/*.yaml'],
};

export const swaggerSpec = swaggerJSDoc(options);