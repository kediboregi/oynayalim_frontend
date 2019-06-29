import React from 'react';

import SkorList from './skor-list';
import SkorAdd from './skor-add';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

export default class SkorItem extends React.Component {
	constructor(props){
		super(props)
		this.state = {...props}
    }

	remove = () => {
		let { onRemove, skor } = this.props;
		onRemove(skor);
	};

	/*shouldComponentUpdate({ skor, onRemove }) {
		return skor !== this.props.skor || onRemove !== this.props.onRemove;
	}*/

	componentWillReceiveProps({oyuncu, postSkor}) {
		this.setState({...this.state, oyuncu, postSkor})
	}

	render() {
		let oyuncu = this.state.oyuncu
		oyuncu.toplam = 0
		oyuncu.skorlar.map((skor, ii) => (
			oyuncu.toplam = +skor.deger+oyuncu.toplam
		))
		return (
			<Grid item xs={3} md={"auto"}>
				<Paper border={1}>
					<Box py={1} px={1}>
						<Typography color="primary" variant="subtitle1">{ oyuncu.ad }</Typography>
						<SkorList skorlar={oyuncu.skorlar} deleteSkor={this.state.deleteSkor} />
						{this.state.postSkor ? (
							<SkorAdd oyuncu={oyuncu} postSkor={this.state.postSkor} />
						) : ('')}
						{oyuncu.toplam > 0 ? (
							<Box>
								<Divider></Divider>
								<Typography variant="body1">{oyuncu.toplam}</Typography>
							</Box>
						) : ( '' ) }
					</Box>
				</Paper>
			</Grid>
		);
	}
}
