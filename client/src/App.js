import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import './index.css';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';


const theme = createTheme({
  palette: {
    primary: {
      light: "#718792",
      main: "#455a64",
      dark: "#1c313a",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#718792",
      main: "#455a64",
      dark: "#1c313a",
      contrastText: "#ffffff"
    },
  },
});



function App() {
  // calling our User
  const { user } = useContext(AuthContext);

  return (
    <MuiThemeProvider theme={theme}>
        <Router>
            <Switch>
              <Route exact path="/" >{ user ? <Home /> : <Login/> }</Route>
              <Route exact path="/profile/:username" ><Profile/></Route>
              <Route exact path="/login"  >{ user ? <Redirect to="/" /> : <Login/> }</Route>
              <Route exact path="/register"  >{ user ? <Redirect to="/" /> : <Register/> }</Route>
            </Switch>
        </Router>
    </MuiThemeProvider>
  );
}

export default App;
