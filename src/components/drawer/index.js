import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { login, logout, isLoggedIn } from '../../utils/authservice';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class DrawerC extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Drawer open={this.props.open} onClose={this.props.handler(false)}>
				<div tabIndex={0} role="button" onClick={this.props.handler(false)} onKeyDown={this.props.handler(false)}>
					<List>
						<ListItem button key="Ev">
							<ListItemIcon></ListItemIcon>
							<ListItemText primary="Ev" />
						</ListItem>
						<ListItem button key="Oyunlar">
							<ListItemIcon></ListItemIcon>
							<ListItemText primary="Oyunlar" />
						</ListItem>
					</List>
				</div>
			</Drawer>
		);
	}
}

export default DrawerC;
