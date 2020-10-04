import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import API from '../../Services/code.api'
import HomeIcon from '@material-ui/icons/Home';
import { Button, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';


export default class QuestionList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             questions: []
        }
    }

    componentDidMount(){
        API.getQuestions().then((data) =>{
            let arr = data.data.filter((item) => {
                return item.category === this.props.category
            })
            this.setState({questions: arr})
        })
    }

    render() {
        return (
            <div style = {{width: '100%'}}>
                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <Button onClick = {(e) => this.props.action.handleBack()}>
                        <ArrowBackIcon/>
                    </Button>
                    <div style = {{display: 'flex'}}>
                        <Typography color = 'textPrimary' variant = 'h6'>{this.props.category}</Typography>
                    </div>
                    <Button onClick = {(e) => this.props.action.handleResetHome()}>
                        <HomeIcon/>
                    </Button>
                </div>
                <Divider variant = 'middle'/>
                 <List style = {{overflowY: 'auto', height: 'calc(100vh - 195px)', width: '100%'}} >
                {this.state.questions.map(question => (
                        <ListItem key = {question._id}
                            style = {{marginBottom: '10px'}} 
                            onClick = {(e) => this.props.action.handleQuestionChange(question)}
                            button
                            divider = {true}
                            >
                            <ListItemText
                                primary={question.title}
                                primaryTypographyProps = {{color: 'textPrimary'}}
                                secondary={question.difficulty}
                                secondaryTypographyProps={{color: 'textSecondary'}}
                            />
                            
                        </ListItem>

            

                ))}

                 </List>

                
            </div>
        )
    }
}