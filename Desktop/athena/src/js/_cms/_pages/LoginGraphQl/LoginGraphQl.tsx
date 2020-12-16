import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { AppStateContext } from '../../../provider';
import { routePrefix } from "../../routes";
import Cookies from "universal-cookie";
import {Grid, TextField,Button} from "@material-ui/core";
import image from "./bicycle.svg";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  imageBox: {
    backgroundColor:'rgba(229, 229, 229, 0.41)',
  },
  image: {
    height:'80%',
    width:'80%',
    left: 601,
    top: 247,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(5, 5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  social: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  social2: {
    paddingLeft: theme.spacing(6),
    textAlign: 'center',
  },
  logo: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    marginLeft: theme.spacing(5),
    textAlign: 'left',
  },
  textfield: {
    marginBottom: '10px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  forgot:{
    marginLeft: theme.spacing(50)
  }
}));

export const LoginGraphQl: React.FC = () => {
  const history = useHistory();
  const { gqlError } = useContext(AppStateContext)
  const classes = useStyles();

  const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: {
      username: $username,
      password: $password
    }) {
        access_token
        refresh_token
        expires_in
        token_type
        user {
          id
          email
          name
          created_at
          updated_at
        }
      } 
  }`
  ; 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [login] = useMutation(LOGIN);

  const handleSubmit = async ( e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      try {
        setShow(false);
            const { data } = await login({ variables: { username, password } });
            if (data === undefined || data?.login === undefined || data.login?.access_token === undefined)
              {
                throw new Error('Invalid credentials');
              }else{
                const now = new Date();
                cookies.set("token", data.login.access_token, {
                  path: "/",
                  expires: new Date(now.getFullYear(), now.getMonth() + 1, 1),
              });
              history.push(routePrefix);
              }
          } catch (err) {
            setShow(true);
          }
      
    };

  return (
    <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Typography 
                className={classes.logo} 
                color="primary" 
                component="h1" 
                variant="h4">
                      ZEUS    
              </Typography> 
              <div className={classes.paper}>
                  {show ? <div>{gqlError.msg}</div> : undefined}
                  <form onSubmit={handleSubmit}>
                        <TextField 
                          className={classes.textfield}
                          id="email" 
                          value={username} 
                          placeholder='Email' 
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          required
                          label="Email Address"
                          onChange={e => { setUsername(e.target.value); }}/>
                        <TextField 
                          className={classes.textfield}
                          id="password" 
                          value={password} 
                          placeholder='Password' 
                          fullWidth
                          variant="outlined"
                          margin="normal" 
                          type='password'
                          required
                          label="Password"
                          onChange={e => { setPassword(e.target.value); }} />
                        <Button
                        type="submit" 
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                          Login
                        </Button>      

                        <Button className={classes.forgot}>
                          Forgot Password  
                        </Button>                                                                     
                      </form>
                      <Grid container  justify="center" alignItems="center">
                          <div className={classes.social}>
                            <Grid item xs={12} >
                              <Typography component="h1" variant="body1" >
                                  Or Login with
                              </Typography>
                            </Grid>
                          </div>
                      </Grid>
                      <Grid container justify="space-around" alignItems="center">
                          <Grid item xs alignItems="center">
                            <Link className={classes.social2} href="#" variant="body2">
                              Facebook
                            </Link>
                          </Grid>
                          <Grid item xs>
                            <Link className={classes.social2} href="#" variant="body2">
                              Instagram
                            </Link>
                          </Grid>
                          <Grid item xs>
                            <Link className={classes.social2} href="#" variant="body2">
                                Twitter
                            </Link>
                          </Grid>
                      </Grid>
                      </div> 
                  </Grid>
                      <Grid item xs={false} sm={6} md={7} className={classes.imageBox} >
                        <img src={image} className={classes.image}  alt="Bicycle Image" />
                      </Grid> 
                  </Grid>
        
  )  
};
