import {
  Box,
  Fade,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { CgRepeat } from "react-icons/cg";
import { IoIosShuffle } from "react-icons/io";

type Props = {
  volume: number;
  onVolumeChange: (volume: number) => void;
};

export const PlayerRightControls = ({ volume, onVolumeChange }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  const showSlider = () => !isOpen && onToggle();
  const hideSlider = () => isOpen && onToggle();
  const onSliderChange = (val: number) => onVolumeChange(val);
  return (
    <Box
      display={"flex"}
      gap={"4"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      color={"white"}
      onMouseLeave={hideSlider}
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
      <button onMouseOver={showSlider}>
        {volume === 0 ? (
          <FaVolumeMute className="player-next-prev-btn" />
        ) : (
          <FaVolumeDown className="player-next-prev-btn" />
        )}
      </button>
      <button>
        <CgRepeat className="player-next-prev-btn" />
      </button>
      <button>
        <IoIosShuffle className="player-next-prev-btn" />
      </button>
    </Box>
  );
};
