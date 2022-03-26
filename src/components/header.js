import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'flex',
    }
  }));

const Header = ({ title, buttonName, path }) => {
  const classes = useStyles();

    return (
        <Grid container  >
            <Grid item xs={12}  justifyContent="flex-end" className={classes.button}>
                <Button component={Link} to={path} variant="contained" color="primary">
                    {buttonName}
                </Button>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="h4" component="h1" gutterBottom>
                    {title}
                </Typography>
            </Grid>

        </Grid>
    );


}

export default Header;