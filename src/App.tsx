import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Routes from './Routes';


const App: React.FC = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
