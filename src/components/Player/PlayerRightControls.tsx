import {
  Box,
  Fade,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { MdRepeat, MdRepeatOne } from "react-icons/md";
import { YoutubeRepeatState } from "../../hooks/playlist";

type Props = {
  volume: number;
  repeatState: YoutubeRepeatState;
  onVolumeChange: (volume: number) => void;
  onRepeat: (newState: YoutubeRepeatState) => void;
};

export const PlayerRightControls = ({
  volume,
  repeatState,
  onVolumeChange,
  onRepeat,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTooltipOpen,
    onOpen: openTooltip,
    onClose: closeTooltip,
  } = useDisclosure();

  const onSliderChange = (val: number) => onVolumeChange(val);
  const onRepeatToggle = () => {
    if (repeatState === YoutubeRepeatState.none) {
      onRepeat(YoutubeRepeatState.playlist);
    } else if (repeatState === YoutubeRepeatState.playlist) {
      onRepeat(YoutubeRepeatState.video);
    } else {
      onRepeat(YoutubeRepeatState.none);
    }
  };

  return (
    <Box
      className={"player-controls-right"}
      display={"flex"}
      gap={"4"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      color={"gray.400"}
      pos={"relative"}
      onMouseLeave={onClose}
    >
      <Fade in={isOpen} unmountOnExit>
        <Slider
          min={0}
          max={100}
          defaultValue={volume}
          orientation={"horizontal"}
          w={"100px"}
          onChange={onSliderChange}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
        >
          <SliderTrack bg={"gray.500"}>
            <SliderFilledTrack bg={"white"} />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="gray.600"
            color="white"
            placement="top"
            isOpen={isTooltipOpen}
            label={`${volume}%`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Fade>
      <button onMouseOver={onOpen} className={"volume-btn"}>
        {volume === 0 ? (
          <FaVolumeMute className="player-right-controls" />
        ) : (
          <FaVolumeDown className="player-right-controls" />
        )}
      </button>
      <button onClick={onRepeatToggle}>
        {repeatState === YoutubeRepeatState.none ? (
          <MdRepeat className="player-right-controls" />
        ) : repeatState === YoutubeRepeatState.playlist ? (
          <MdRepeat className="player-right-controls color-white" />
        ) : (
          <MdRepeatOne className="player-right-controls color-white" />
        )}
      </button>
    </Box>
  );
};
