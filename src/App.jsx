import './App.css';
import Routing from './Routing';
import { ThemeProvider } from './Context/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <Routing />
    </ThemeProvider>
  );
}

export default App;
