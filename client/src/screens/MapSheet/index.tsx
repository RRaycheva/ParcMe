import { MAPBOX_TOKEN } from '@env';
import BottomSheet from '@gorhom/bottom-sheet';
import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { CameraRef } from '@rnmapbox/maps/lib/typescript/components/Camera';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import styled from 'styled-components';
import MapButton from '../../components/MapButton';
import { GarageDto } from '../../services/garageService';
import { defaultShadow } from '../../theme/theme';
import { getBoundingBoxCorners } from './utils';

Mapbox.setAccessToken(MAPBOX_TOKEN);

const Title = styled(Animated.Text)`
  height: 15%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

interface MapSheetProps {
  title?: string;
  garages: GarageDto[];
  onPress?: (garage: GarageDto) => void;
}
function MapSheet({ title, garages, onPress }: MapSheetProps) {
  const cameraRef = useRef<CameraRef>(null);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentSnapPoint, setSnapPoint] = useState(0);
  const titleAnimationRef = useRef<Animated.Value>(new Animated.Value(0));

  // variables
  const snapPoints = useMemo(
    () => [...(!title ? [] : ['15%']), '85%'],
    [title],
  );

  const sheetIsOpenned = useMemo(
    () => currentSnapPoint === snapPoints.length - 1,
    [currentSnapPoint, snapPoints.length],
  );

  // callbacks
  const handleSheetChanges = useCallback((fromIndex: number, index: number) => {
    setSnapPoint(index);
    Animated.timing(titleAnimationRef.current, {
      toValue: index,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, []);

  const renderMarkers = () => {
    return garages.map(g => (
      <MarkerView
        key={`MarkerView-${g.id}`}
        coordinate={[g.longitude, g.latitude]}
        anchor={{ x: 0.5, y: 0.5 }}
        allowOverlap
        // isSelected={i === selectedIndex}
      >
        <TapGestureHandler onBegan={() => onPress && onPress(g)}>
          <View style={[styles.markerBox]}>
            <Text style={styles.markerText}>{g.pricePerHour}</Text>
          </View>
        </TapGestureHandler>
      </MarkerView>
    ));
  };

  const fitBounds = useCallback(() => {
    const bounds = getBoundingBoxCorners(
      garages.map(g => [g.longitude, g.latitude]),
    );
    cameraRef.current?.fitBounds(bounds.sw, bounds.ne, [50, 50]);
  }, [garages]);

  useEffect(() => {
    sheetIsOpenned && fitBounds();
  }, [garages, fitBounds, sheetIsOpenned]);

  return (
    <>
      {!sheetIsOpenned && (
        <MapButton onPress={() => bottomSheetRef.current?.expand()} />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={!title}
        style={defaultShadow}
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
          attributionEnabled={false}>
          <Camera
            ref={cameraRef}
            defaultSettings={{
              centerCoordinate: [-73.99155, 40.72],
              zoomLevel: 14,
            }}
            centerCoordinate={[-73.99155, 40.72]}
            zoomLevel={14}
          />
          {renderMarkers()}
        </Mapbox.MapView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  markerBox: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'white',
    zIndex: 10,
    ...defaultShadow,
  },
  markerBoxSelected: {
    padding: 12,
  },
  markerText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonsHolder: {
    flex: 0,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  button: {
    flex: 0,
    alignSelf: 'stretch',
  },
  divider: {
    marginVertical: 10,
  },
});
export default React.memo(MapSheet);
