import { CSSProperties } from 'react';
import { QuizController } from '../quiz/QuizController';
import css from './App.module.scss';
import { usePalette } from './usePalette';

declare module 'react' {
  interface CSSProperties {
      [key: `--${string}`]: string | number
  }
}

function App() {
  const [[paletteA, paletteB], randomizePalette] = usePalette()
  const paletteVariablesStyles: CSSProperties = {
    "--paletteA": paletteA,
    "--paletteB": paletteB,
  }
  return (
    <div className={css.background} style={paletteVariablesStyles}>
      <QuizController></QuizController>
    </div>
  );
}

export default App;
