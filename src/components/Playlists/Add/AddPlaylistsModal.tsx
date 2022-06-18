import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { YTButton } from "../../Common/YTButton";

type Props = {
  isOpen: boolean;
  error?: string;
  onClose: () => void;
  onConfirm: (urls: string[]) => void;
};

export const AddPlaylistsModal = ({
  isOpen,
  error,
  onClose,
  onConfirm,
}: Props) => {
  const [playlistsStr, setPlaylistsStr] = useState("");
  const initialRef = useRef<HTMLTextAreaElement>(null);

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
          <Text color={"white"} fontWeight={"semibold"} fontSize="lg" mb={"3"}>
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
        </ModalBody>
        <ModalFooter isolation={"isolate"}>
          <YTButton onClick={confirmLoad}>Confirm</YTButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
