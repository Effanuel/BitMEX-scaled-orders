import React from 'react';
import {Flex, Heading, Box} from '@chakra-ui/react';
import {SettingsIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import {RoutePath} from 'pages/paths';

const MenuItem = ({children, to}: any) => (
  <Heading marginRight={3} marginLeft={3}>
    <Link to={to} style={{textDecoration: 'none', color: 'white'}}>
      {children}
    </Link>
  </Heading>
);

export function Header() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#1e1e1e"
      color="white"
      borderBottomColor="green"
      borderBottomWidth={2}
    >
      <Box display="flex" width="auto" alignItems="center">
        <MenuItem to={RoutePath.Home}>Home</MenuItem>
        <MenuItem to={RoutePath.BitMex}>BitMeX</MenuItem>
        <MenuItem to={RoutePath.BitmexTest}>BitMex Testnet</MenuItem>
      </Box>

      <Box display="flex">
        <Link to={RoutePath.Settings} style={{textDecoration: 'none', color: 'white'}}>
          <SettingsIcon width={25} height={25} _hover={{cursor: 'pointer', color: 'green'}} />
        </Link>
      </Box>
    </Flex>
  );
}
