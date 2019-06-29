import React from 'react';
import { Route, Redirect } from 'react-router'

import SkorItem from './skor-item';
import SkorList from './skor-list';
import SkorAdd from './skor-add';

import { getOyun, deleteOyun, postSkor, deleteSkor, postOyuncu } from '../../../utils/api';
import { login, logout, isLoggedIn, getAccessToken } from '../../../utils/authservice';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';


import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
//import CloseIcon from '@material-ui/icons/';

export default class Oyun extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			oyun: false,
			oyuncuDialog: false,
			skorDialog: false,
			silDialog: false,
			loading: true
		};
    }

	componentDidMount() {
		let id = this.props.match.params.id;
		this.getOyun(id);
	}

	componentWillUnmount() {

	}

	getOyun = (id, callback) => {
		this.setState({ loading: true });
		getOyun(id).then((doyun) => {
			if (doyun.status === "error") {
				this.setState({ status: "error", message: doyun.message, loading: false });
			} else {
				this.setState({ oyun: doyun, loading: false });
				typeof callback === 'function' && callback()
			}
		});
	};

	deleteOyun = () => {
		let oyun = this.state.oyun;
		deleteOyun({id: oyun.id}).then((data) => {
			//window.location = '/oyunlar'
			this.setState({ redirect: "/" })
		});
	};

	postOyuncu = () => {
		let oyun = this.state.oyun;
		postOyuncu({ oyun_id: oyun.id, ad: this.state.inputOyuncuAd }).then((doyuncu) => {
			//this.getOyun(oyun.id);
			this.setState(state => {
				state.oyun.oyuncular = state.oyun.oyuncular = [...state.oyun.oyuncular, doyuncu]
				return {
					oyun: state.oyun
				};
			})
			this.setState({ inputOyuncuAd: '' });
			this.closeOyuncuDialog()
		});
	};

	postSkor = (oyuncu, inputSkor, callback) => {
		let oyun = this.state.oyun;
		postSkor({oyun_id: oyun.id, oyuncu_id: oyuncu.id, deger: inputSkor}).then((dskor) => {
			this.setState(state => {
				const oyunlar = state.oyun.oyuncular.map((oyuncu, i) => {
					if (oyuncu.id === dskor.oyuncu_id) {
						oyuncu.skorlar = [...oyuncu.skorlar, dskor]
					}
					return state.oyun
				})
				return {
					oyun: oyunlar[0]
				};
			})
			typeof callback === 'function' && callback()
			/*this.getOyun(oyun.id, () => (
				typeof callback === 'function' && callback()
			))*/
			//this.setState({ inputSkor: '' });
			//this.closeSkorDialog()
		});
	};

	deleteSkor = (id) => {
		let oyun = this.state.oyun;
		deleteSkor({id: id}).then((dskor) => {
			this.setState(state => {
				const oyun = state.oyun.oyuncular.map((oyuncu, i) => {
					oyuncu.skorlar = oyuncu.skorlar.filter((skor, y) => skor.id !== dskor.id)
					return state.oyun
				})
				return {
					oyun: oyun[0]
				};
			})
			//this.getOyun(oyun.id);
		});
	};

	openSilDialog = () => {
		this.setState({ silDialog: true })
	};
	closeSilDialog = () => {
		this.setState({ silDialog: false })
	};

	openOyuncuDialog = () => {
		this.setState({ oyuncuDialog: true })
	};
	closeOyuncuDialog = () => {
		this.setState({ oyuncuDialog: false })
	};

	openSkorDialog = (oyuncu) => () => {
		this.setState({ skorDialog: true, oyuncuid: oyuncu.id, skoread: oyuncu.ad })
	};
	closeSkorDialog = () => {
		this.setState({ skorDialog: false, oyuncuid: null })
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
				<Container fixed>
					{this.state.loading ? (
						<Grid container={true} alignItems="stretch" justify="space-evenly" direction="row" >
							<Grid container justify="center" direction="row" >
								<Typography variant="body1">Yükleniyor</Typography>
							</Grid>
						</Grid>
					) : (
						isLoggedIn() && this.state.oyun.user_uuid === getAccessToken() ? (
						console.log(this.state.oyun.user_uuid),
						console.log(getAccessToken()),
						<Box>
							<Dialog open={this.state.silDialog}>
								<DialogTitle>Sil</DialogTitle>
								<DialogContent>
									Devam ederseniz silinecektir
								</DialogContent>
								<DialogActions>
									<Button onClick={ this.closeSilDialog }>kapat</Button>
									<Button onClick={ this.deleteOyun }>Sil</Button>
								</DialogActions>
							</Dialog>

							<Dialog open={ this.state.oyuncuDialog }>
								<DialogTitle>Oyuncu Ekle</DialogTitle>
								<DialogContent>
									<TextField type="string" name="inputOyuncuAd" placeholder="Ad" onChange={ (e) => this.setState({ [e.target.name]: e.target.value }) }/>
								</DialogContent>
								<DialogActions>
									<Button onClick={ () => this.setState({ oyuncuDialog: false }) }>kapat</Button>
									<Button onClick={ () => this.postOyuncu() }>yolla</Button>
								</DialogActions>
							</Dialog>

							<Grid container alignItems="baseline" justify="center" direction="row" >
								<Typography variant="h5">{ this.state.oyun.ad }</Typography>
							</Grid>

							<Grid container alignItems="baseline" justify="center" direction="row" >
								{ this.state.oyun.bitti ? ( ' / bitti' ) : ('') }
								<Button onClick={this.openSilDialog}>sil</Button>
								<Button onClick={this.openOyuncuDialog}>oyuncu ekle</Button>
							</Grid>

							<Box mt={1}>
								{this.state.oyun.oyuncular ? (
									this.state.oyun.oyuncular.length > 0 ? (
										<Grid container spacing={1} justify="center" direction="row" >
										{this.state.oyun.oyuncular.map((oyuncu, i) => (
											<SkorItem key={oyuncu.id} oyuncu={oyuncu} postSkor={this.postSkor} deleteSkor={this.deleteSkor}/>
										))}
										</Grid>
									) : (
										<Grid container justify="center" direction="row" >
											<Typography variant="body1">Burası Boş</Typography>
										</Grid>
									)
								) : ('')}
							</Box>
						</Box>
						) : (
						<Box>
							<Grid container alignItems="baseline" justify="center" direction="row" >
								<Typography variant="h5">{ this.state.oyun.ad }</Typography>
							</Grid>
							<Box mt={1}>
								{this.state.oyun.oyuncular ? (
									this.state.oyun.oyuncular.length > 0 ? (
										<Grid container spacing={1} justify="center" direction="row" >
										{this.state.oyun.oyuncular.map((oyuncu, i) => (
											<SkorItem key={oyuncu.id} oyuncu={oyuncu}/>
										))}
										</Grid>
									) : (
										<Grid container justify="center" direction="row" >
											<Typography variant="body1">Burası Boş</Typography>
										</Grid>
									)
								) : ('')}
							</Box>
						</Box>
						)
					)}
				</Container>
		);
	}

}
