// src/components/ColorModeSwitcher.jsx
import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ColorModeSwitcher = ({ label ,...props }) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue('dark', 'light');

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={label ? label : `Switch to ${text} mode`}
      variant="ghost"
      color="current"
      // marginLeft="2"
      position={"fixed"}
      zIndex ={'overlay'}
      top="4"
      right="4"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}  // Spread additional props here
    />
  );
};

export default ColorModeSwitcher;
