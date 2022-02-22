import { QuizController } from '../trivia/QuizController';
import PaletteProvider from '../core/PaletteProvider';

function App() {
  return (
    <PaletteProvider>
      <QuizController></QuizController>
    </PaletteProvider>
  );
}

export default App;
