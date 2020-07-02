import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { lightBlue, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import GameInfo from './modalComponents/GameInfo.js'

const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
  return (
    <div>
      <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button>
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
          media={
            <GameInfo />
          }
          mediaBackgroundStyle={{ backgroundColor: blue[800] }}
          style={{ backgroundColor: blue[900] }}
          title="John Conway's Game of Life"
          subtitle={`A turing complete, zero player, cellular automaton`}
        />
        <Slide
          media={
            <div>hi there</div>
            
          }
          mediaBackgroundStyle={{ backgroundColor: lightBlue[400] }}
          style={{ backgroundColor: lightBlue[600] }}
          title="Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={
            <div>hello a third time</div>
          }
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          style={{ backgroundColor: green[600] }}
          title="May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
      </AutoRotatingCarousel>
    </div>
  );
};

function InstructionsModal() {
  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Button onClick={handleClick}>Open caroudvdvdvsel</Button>
      <AutoRotatingCarouselModal
        isMobile={matches}
        handleOpen={handleOpen}
        setHandleOpen={setHandleOpen}
      />
    </>
  );
}

export default InstructionsModal