import { QuizController } from '../trivia/QuizController';
import PaletteProvider from '../core/PaletteProvider';
import { Provider } from 'react-redux';
import { store } from '../core/store';


function App() {
  return (
    <PaletteProvider>
      <Provider store={store}>
        <QuizController></QuizController>
      </Provider>
    </PaletteProvider>
  );
}

export default App;
