import { Button, Box, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import Typography from '@material-ui/core/Typography'
import CodeAPI from './../Services/code.api'
import LinearProgress from '@material-ui/core/LinearProgress'


const useStyles = theme => ({
    questionTitle: {
        marginBottom: '10px'
    },
    questionDesciption: {
        marginBottom: '10px'
    },
    codeOutput: {
        width: '100%',
        height: '25.5vh',
        borderRadius: '5px',
        overflow: 'auto',
        marginTop: '10px',
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




class HomeCompiler extends Component {

    constructor(props) {
        super(props)
        let codeStart = {
            "python": 'print("Hello World!")',
            "javascript":'console.log("Hello World!")',
            "java":'public class HelloWorld{\n\n     public static void main(String []args){\n        System.out.println("Hello World");\n     }\n}'
        }
        this.state = {
            code: codeStart[this.props.language],
            output: [],
            loading: false,
            language: this.props.language
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let codeStart = {
            "python": 'print("Hello World!")',
            "javascript":'console.log("Hello World!")',
            "java":'public class HelloWorld{\n\n     public static void main(String []args){\n        System.out.println("Hello World");\n     }\n}'
        }
        if (this.props !== prevProps) {
            this.setState({code: codeStart[this.props.language], language: this.props.language, output: []})
        }
    }

    handleCodeChange = (editor) => {
        this.setState({code: editor})
    }

    handleSubmit = (e) => {
        this.setState({loading: true})
        let obj = {
            code: this.state.code,
            question_number: null,
            language: this.state.language.toLowerCase()
        }
        CodeAPI._submit(obj).then((results) => {
            this.setState({output: results.user.output.split("\n"), loading: false})
        })
    }

    render() {
        return (
            <div style = {{height: '100%', display: 'flex', flexDirection: 'column'}} >
                <div className = {this.props.classes.questionTitle}>
                    <Typography color = 'textPrimary' variant = "h5">
                        <b>No problem selected</b>
                    </Typography>
                </div>
                <div className = {this.props.classes.questionDesciption}>
                    <Typography color = 'textPrimary'>
                        Select a problem to begin!
                    </Typography>
                    <Typography color = 'textPrimary'>
                        Otherwise, enjoy this Online {this.state.language} Compiler! Write your code in this editor and press "Run" button to execute it.
                    </Typography>
                </div>
                <div style = {{display: 'flex'}}>
                <AceEditor
                mode={this.state.language.toLowerCase()}
                theme="monokai"
                name="blah2"
                height = {"30vh"}
                width = {"100%"}
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
                    tabSize: 4,
                    }}
                />
                </div>
                <div style = {{display: 'flex'}}>
                <Button onClick = {(e) => {this.handleSubmit()}}className = {this.props.classes.submit}>Run</Button>
                <Button onClick = {(e) => this.setState({code: '', output:[]})}className = {this.props.classes.clear}>Clear</Button>
                </div>
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
        )
    }
}


export default withStyles(useStyles)(HomeCompiler)