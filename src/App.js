import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn, Game, Profile, SignUp, GameMode } from './views';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Profile />} />
          <Route exact path='/SignIn' element={<SignIn />} />
          <Route exact path='/SignUp' element={<SignUp />} />
          <Route exact path='/Game' element={<Game />} />
          <Route exact path='/GameMode' element={<GameMode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
