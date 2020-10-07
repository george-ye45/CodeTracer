import { Button, Box, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/theme-monokai";
import "react-notifications/dist/react-notifications.css"
import Typography from '@material-ui/core/Typography'
import API from '../../Services/code.api'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { CodeBlock, monokai } from "react-code-blocks";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = theme => ({
    colorPrimary: {
        color: 'green',
    },
    questionTitle: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    questionDesciption: {
        marginBottom: '10px'
    },
    codeOutput: {
        width: '45%',
        height: '34.5vh',
        marginLeft: '10px',
        borderStyle: 'solid',
        borderRadius: '5px',
        overflow: 'auto',
        backgroundColor: 'white'
    },
    submit: {
        marginTop: '10px',
        variant: 'outlined',
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    clear: {
        marginTop: '10px',
        variant: 'outlined',
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        },
        marginLeft: '10px'
    }
});




class QuestionPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            code: this.props.question.initialCode,
            output: [],
            displaySol: false,
            currentTab: 0,
            loading: false,
            sol: null,
            userAnswer: null,
            language: this.props.question.language
        }
    }

    handleCodeChange = (editor) => {
        this.setState({code: editor})
    }

    componentDidUpdate(prevProps){
        if (prevProps !== this.props) {
            this.setState({code: this.props.question.initialCode, output: []})
            this.setState({currentTab: 0, displaySol: false})
        }
    }

    handleSubmit = (e) => {
        this.setState({loading: true})
        let obj = {
            category: this.props.question.category,
            code: this.state.code,
            question_number: this.props.question.number,
            language: this.props.question.language.toLowerCase()
        }
        API.submitCode(obj).then((results) => {
            results.output = results.output.trim()
            if (!results.output.includes("\n")) {
                NotificationManager.error("Error occured! Check your code")
                this.setState({output: [results.output], loading: false})
            } else {
                let sol = results.output.split("\n").slice(-1)
                let userAnswer = results.output.split("\n").slice(-2, -1)
                if (sol.length === 0) {
                    sol.push("")
                }
                if (sol[0].trim() === userAnswer[0].trim()) {
                    NotificationManager.success("Nice! All tests passed!")
                } else {
                    NotificationManager.error("Test Failed! Check the output and your code again!")
                }
                this.setState({output: results.output.split("\n").slice(0, -2), loading: false})
            }
        })
    }

    handleToggle = () => {
        this.setState({displaySol: !this.state.displaySol})
    }

    

    handleTabChange = (event, newValue) => {
        this.setState({currentTab: newValue})
    }

    toggleDisplay = () => {
        const question = this.props.question
        if (this.state.currentTab === 0) {
            return (
                <div style = {{height: '100%', overflowY: 'auto'}}>
                    <NotificationContainer/>
                    <Tabs
                        value={this.state.currentTab}
                        variant="fullWidth"
                        onChange = {this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Description" />
                        <Tab label="Solution" />
                    </Tabs>
                    <div className = {this.props.classes.questionTitle}>
                        <Typography color = 'textPrimary' variant = "h5">
                            <b>{question.title}</b>
                        </Typography>
                        <div style = {{display: 'flex'}}>
                        </div>
                    </div>
                    <div className = {this.props.classes.questionDesciption}>
                        <Typography color = 'textPrimary' variant = 'body2' >
                            {question.description}
                        </Typography>
                    </div>
                    <div className = {this.props.classes.questionDesciption}>
                        <div className = {this.props.classes.questionTitle}>
                            <Typography color = 'textPrimary' variant = "subtitle1">
                                <b>Test Cases:</b>
                            </Typography>
                        </div>
                        {question.sampleTestCases.map((item) => (
                            <Typography variant = 'body2' color = 'textPrimary' key = {item}>
                                {item}
                            </Typography>
                        ))}
                    </div>
                    <div style = {{display: 'flex'}}>
                    <AceEditor
                    mode={this.state.language}
                    theme="monokai"
                    name="blah2"
                    height = {"35vh"}
                    width = {"55%"}
                    onLoad={this.onLoad}
                    onChange={this.handleCodeChange}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.state.code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                        }}
                    />
                    <Box className = {this.props.classes.codeOutput} component="div" whiteSpace="nowrap">
                            { this.state.loading ?
                                <LinearProgress/> : null
                            }
                            <Typography color = 'textPrimary'><b>Output:</b><br/></Typography>
                        {this.state.output.map((item) => (
                                <Typography variant = 'body2' color = 'textPrimary' key = {item + (Math.random() * 10000)}>
                                    {item}
                                </Typography>
                        ))}
                    </Box>
                    </div>
                    <Button onClick = {(e) => {this.handleSubmit()}}className = {this.props.classes.submit}>Run</Button>
                    <Button onClick = {(e) => this.setState({code: '', output: []})}className = {this.props.classes.clear}>Clear</Button>
                    <Box style = {{marginTop: '20px'}}component="div" whiteSpace="nowrap">
                        <Typography color = 'textPrimary'><b>Notes:</b><br/></Typography>
                        {question.notes.map((item) => (
                            <Typography variant = 'body2' color = 'textPrimary' key = {item}>
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </div>
            )

        } else {
            return(
                <div>
                <NotificationContainer/>
                <Tabs
                    value={this.state.currentTab}
                    variant="fullWidth"
                    onChange = {this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    style = {{marginBottom: '20px'}}
                >
                    <Tab label="Description" />
                    <Tab label="Solution" />
                </Tabs>
                <Typography color = 'textPrimary' variant = "h5">
                            <b>{question.title} solution</b>
                </Typography>
                <CodeBlock
                theme ={monokai}
                language={this.state.language}
                text={this.props.question.solution}
                showLineNumbers={true}
                wrapLines={true}
                codeBlock
            />
            </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.toggleDisplay()}
            </div>
        )
    }
}


export default withStyles(useStyles)(QuestionPage)