import React from 'react';

import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

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
			<Fade p={5} in={this.state.loading} timeout={{enter: 0, exit: this.state.loading ? (0) : (2000), }}>
				<LinearProgress color="secondary" variant="query" />
			</Fade>
		);
	}
}
