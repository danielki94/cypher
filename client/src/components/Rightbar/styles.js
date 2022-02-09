import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },

  rightbarFollowingImg: {
    width: "100px",
    height: "100px",
    // borderRadius: "5px",
  },

  rightbarFollowings: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  rightbarFollowing: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
    cursor: "pointer",
  },

  text: {
    marginTop: 20,
  }
  


}));