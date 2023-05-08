import React from 'react';
import { TextInput } from 'react-native';
import { Container, SearchIcon } from './Search.styles';

function Search() {
  return (
    <Container elevation={6}>
      <SearchIcon />
      <TextInput placeholder="Search..." />
    </Container>
  );
}

export default Search;
