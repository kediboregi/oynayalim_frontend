import React from 'react';

//import { isLoggedIn } from '../../utils/authservice';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class DrawerC extends React.Component {
	/*constructor(props) {
		super(props);
	}*/

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
