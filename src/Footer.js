import React from 'react'

import Button from '@material-ui/core/Button';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';

import lightBlue from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const iconHoverColor = grey[50]
const iconBackgroundHoverColor = lightBlue[200]

const useStyles = makeStyles({
    icon:{
        color: "#BEBBBB",
        backgroundColor:"#181E28",
        padding:"10px",
        fontSize:"3rem",
        borderRadius:"3px",
        '&:hover': {
            color: iconHoverColor,
            backgroundColor: iconBackgroundHoverColor
          }
    },
    link:{
        color: "steelblue",
        '&:hover': {
            color: "#b1f1fa",
          }
    }
})


export default function Footer(){
    const classes = useStyles()
    return(
        <section className="Footer" style={{minHeight:"15vh"}}>
        <div className="footerContainer" style={{
            marginLeft:"0px",
            paddingLeft:"0px"
        }}>
                <div className="footerLinks">
                
                    <Button href="https://github.com/ShotaKiko/Burger-Builder" 
                        target="mynewtab" rel="noopener noreferrer">
                        <GitHubIcon className={classes.icon}
                            color="primary"
                            style={{ fontSize: 30 }}                     
                        />
                    </Button>
                    
                    <Button href="https://www.linkedin.com/in/shotakikozashvili/" 
                        target="mynewtab" rel="noopener noreferrer">
                        <LinkedInIcon className={classes.icon}
                            color="primary"
                            style={{ fontSize: 30 }}
                        />
                    </Button>
                    
                    <Button target="mynewtab" rel="noopener noreferrer" href="https://drive.google.com/file/d/1aXYJ1N9ycpt3xdpaljfj5_JB1jtheNcv/view?usp=sharing" >
                        <FindInPageIcon  className={classes.icon}
                            color="primary"
                            style={{ fontSize: 30 }}
                        />
                    </Button>

                    <Button target="mynewtab" rel="noopener noreferrer" href="https://www.shotakiko.com/" >
                        <LanguageIcon className={classes.icon}
                            color="primary"
                            style={{ fontSize: 30 }}
                        />
                    </Button>
                </div>

                <Link className={classes.link} href="https://www.shotakiko.com/" >
                    Shota Kikozashvili © 2020
                </Link>

        </div>
        </section>
    )
}