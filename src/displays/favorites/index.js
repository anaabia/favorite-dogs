import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ImageList from '../../components/ImageTable';
import Header from '../../components/header';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}));

const Favorites = () => {
  const classes = useStyles();
  const [itemData, setItemData] = useState(JSON.parse(localStorage.getItem("favorites")));

  return (
      <Container component="main" className={classes.main} maxWidth="md">
        <Header title="Favorites"  buttonName="Choose more" path="/"/>
        <ImageList setItemData={setItemData} itemData={itemData} favorite />
      </Container>
  );
}

export default Favorites;