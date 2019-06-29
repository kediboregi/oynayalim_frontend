import React from 'react';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import RemoveIcon from '@material-ui/icons/Remove';

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
					//this.state.skorlar.length === +ii+1 ? ( skor.divider=true ) : ( skor.divider=false ),
					<Box key={skor.id} pb={skor.divider ? (1) : (0)}>
						<Typography variant="body1">
							{this.state.deleteSkor ? (
								<IconButton onClick={ () => this.state.deleteSkor(skor.id) } color="secondary" size="small" aria-label="Add"><RemoveIcon/></IconButton>
							) : ('')}
							{skor.deger}
						</Typography>
					</Box>
				))}
			</Box>
		)
	}
}
