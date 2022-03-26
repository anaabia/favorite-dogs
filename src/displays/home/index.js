import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ImageList from '../../components/ImageTable';
import { IconButton, Box } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Header from '../../components/header';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}));

const Home = () => {
  const classes = useStyles();
  const [searchingImg, setSearchingImg] = useState(true);
  const [itemData, setItemData] = useState([]);
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  useEffect(() => {
    if (searchingImg) {
        newPictures();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchingImg])

const newPictures = async () => {
  setSearchingImg(false);
  const images = []
  while (images.length === 0 || images.length % 6 !== 0) {
  await  fetch("https://random.dog/woof.json").then(res => res.json()).then(
       (result) => {
               const validImage = new RegExp(
               '.(jpg|png|gif)$'
            );
           if (validImage.test(result.url)) {
               images.push({
                 ...result, 
                 favorite: favorites.find(item => item.url === result.url) ? true: false, 
                 index: itemData.length + images.length + 1
                });
           }
       }) 
  } 
  setItemData([...itemData, ...images])
}

  return (
      <Container component="main" className={classes.main} maxWidth="md">
        <Header title="Choose your favorite Dogs" buttonName="Favorites" path="/favorites" />
        <Box display="flex" justifyContent="center">
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
              setSearchingImg(true);
          }}>
            <RefreshIcon />
          </IconButton>
        </Box>
        <ImageList itemData={itemData} setItemData={setItemData} />
      </Container>
  );
}

export default Home;