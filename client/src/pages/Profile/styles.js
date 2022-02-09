import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  container: {
    margin: "80px auto 0 auto",
    maxWidth: "1200",
  },

  // container: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(8, 0, 6),
   
  // },

  image: {
    minWidth: 200,
    
  },

  icon: {
    marginRight: '20px',
  },

  cardGrid: {
    padding: '20px 0',
  },

  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  button: {
    marginTop: '40px',
  },

  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },

  cardContent: {
    flexGrow: 1,
  },



}));