import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { PlaylistsFilter } from "../../hooks/storage";
import "./styles.css";

type Props = {
  filter: PlaylistsFilter;
  onFilterChange: (filter: string) => void;
  onOrderChange: (order: PlaylistsFilter["orderBy"]) => void;
};

export const LibraryControls = ({
  filter,
  onFilterChange: onFilter,
  onOrderChange: onOrder,
}: Props) => {
  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(e.target.value);
  };

  const onOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onOrder(e.target.value as PlaylistsFilter["orderBy"]);
  };

  return (
    <Box display={"flex"} gap={4}>
      <InputGroup className="filter-block-input">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={<FaFilter />}
        />
        <Input
          color={"white"}
          placeholder={"Filter by name"}
          value={filter.filter ?? ""}
          onChange={onFilterChange}
        />
      </InputGroup>
      <Box w={"full"} className={"filter-block-input filter-block-select"}>
        <Select
          variant={"outline"}
          color={"white"}
          defaultValue={"descending"}
          onChange={onOrderChange}
        >
          <option value={"descending"}>Descending</option>
          <option value={"ascending"}>Ascending</option>
        </Select>
      </Box>
    </Box>
  );
};
