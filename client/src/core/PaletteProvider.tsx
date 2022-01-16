import { CSSProperties } from 'react';
import { usePalette } from '../core/usePalette';

import css from './PaletteProvider.module.scss';

declare module 'react' {
  interface CSSProperties {
      [key: `--${string}`]: string | number
  }
}

export const PaletteProvider: React.FC = ({children}) => {
  const [[paletteA, paletteB], randomizePalette] = usePalette()
  const paletteVariablesStyles: CSSProperties = {
    "--paletteA": paletteA,
    "--paletteB": paletteB,
  }
  return (
    <div className={css.background} style={paletteVariablesStyles}>
      {children}
    </div>
  );
}

export default PaletteProvider;
