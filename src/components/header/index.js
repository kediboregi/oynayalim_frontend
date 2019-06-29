import React from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { isLoggedIn } from '../../utils/authservice';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<AppBar className={classes.root} position="static">
				<Toolbar>
					<IconButton className={classes.menuButton} onClick={this.props.handler(true)} color="inherit" aria-label="Menu"><MenuIcon /></IconButton>
		            <Typography variant="h6" color="inherit" className={classes.grow}>Oyunlar</Typography>
			        {/*<Button color="inherit" href="/" >Ev</Button>*/}
					{isLoggedIn() ? (
						<Box>
							<Button color="inherit" href="/" >Oyunlar</Button>
							<Button color="inherit" onClick={ () => this.props.logoutHandler() }>Çıkış</Button>
						</Box>
					) : (
						<Button color="inherit" onClick={ () => this.props.loginHandler() } color="secondary">Giriş</Button>
					)}
				</Toolbar>
			</AppBar>
		);
	}
};

export default withStyles(styles)(Header);
