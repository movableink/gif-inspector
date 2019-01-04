import { helper } from '@ember/component/helper';

export function paletteBackground(params) {
  const color = params[0];
  if (!color) { return ''.htmlSafe(); }
  const rgba = [color.r, color.g, color.b, color.a].join(', ');
  return `background-color: rgba(${rgba})`.htmlSafe();
}

export default helper(paletteBackground);
