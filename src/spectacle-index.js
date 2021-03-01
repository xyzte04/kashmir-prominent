import React from "react";
import ReactDOM from "react-dom";
import NameSlide from "./NameSlide";
import CircleTicker from "./CircleTicker";

import {
  FlexBox,
  Heading,
  FullScreen,
  Progress,
  Slide,
  Deck,
  Box,
} from "spectacle";

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans", Helvetica, Arial, sans-serif',
    text: '"Open Sans", Helvetica, Arial, sans-serif',
  },
  colors: {
    primary: "#232323",
    color: "#8ac0c4",
  },
};

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
    </Box>
    <CircleTicker></CircleTicker>
  </FlexBox>
);

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <Slide backgroundColor="primary">
      <FlexBox height="100%">
        <Heading fontSize="7rem">Faces of Kashmir</Heading>
      </FlexBox>
    </Slide>
    {["Mirwaiz", "Babar"].map((nm) => {
      <Slide backgroundColor="primary">
        <FlexBox height="100%">
          <Heading>{name}</Heading>
        </FlexBox>
      </Slide>;
    })}
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById("root"));
