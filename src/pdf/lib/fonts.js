function generateFontDefinition(font) {
	const fontPath = `/fonts/${font}/${font}`;
	return {
		[ font ]: {
			family: font,
			fonts: [
				{ src: `${fontPath}-Regular.ttf` },
				{ src: `${fontPath}-Italic.ttf`, fontStyle: 'italic' },
				{ src: `${fontPath}-Bold.ttf`, fontWeight: 700 },
				{
					src: `${fontPath}-BoldItalic.ttf`,
					fontStyle: 'italic',
					fontWeight: 700,
				},
			],
		},
	};
}

export const ALEGREYA_SANS = 'AlegreyaSans'
const ARIMO = 'Arimo';
export const LATO = 'Lato';
export const SOURCE_SERIF_PRO = 'SourceSerifPro';
const MONTSERRAT = 'Montserrat';
export const AVAILABLE_FONTS = [
	ALEGREYA_SANS,
	ARIMO,
	LATO,
	MONTSERRAT,
	SOURCE_SERIF_PRO,
];

const FONT_DEFINITIONS = {
	...generateFontDefinition( ALEGREYA_SANS ),
	...generateFontDefinition( ARIMO ),
	...generateFontDefinition( LATO ),
	...generateFontDefinition( MONTSERRAT ),
	...generateFontDefinition( SOURCE_SERIF_PRO ),
};

export function getFontDefinition( font ) {
	return FONT_DEFINITIONS[ font ] || FONT_DEFINITIONS[ LATO ];
}
