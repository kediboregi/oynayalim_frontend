import React from 'react';

import { getOyunlar } from '../../../utils/api';
import { login, logout, isLoggedIn } from '../../../utils/authservice';

import Typography from '@material-ui/core/Typography';


export default class Home extends React.Component {

	render() {
		return (
			<div>
				<Typography variant="h5" color="inherit">Ev</Typography>
				<Typography variant="body2" color="inherit">cCc</Typography>
			</div>
		);
	}
}
