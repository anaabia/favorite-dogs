import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { orange } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    height: '500px',
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));


export default function ImageTable({ itemData, setItemData, favorite }) {
  const classes = useStyles();

    const saveFavorite = (row) => {
        const saved = localStorage.getItem("favorites");
        let newData = saved === null ? [{ ...row, favorite: true}] : [];
        if (saved !== null) {
            const dataLocal = JSON.parse(saved);
            if (dataLocal.find(item => item.url === row.url)) {
                newData = itemData.filter(item => item.url !== row.url);
                if (!favorite) {
                  const list = [...newData, {...row, favorite: false}];
                  setItemData(_.orderBy(list, ['index']))

                }
            } else {
                newData = [...dataLocal, { ...row, favorite: true}];
                if (!favorite) {
                  const list = [...itemData.filter(item => item.url !== row.url), {...row, favorite: true}];
                  setItemData(_.orderBy(list, ['index']))
                }
            }
        } 
        localStorage.setItem('favorites', JSON.stringify(newData))
        if (favorite) {
          setItemData(newData)
        } 
    }

  return (
    <div className={classes.root}>     
    <ImageList rowHeight={200} gap={1} className={classes.imageList}>
        {itemData.map(item => (
          <ImageListItem key={item.url} cols={item.featured ? 2 : 1} rows={item.featured ? 2 : 1}>
            <img src={item.url} alt={'dog'}/>
            <ImageListItemBar
              position="top"
              actionIcon={
                <IconButton aria-label={`star ${item.title}`} onClick={() => saveFavorite(item)} className={classes.icon}>
                  {item.favorite ? <StarIcon style={{ color: orange[500] }} /> : <StarBorderIcon  />}
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}