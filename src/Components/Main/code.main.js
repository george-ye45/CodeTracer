import React from 'react';
import {withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HomeCompiler from '../HomeCompiler/homecompiler'
import CategoryList from '../CategoryList/CategoryList'
import QuestionPage from '../QuestionPage/question_page'
import QuestionList from '../QuestionList/QuestionList'

const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
		display: 'flex',
		width: "30%",
		padding: '10px',
		marginLeft: '10px',
		marginTop: '10px',
		marginBottom: '10px',
		marginRight: '5px'
	},
	paper1: {
		display: 'flex',
		flexDirection: 'column',
		width: "70%",
		backgroundColor: '#c7ccd4',
		padding: '10px',
		marginRight: '10px',
		marginTop: '10px',
		marginBottom: '10px',
		marginLeft: '5px'
    }
  });



class CodeMain extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			questionSelected: null,
			categorySelected: null,
			language: this.props.language
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({language: this.props.language, questionSelected: null, categorySelected: null})
		}
	}

	handleBack = () => {
		this.setState({categorySelected: null})
	}

	handleQuestionChange = (number) => {
		this.setState({questionSelected: number})
	}


	handleQuestionSelect = () => {
		if (this.state.questionSelected === null) {
			return (
				<HomeCompiler language = {this.state.language}/>
			)
		} else {
			return (
				<QuestionPage language = {this.state.language} question = {this.state.questionSelected}/>
			)
		}
	}

	handleResetHome = () => {
		this.setState({categorySelected: null, questionSelected: null})
	}

	handleCategorySelect = (category) => {
		this.setState({categorySelected: category})
	}

	toggleLists = () => {
		if (this.state.categorySelected === null) {
			return (
				<CategoryList 
					language = {this.state.language}
					action = {{handleCategorySelect: this.handleCategorySelect}}
				/>
			)
		} else {
			return (
				<QuestionList 
					language = {this.state.language}
					category = {this.state.categorySelected}
					action = {{
						handleQuestionChange: this.handleQuestionChange,
						handleResetHome: this.handleResetHome,
						handleBack: this.handleBack
					
					}}
				/>
			)
		}
		
	}
	

    render() {
		console.log(this.state.language)
        return (
            <div style = {{display: 'flex', height: '100%'}}>
              	<Paper className = {this.props.classes.paper}>
					{this.toggleLists()}
              	</Paper>
			  	<Paper className = {this.props.classes.paper1}>
					  {this.handleQuestionSelect()}
				</Paper>
            </div>
        )
    }
}

export default withStyles(useStyles)(CodeMain)
