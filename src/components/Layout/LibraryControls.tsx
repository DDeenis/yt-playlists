import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdAudiotrack } from "react-icons/md";
import "./styles.css";

type Props = {};

export const LibraryControls = (props: Props) => {
  const [filter, setFilter] = useState<string>();
  const [tracksCount, setTracksCount] = useState<number>();

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const onTracksCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTracksCount(parseInt(e.target.value));
  };

  return (
    <Box display={"flex"} gap={4}>
      <InputBlock
        icon={<FaFilter />}
        input={{
          placeholder: "Filter by name",
          value: filter,
          onChange: onFilterChange,
        }}
      />
      <InputBlock
        icon={<MdAudiotrack />}
        input={{
          placeholder: "Tracks count",
          value: tracksCount,
          onChange: onTracksCountChange,
          type: "number",
          inputMode: "numeric",
        }}
      />
    </Box>
  );
};

type InputBlockProps = {
  icon: JSX.Element;
  input: InputProps;
};

const InputBlock: React.FC<InputBlockProps> = ({ icon, input }) => {
  return (
    <InputGroup className="filter-block-input">
      <InputLeftElement pointerEvents="none" color="gray.300" children={icon} />
      <Input color={"white"} {...input} />
    </InputGroup>
  );
};
