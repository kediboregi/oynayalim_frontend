import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { login, logout, isLoggedIn } from '../utils/authservice';

import Drawer from './drawer';
import Header from './header';
//import Home from './routes/home';
import Oyunlar from './routes/oyunlar';
import Oyun from './routes/oyun';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';

//import '../style/index.scss';

const theme = createMuiTheme({
  palette: {
	  primary: indigo,
      secondary: pink,
      error: red,
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold: 3,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
	  type: 'light',
  },
  typography: { useNextVariants: true },
});

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(1),
	margin: theme.spacing(0)
  },
  button: {
    margin: theme.spacing(1),
  },
});

class App extends React.Component {
	constructor() {
		super();
		this.state = { side: false };
	}

	toggleDrawer = (open) => () => {
		this.setState({ ...this.state, open: open });
	};

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const { classes } = this.props;
		return (
			<MuiThemeProvider theme={theme}>
				<Router>
					<Header handler={this.toggleDrawer} />
					<Drawer handler={this.toggleDrawer} open={this.state.open} />
					<div className={classes.root}>
						{/*<Route path="/" exact component={Home} />*/}
						<Route path="/" exact component={Oyunlar} />
						<Route path="/oyun/:id" component={Oyun} />
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);