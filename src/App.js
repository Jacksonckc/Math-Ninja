import './App.css';
import Header from './components/Header';
import LoginPage from './views/LoginPage';
import Game from './views/Game';

import { SignIn } from './views';

function App() {
  return (
    <div className='App'>
      {/* <BrowserRouter>
        <Route exact path='/'>
          <SignIn />
        </Route>
      </BrowserRouter> */}

      <Game />
    </div>
  );
}

export default App;
