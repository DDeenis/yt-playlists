import {
  Box,
  Fade,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { MdRepeat, MdRepeatOne } from "react-icons/md";
import { IoIosShuffle } from "react-icons/io";
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
      display={"flex"}
      gap={"4"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      color={"gray.400"}
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
        >
          <SliderTrack bg={"gray.500"}>
            <SliderFilledTrack bg={"white"} />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Fade>
      <button onMouseOver={onOpen}>
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
      <button>
        <IoIosShuffle className="player-right-controls player-mix-btn" />
      </button>
    </Box>
  );
};
