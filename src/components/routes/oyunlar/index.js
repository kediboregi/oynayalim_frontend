import React from 'react';

import OyunItem from './oyun-item';

import { getOyunlar, postOyun, deleteOyun } from '../../../utils/api';
import { isLoggedIn } from '../../../utils/authservice';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

//@connect(reduce, actions)
export default class Oyunlar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oyunlar: [],
			ad: "",
			oyunDialog: false,
			...props
		};
    }

	componentDidUpdate(oldProps) {
		const newProps = this.props
		if(oldProps.logged === false && newProps.logged === true) {
			this.getOyunlar();
		}
	}

	componentDidMount() {
		this.getOyunlar();
	}

	componentWillUnmount() {

	}

	getOyunlar = () => {
		this.props.loadingHandler(true);
		getOyunlar().then((data) => {
			/*oyunlar.map(oyun => (
				this.props.addOyun(oyun)
			));*/
			this.props.loadingHandler(false);
			if (data.status){
				if (data.message === "not_found"){
					this.setState({ oyunlar: [], status: data.status, message: data.message  });
				}
			} else {
				this.setState({ oyunlar: data });
			}

		});
	};

	postOyun = () => {
		let oyun = {ad: this.state.inputOyunAd}
		this.props.loadingHandler(true);
		postOyun(oyun).then((doyun) => {
			this.props.loadingHandler(false);
			//this.props.addOyun(oyun)
			this.setState({ ad: '' });

			this.setState(state => {
				const oyunlar = [...state.oyunlar, doyun]
				return {
					oyunlar: oyunlar
				};
			})
			//this.getOyunlar();
			this.closeOyunDialog();
		});
	};

	deleteOyun = (oyun) => {
		this.props.loadingHandler(true);
		deleteOyun(oyun).then((data) => {
			this.props.loadingHandler(false);
			//this.props.delOyun(oyun)
			this.setState(state => {
				const oyunlar = state.oyunlar.filter((item, i) => data.id !== item.id);
				return {
					oyunlar: oyunlar
				};
			})
			//this.getOyunlar()
		});
	};

	updateAd = (e) => {
		this.setState({ ad: e.target.value });
	};

	openOyunDialog = () => {
		this.setState({ oyunDialog: true })
	};
	closeOyunDialog = () => {
		this.setState({ oyunDialog: false })
	};


	render() {
		return (
			isLoggedIn() ? (
				<Container fixed>
					<Dialog open={ this.state.oyunDialog }>
						<DialogTitle>Oyun Ekle</DialogTitle>
						<DialogContent>
							<TextField type="string" name="inputOyunAd" placeholder="Ad" onChange={ (e) => this.setState({ [e.target.name]: e.target.value }) }/>
						</DialogContent>
						<DialogActions>
							<Button onClick={ () => this.setState({ oyunDialog: false }) }>kapat</Button>
							<Button onClick={ () => this.postOyun() }>yolla</Button>
						</DialogActions>
					</Dialog>

					<Grid container={true} alignItems="baseline" justify="center" direction="row" >
						<Typography variant="h5">Oyunlar</Typography>
					</Grid>

					<Grid container={true} alignItems="baseline" justify="center" direction="row" >
						<Button onClick={this.openOyunDialog}>oyun ekle</Button>
					</Grid>

					{this.state.oyunlar.length > 0 ? (
						<Grid container alignItems="baseline" justify="space-evenly" direction="row" spacing={3}>
						{this.state.oyunlar.map(oyun => (
							<Grid item key={oyun.id} xs={6} md={3}>
								<OyunItem key={oyun.id} oyun={oyun} onRemove={this.deleteOyun} />
							</Grid>
						))}
						</Grid>
					) : (
						<Grid container justify="center" direction="row" >
							<Typography variant="body1">Burası Boş</Typography>
						</Grid>
					)}
				</Container>
			) : (
				''
			)
		);
	}

}
