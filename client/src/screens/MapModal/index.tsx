import { MAPBOX_TOKEN } from '@env';
import BottomSheet from '@gorhom/bottom-sheet';
import Mapbox from '@rnmapbox/maps';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import MapButton from '../../components/MapButton';

Mapbox.setAccessToken(MAPBOX_TOKEN);

const Title = styled(Animated.Text)`
  height: 15%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

interface MapSheetProps {
  title?: string;
}
function MapSheet({ title }: MapSheetProps) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentSnapPoint, setSnapPoint] = useState(0);
  const titleAnimationRef = useRef<Animated.Value>(new Animated.Value(0));

  // variables
  const snapPoints = useMemo(
    () => [...(!title ? [] : ['15%']), '85%'],
    [title],
  );

  // callbacks
  const handleSheetChanges = useCallback((fromIndex: number, index: number) => {
    console.log(fromIndex, index);
    setSnapPoint(index);
    Animated.timing(titleAnimationRef.current, {
      toValue: index,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      {currentSnapPoint !== snapPoints.length - 1 && (
        <MapButton onPress={() => bottomSheetRef.current?.expand()} />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={!title}
        style={{
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowColor: 'black',
        }}
        onAnimate={handleSheetChanges}>
        {title && (
          <Title
            style={{
              opacity: titleAnimationRef.current.interpolate({
                inputRange: [-1, ...snapPoints.map((_e, i) => i)],
                outputRange: [1, 1, 0],
              }),
              height: titleAnimationRef.current.interpolate({
                inputRange: [-1, ...snapPoints.map((_e, i) => i)],
                outputRange: ['15%', '15%', '0%'],
              }),
            }}>
            {title}
          </Title>
        )}
        <Mapbox.MapView
          style={{ flex: 1 }}
          logoEnabled={false}
          compassEnabled
          compassPosition={{ bottom: 8, left: 8 }}
          scaleBarPosition={{ bottom: 8, right: 32 }}
          attributionEnabled={false}
        />
      </BottomSheet>
    </>
  );
}

export default React.memo(MapSheet);
