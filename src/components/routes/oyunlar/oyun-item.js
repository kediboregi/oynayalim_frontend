import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ForwardIcon from '@material-ui/icons/Forward';


export default class OyunItem extends React.Component {
	remove = () => {
		let { onRemove, oyun } = this.props;
		onRemove(oyun);
	};

	shouldComponentUpdate({ oyun, onRemove }) {
		return oyun !== this.props.oyun || onRemove !== this.props.onRemove;
	}

	componentDidMount() {

	}

	skorlariTopla = (skorlar) => {
		let toplam = 0
		skorlar.map((skor, iy) => (
			toplam = +toplam + +skor.deger
		))
		return toplam
	};

	render() {
		return (
			<Card mx="auto" elevation={2} href={`/oyun/${ this.props.oyun.id }`}>
				<CardHeader title={ this.props.oyun.ad } subheader="">
					{ this.props.oyun.bitti ? ( 'bitti' ) : ( 'bitmedi' ) }
				</CardHeader>
				{this.props.oyun.oyuncular.length > 0 ? (
					<CardContent>
						<Typography component="h2">Oyuncular</Typography>
						{this.props.oyun.oyuncular.map((oyuncu, i) => (
							<Typography key={ i } component="h2">{ oyuncu.ad } { this.skorlariTopla(oyuncu.skorlar) }</Typography>
						))}
					</CardContent>
				) : ('')}
				<CardActions>
					<IconButton href={`/oyun/${ this.props.oyun.id }`} size="small"><ForwardIcon /></IconButton>
					<IconButton onClick={this.remove} size="small"><ClearIcon /></IconButton>
				</CardActions>
			</Card>
		);
	}
}
