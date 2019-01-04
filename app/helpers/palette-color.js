import { helper } from '@ember/component/helper';

export function paletteColor(params) {
  const color = params[0];
  if (!color) { return ''.htmlSafe(); }
  const rgba = [color.r, color.g, color.b, color.a].join(', ');
  return `rgba(${rgba})`.htmlSafe();
}

export default helper(paletteColor);
