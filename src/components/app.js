import React from 'react';
import 'typeface-roboto';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { login, logout } from '../utils/authservice';

import Loading from './loading';
import Drawer from './drawer';
import Header from './header';
//import Home from './routes/home';
import Oyunlar from './routes/oyunlar';
import Oyun from './routes/oyun';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import purple from '@material-ui/core/colors/purple';
//import green from '@material-ui/core/colors/green';
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
	input: {
		width: '10px',
	}
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			side: false,
			logged: false,
			loading: false
		};
	}

	toggleDrawer = (open) => () => {
		this.setState({ ...this.state, open: open });
	};

	loadingHandler = (loading) => {
		this.setState({loading: loading });
	}

	loginHandler = () => {
		login(() => (
			this.setState({logged: true})
		))
	}

	logoutHandler = () => {
		logout(() => (
			this.setState({logged: false})
		))
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const { classes } = this.props;
		return (
			<MuiThemeProvider theme={theme}>
				<Router>
					<Header logoutHandler={this.logoutHandler} loginHandler={this.loginHandler} handler={this.toggleDrawer} />
					<Drawer handler={this.toggleDrawer} open={this.state.open} />
					<div className={classes.root}>
						<Loading loading={this.state.loading} />
						{/*<Route path="/" exact component={Home} />*/}
						<Route path="/" exact render={(props) => <Oyunlar {...props} logged={this.state.logged} loadingHandler={this.loadingHandler} />} />
						<Route path="/oyun/:id" render={(props) => <Oyun {...props} logged={this.state.logged} loadingHandler={this.loadingHandler} />} />
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
