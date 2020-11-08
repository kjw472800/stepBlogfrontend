import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Box,IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.light,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const Footer= (props) =>{
    const classes = useStyles();
    const { description, title } = props;
  
    return (
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          {/* <Box display="flex" justifyContent="center" >
                  <IconButton aria-label="github" href="https://github.com/kjw472800">
                      <GitHubIcon />
                  </IconButton>
                  <IconButton aria-label="Linkedln" href="https://www.linkedin.com/in/jiunan-fang-7661b91b7/" >
                      <LinkedInIcon />
                  </IconButton>
          </Box> */}
          <Copyright />
        </Container>
      </footer>
    );
  }


export default Footer;

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
