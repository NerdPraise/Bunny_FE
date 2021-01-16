import './assets/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/pages/homepage/HomePage';
import Login from './components/pages/login/Login';
import { Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/router/protectedroute/ProtectedRoute';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <div className="bg-grey">
        <HomePage />
        {/* <Switch>
          <Route path='/login' exact component={Login} />
          <ProtectedRoute path='/' exact component={HomePage} />
        </Switch> */}
      </div>
    </Router>

  );
}

export default App;
