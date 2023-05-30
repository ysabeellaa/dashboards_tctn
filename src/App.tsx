import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { ApiProvider } from './context/ApiContext';
import Assets from './pages/Assets/Assets';
import Users from './pages/Users/Users';
import CardAll from './components/CardAll/CardAll';
import All from './pages/All/All';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="users" element={<Users />} />
          <Route path="assets" element={<Assets/>} />
        </Routes>
      </ApiProvider>
    </BrowserRouter >



  );
}


export default App
