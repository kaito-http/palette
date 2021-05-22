module.exports = {
	purge: ['./src/**/*.{ts,tsx}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				pallette: {
					background: {
						light: '#ffffff',
						dark: '#34293e'
					},
					foreground: {
						light: '#4e616e',
						dark: '#c2c3de'
					},
				},
				highlight: {
					background: {
						light: '#f5f6fa',
						dark: '#4d4455'
					},
					foreground: {
						light: '#000000',
						dark: '#e7e0f5'
					}
				},
				separator: {
					light: '#f4f5f6',
					dark: '#4d4455'
				},
				overlay: {
					light: 'rgba(237, 240, 244, 0.5)',
					dark: 'rgba(35, 30, 40, 0.5)'
				},
			},
			borderRadius: { // uneven radii supremacy
				sm: '0.19rem',
				DEFAULT: '0.3125rem',
				md: '0.4375rem',
				lg: '0.5625rem',
				xl: '0.8125rem',
				'2xl': '1.0625rem',
				'3xl': '1.5625rem'
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	mode: 'jit',
};
