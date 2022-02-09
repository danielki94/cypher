import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    display: "inline-flex",
    // marginRight: 20,
    // marginBottom: 20,
    padding: 10,
    position: "relative",
  },

  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    padding: 25,
  },

  image: {
    minWidth: 250,
    height: 250,
  },

  avatarImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  content: {
    padding: 25,
    objectFit: 'cover',
  },

  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    float: "right",
  },



}));