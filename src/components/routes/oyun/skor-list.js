import React from 'react';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';

export default class SkorList extends React.Component {
	constructor(props){
		super(props)
		this.state = {...props}
    }

	componentWillReceiveProps({skorlar, deleteSkor}) {
		this.setState({...this.state, skorlar, deleteSkor})
	}

	render() {
		return (
			<Box>
				{this.state.skorlar.map((skor, ii) => (
					this.state.skorlar.length == +ii+1 ? ( skor.divider=true ) : ( skor.divider=false ),
					<Box key={skor.id} pb={skor.divider ? (1) : (0)}>
						<IconButton onClick={ () => this.state.deleteSkor(skor.id) } color="secondary" size="small" aria-label="Add"><AddIcon/></IconButton>
						{ skor.deger }
					</Box>
				))}
			</Box>
		)
	}
}
