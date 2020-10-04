import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import API from './../Services/code.api'
import Divider from '@material-ui/core/Divider';

export default class CategoryList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             categories: [],
             language: this.props.language
        }
    }

    componentDidMount(){
        API._getCategories().then((data) =>{
            let arr = data.data.filter(item => item.language === this.state.language)
            this.setState({categories: arr})
        })
    }

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
            this.setState({language: this.props.language})
            API._getCategories().then((data) =>{
                console.log("In categories", this.state.language)
                let arr = data.data.filter(item => item.language === this.state.language)
                this.setState({categories: arr})
            })
		}
	}

    render() {
        console.log(this.state.categories)
        return (
            <div style = {{width: '100%'}}>
                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography color = 'textPrimary' variant = 'h6'>Categories</Typography>
                </div>
                <Divider variant = 'middle'/>
                 <List style = {{overflowY: 'auto', height: 'calc(100vh - 205px)', width: '100%'}} >
                {this.state.categories.length === 0 ? <Typography color = 'textPrimary'>Questions coming soon!</Typography> : null}
                {this.state.categories.map(category => (
                    <div key = {category._id}>
                        <ListItem
                            style = {{marginBottom: '10px', borderStyle: 'solid', borderWidth: '2px', borderColor: 'white', borderRadius: '10px'}} 
                            onClick = {(e) => this.props.action.handleCategorySelect(category.category_name)}button
                            
                            >
                            <ListItemText
                                primary={category.category_name}
                                secondary={category.description}
                                primaryTypographyProps = {{color: 'textPrimary'}}
                            />
                        </ListItem>
                        <Divider variant = 'middle'/>
                    </div>

                ))}
                 </List>

                
            </div>
        )
    }
}
