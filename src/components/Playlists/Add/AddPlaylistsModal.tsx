import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { YTButton } from "../../Common/YTButton";
import { SearchPlaylists } from "./SearchPlaylists";

type Props = {
  isOpen: boolean;
  error?: string;
  onClose: () => void;
  onConfirm: (urls: string[]) => void;
  search: {
    loading: boolean;
    playlists: gapi.client.youtube.SearchResult[] | undefined;
    existingPlaylistsIds: string[];
    addPlaylist: (id: string) => void;
    onSearch: (name: string) => void;
  };
};

export const AddPlaylistsModal = ({
  isOpen,
  error,
  onClose,
  onConfirm,
  search,
}: Props) => {
  const [playlistsStr, setPlaylistsStr] = useState("");
  const initialRef = useRef<HTMLTextAreaElement>(null);

  const tabSelectedStyle = {
    color: "white",
    fontWeight: "600",
    bg: "gray.600",
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPlaylistsStr(e.target.value);
  const confirmLoad = () => {
    onConfirm(playlistsStr.split("\n"));
    setPlaylistsStr("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      size={"2xl"}
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(6px)" />
      <ModalContent bg={"black"} color={"white"}>
        <ModalHeader>Add playlists</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant={"soft-rounded"} isFitted>
            <TabList>
              <Tab
                color={"gray.300"}
                bg={"gray.800"}
                mr={"4"}
                _selected={tabSelectedStyle}
              >
                Add manually
              </Tab>
              <Tab
                color={"gray.300"}
                bg={"gray.800"}
                _selected={tabSelectedStyle}
              >
                Search playlists
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  fontSize="lg"
                  mb={"3"}
                >
                  Enter YouTube playlists urls (each on new line)
                </Text>
                <Textarea
                  placeholder="Ex: https://www.youtube.com/playlist?list=xxxxxxxxxxxxxxxxxxxxxx"
                  resize={"none"}
                  h="200px"
                  color={"white"}
                  value={playlistsStr}
                  onChange={onChange}
                  isInvalid={Boolean(error)}
                  ref={initialRef}
                />
              </TabPanel>
              <TabPanel>
                <SearchPlaylists {...search} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter isolation={"isolate"}>
          <YTButton onClick={confirmLoad}>Confirm</YTButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
