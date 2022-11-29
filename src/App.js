import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/drinks" />
      <Route path="/profile" />
      <Route path="/done-recipes" />
      <Route path="/favorite-recipes" />
    </Switch>
  );
}

export default App;
