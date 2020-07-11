import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { lightBlue, blueGrey } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import GameInfo from './modalComponents/GameInfo.js'
import GameUtility from './modalComponents/GameUtility.js'
import GameHowTo from './modalComponents/GameHowTo.js'

import { makeStyles } from '@material-ui/core/styles';

const unactiveButtonColor = "steelBlue"
const unactiveButtonFontColor = "#b1f1fa"

const activeButtonColor = "#b1f1fa"
const activeButtonFontColor = "steelBlue"

const useStyles = makeStyles((theme)=> ({
  booton:{
      color: unactiveButtonFontColor,
      backgroundColor:unactiveButtonColor,
      padding:"7px",
      fontSize:".9rem",
      // borderRadius:"3px",
      '&:hover': {
          color: activeButtonFontColor,
          backgroundColor: activeButtonColor
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        fontSize:".8rem"
      },
      [theme.breakpoints.down('xs')]: {
        fontSize:".6rem"
      },
  },
}))



const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
  return (
    <div>
      {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
      <AutoRotatingCarousel
        label="Get started"
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        autoplay={false}
        mobile={isMobile}
        style={{ position: "absolute" }}
      >
        <Slide
          media={ <GameInfo /> }
          mediaBackgroundStyle={{ backgroundColor: lightBlue[800] }}
          style={{ backgroundColor: lightBlue[900] }}
          title="John Conway's Game of Life"
          subtitle={`A turing complete, zero player, cellular automaton`}
        />
        <Slide
          media={ <GameUtility /> }
          mediaBackgroundStyle={{ backgroundColor: blueGrey[700] }}
          style={{ backgroundColor: blueGrey[900] }}
          title="Modeling physical systems"
          subtitle=" ┬─┬ノ( º _ ºノ) Please proceed to game instructions! ---->"
        />
        <Slide
          media={ <GameHowTo /> }
          mediaBackgroundStyle={{ backgroundColor: blueGrey[500] }}
          style={{ backgroundColor: blueGrey[700] }}
          title="App Instructions"
          subtitle="No more tutorials (┛ಠ_ಠ)┛彡┻━┻ Have fun!!" 
        />
      </AutoRotatingCarousel>
    </div>
  );
};

function InstructionsModal() {
  const [handleOpen, setHandleOpen] = useState({ open: true });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width:600px)");
  const classes = useStyles()
  return (
    <>
      <Button className ={classes.booton} onClick={handleClick}>View Instructions</Button>
      <AutoRotatingCarouselModal
        isMobile={matches}
        handleOpen={handleOpen}
        setHandleOpen={setHandleOpen}
      />
    </>
  );
}

export default InstructionsModal