import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  AnimatedBlurView,
  ClearIcon,
  Container,
  SearchIcon,
  SearchInput,
} from './Search.styles';

interface SearchProps {
  hasResults?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

function Search({ hasResults, value, onChangeText }: SearchProps) {
  const [focused, setFocused] = useState(false);
  const dimensions = useWindowDimensions();
  const blurredBackgroundOpacity = useSharedValue(0);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const onClear = useCallback(() => {
    onChangeText && onChangeText('');
  }, [onChangeText]);

  const animatedBlurBackgroundStyle = useAnimatedStyle(() => ({
    opacity: blurredBackgroundOpacity.value,
  }));

  useEffect(() => {
    const visible = (focused || !isEmpty(value)) && !hasResults;
    blurredBackgroundOpacity.value = withTiming(visible ? 1 : 0);
  }, [blurredBackgroundOpacity, focused, hasResults, value]);

  return (
    <>
      <AnimatedBlurView
        style={[
          animatedBlurBackgroundStyle,
          {
            width: dimensions.width,
            height: dimensions.height * 2,
          },
        ]}
      />
      <Container elevation={6}>
        <SearchIcon />
        <SearchInput
          active={focused}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Search..."
          value={value}
          onChangeText={onChangeText}
        />
        {!isEmpty(value) && (
          <TouchableOpacity onPress={onClear}>
            <ClearIcon />
          </TouchableOpacity>
        )}
      </Container>
    </>
  );
}

export default Search;
