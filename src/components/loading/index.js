import React from 'react';

import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Loading extends React.Component {
	constructor(props){
		super(props)
		this.state = {...props}
    }

	componentWillReceiveProps({loading}) {
		this.setState({...this.state, loading})
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<Fade p={5} in={this.state.loading} unmountOnExit>
				<Grid container justify="center" direction="row" >
					<CircularProgress color="secondary" />
				</Grid>
			</Fade>
		);
	}
}
