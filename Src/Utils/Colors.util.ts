import tinycolor2 from 'tinycolor2';

function multiply(rgb1: tinycolor2.ColorFormats.RGBA, rgb2: tinycolor2.ColorFormats.RGBA): tinycolor2.Instance {
  rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
  rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
  rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
  return tinycolor2('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
}

type MaterialPaletteObjectType = {
  name: string;
  hex: string;
  darkContrast: boolean;
};

function getMaterialPaletteObject(value: tinycolor2.ColorInput, name: string): MaterialPaletteObjectType {
  var colors = tinycolor2(value);
  return {
    name: name,
    hex: colors.toHexString(),
    darkContrast: colors.isLight()
  };
}

type AlgorithmType = 'traditional' | 'constantin' | 'buckner';

export function getMaterialPaletteList(
  hex: string,
  algorithm: AlgorithmType = 'constantin'
): MaterialPaletteObjectType[] {
  // Return array of color objects.
  var baseLight: tinycolor2.Instance;
  var baseDark: tinycolor2.Instance;
  var baseTriad: [tinycolor2.Instance, tinycolor2.Instance, tinycolor2.Instance, tinycolor2.Instance];

  switch (algorithm) {
    case 'constantin': {
      baseLight = tinycolor2('#ffffff');
      baseDark = multiply(tinycolor2(hex).toRgb(), tinycolor2(hex).toRgb());
      baseTriad = tinycolor2(hex).tetrad();
      return [
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 12), '50'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 30), '100'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 50), '200'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 70), '300'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 85), '400'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 100), '500'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 87), '600'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 70), '700'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 54), '800'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 25), '900'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(65), 'A100'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(55), 'A200'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(45), 'A400'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(40), 'A700')
      ];
    }

    case 'buckner': {
      baseLight = tinycolor2('#ffffff');
      baseDark = multiply(tinycolor2(hex).toRgb(), tinycolor2(hex).toRgb());
      baseTriad = tinycolor2(hex).tetrad();

      return [
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 12), '50'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 30), '100'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 50), '200'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 70), '300'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 85), '400'),
        getMaterialPaletteObject(tinycolor2.mix(baseLight, hex, 100), '500'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 87), '600'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 70), '700'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 54), '800'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, hex, 25), '900'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[2], 15).saturate(80).lighten(48), 'A100'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[2], 15).saturate(80).lighten(36), 'A200'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[2], 15).saturate(100).lighten(31), 'A400'),
        getMaterialPaletteObject(tinycolor2.mix(baseDark, baseTriad[2], 15).saturate(100).lighten(28), 'A700')
      ];
    }

    default:
      return [
        getMaterialPaletteObject(tinycolor2(hex).lighten(52), '50'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(37), '100'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(26), '200'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(12), '300'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(6), '400'),
        getMaterialPaletteObject(tinycolor2(hex), '500'),
        getMaterialPaletteObject(tinycolor2(hex).darken(6), '600'),
        getMaterialPaletteObject(tinycolor2(hex).darken(12), '700'),
        getMaterialPaletteObject(tinycolor2(hex).darken(18), '800'),
        getMaterialPaletteObject(tinycolor2(hex).darken(24), '900'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(50).saturate(30), 'A100'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(30).saturate(30), 'A200'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(10).saturate(15), 'A400'),
        getMaterialPaletteObject(tinycolor2(hex).lighten(5).saturate(5), 'A700')
      ];
  }
}

export function colorShade(col: string, amt: number): string {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export function colorOpacity(color: string, amt: number): string {
  return tinycolor2(color).setAlpha(amt).toHex8String();
}

export function colorDark(color: string, amt: number): string {
  return tinycolor2(color).darken(amt).toString();
}

export function colorLight(color: string, amt: number): string {
  return tinycolor2(color).lighten(amt).toString();
}
