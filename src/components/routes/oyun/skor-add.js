import React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';

export default class SkorAdd extends React.Component {
	constructor(props){
		super(props)
		this.state = {edit: false, ...props}
    }

	componentWillReceiveProps({oyuncu, postSkor}) {
		this.setState({...this.state, oyuncu, postSkor})
	}

	componentWillUnmount() {

	}

	_handleKeyDown = (e) => {
    	if (e.key === 'Enter') {
			this.state.postSkor(this.props.oyuncu, this.state.inputSkor, () => (
				this.setState({ edit: false })
			))
    	}
		if (e.key === 'Escape') {
			this.setState({ edit: false })
		}
    }

	render() {
		return (
			<Box>
				{this.state.edit ? (
					<TextField label="Skor" type="number" name="inputSkor" onKeyDown={this._handleKeyDown} onChange={ (e) => this.setState({ [e.target.name]: +e.target.value }) }/>
				) : (
					<IconButton onClick={ () => (this.setState({ edit: true })) } color="secondary" size="small" aria-label="Add"><AddIcon/></IconButton>
				)}
			</Box>
		);
	}
}
