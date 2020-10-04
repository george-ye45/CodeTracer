import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let arr = ["python", "javascript", "java"]
    props.actions.handleLangChange(arr[newValue])
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        
        value={value}
        variant="fullWidth"
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Python" />
        <Tab label="Javascript" />
        <Tab label="Java" />
      </Tabs>
    </Paper>
  );
}