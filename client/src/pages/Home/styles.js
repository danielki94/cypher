import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  // body: {
  //   backgroundImage: 'url(./images/malone1.png)',
  //   backgroundAttachment: "fixed",
  // },
  
  container: {
    margin: "80px auto 0 auto",
    maxWidth: "1200px",
  },
  
  card: {
    display: "flex",
    marginBottom: 20,
  },

  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    padding: 25,
  },

  image: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  content: {
    padding: 25,
  }

}));