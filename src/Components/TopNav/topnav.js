import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from './tabs'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import API from './../../Services/code.api'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const useStyles = theme => ({
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'sticky',
      backgroundColor: 'black'
   },
   root: {
      display: 'flex',
   },
   logo: {
      height: 'auto',
      width: 300
   },
});

const WhiteTextTypography = withStyles({
   root: {
     color: "#FFFFFF"
   }
 })(Typography);

class TopNav extends React.Component {

   state = {
      open: false,
      message: ""
   }

   handleDialogClose = () => {
      this.setState({open: false})
   }

   handleDialogOpen = () => {
      this.setState({open: true})
   }

   feedBack = () => {
      let obj = {"message": this.state.message}
      API._submitFeedBack(obj).then(() => {
         this.setState({open: false})
         NotificationManager.success('Thank you for your feedback!')
      })
   }

   handleMessage = (e) => {
      this.setState({message: e.target.value})
   }

   
   handleLangChange = (language) => {
      this.props.actions.handleLangChange(language)
   }

    render() {
       const { classes } = this.props;
       return (
          <AppBar className={classes.appBar} position="fixed">
            <NotificationContainer/>
             <Toolbar>
                <img className={classes.logo} src={'Code Tracer.png'} alt="Code Tracer Logo" />
                <Button onClick = {() => this.handleDialogOpen()} style = {{marginLeft: 'auto'}}><WhiteTextTypography color = "textSecondary">
                   About Me
                   </WhiteTextTypography>
                   </Button>
             </Toolbar>
             <Tabs actions = {{
              handleLangChange: this.handleLangChange
            }}/>
            <Dialog open={this.state.open} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
               <DialogTitle id="form-dialog-title">About Me!</DialogTitle>
                  <DialogContent>
                     <Typography>
                        Hello there! My name is George Ye and this my personal software development project. <br/><br/>This web app is definitely still in the works, but please if you have
                        any feedback on things I can improve (which I know there are a lot at this point in time), I would greatly appreciate it! <br/>
                     </Typography>
                     <TextField onChange = {(e) => this.handleMessage(e)} style = {{marginBottom: '10px'}} rows = {3} variant = 'outlined' fullWidth multiline label = {"Feedback"}/>
                     <Typography>Come check me out on my LinkedIn and GitHub to learn more about me! Thanks!</Typography>
                        <div style = {{display: 'flex', flexDirection: 'column'}}>
                           <Link rel="noopener" target="_blank" href="https://www.linkedin.com/in/george-ye-45g/" >
                              My LinkedIn Profile
                           </Link>
                           <Link rel="noopener" target="_blank" href="https://george-ye45.github.io/" >
                              My Github Page
                           </Link>
                        </div>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={this.handleDialogClose} color="secondary">
                     Cancel
                     </Button>
                     <Button onClick={() => this.feedBack()} color="secondary">
                     Submit
                     </Button>
                  </DialogActions>
            </Dialog>
          </AppBar>
       )
    }
 }
 export default withStyles(useStyles)(TopNav)