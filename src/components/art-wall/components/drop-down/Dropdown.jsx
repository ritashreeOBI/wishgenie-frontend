import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

function Dropdown() {
  return (
<Menu>
  <MenuButton as={Button} variant={'ghost'} rightIcon={<ChevronDownIcon />}>
    Explore
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
  )
}

export default Dropdown