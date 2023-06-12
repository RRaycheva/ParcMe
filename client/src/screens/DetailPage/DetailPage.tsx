import { PARCK_ME_SERVER } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { trigger } from 'react-native-haptic-feedback';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { SharedElement } from 'react-navigation-shared-element';
import { connect } from 'react-redux';
import { CardImage } from '../../components/Card/Card.styles';
import { AddToFavourites, CloseButton } from '../../components/IconButtons';
import { getFavourites } from '../../redux/actions/favourites';
import { RootState } from '../../redux/store';
import garageService, { GarageDto } from '../../services/garageService';
import { HeaderContainer } from './DetailPage.style';

const END_POSITION = 100;

interface DetailPageProps extends StackScreenProps<any> {
  favourites: GarageDto[];
  getFavourites: () => Promise<any>;
}
function DetailPage({
  route,
  navigation,
  favourites,
  getFavourites,
}: DetailPageProps) {
  const { garage } = route.params as any;
  const { pictures, id, name, addressName, description, shareId } =
    garage as GarageDto & { shareId: string };

  const finalize = useSharedValue(false);
  const flicked = useSharedValue(false);
  const started = useSharedValue(0);
  const containerValues = useSharedValue({ x: 0, y: 0, opacity: 1 });
  const isDragging = useSharedValue(false);
  const scrollOffset = useSharedValue(0);

  const isInFavourite = useMemo(
    () => !!favourites.find(e => e.id === id),
    [favourites, id],
  );

  useEffect(() => {
    getFavourites();
  }, [getFavourites]);

  const toggleFavourite = useCallback(async () => {
    if (!id) {
      return;
    }
    isInFavourite
      ? await garageService.removeFromFavourite(id)
      : await garageService.addToFavourite(id);
    await getFavourites();
  }, [id, isInFavourite, getFavourites]);

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      isDragging.value = true;
    })
    .minDuration(100);

  const flingGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      flicked.value = true;
    });

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_e, state) => {
      if ((isDragging.value || flicked.value) && scrollOffset.value <= 0) {
        state.activate();
        if (!started.value) {
          runOnJS(trigger)('impactMedium');
          started.value = 1;
        }
      } else {
        state.fail();
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
      flicked.value = false;
      started.value = 0;
    })
    .onUpdate(e => {
      if (e.translationX < END_POSITION && e.translationY < END_POSITION) {
        finalize.value = false;
      }
      containerValues.value = {
        x: e.translationX,
        y: Math.max(0, e.translationY),
        opacity: 1,
      };
      if (
        (e.translationX > END_POSITION || e.translationY > END_POSITION) &&
        !finalize.value
      ) {
        finalize.value = true;
        runOnJS(trigger)('impactMedium');
      }
    })
    .onEnd(() => {
      if (finalize.value) {
        containerValues.value = withTiming({
          ...containerValues.value,
          opacity: 0,
        });
        runOnJS(navigation.goBack)();
      } else {
        containerValues.value = withTiming({
          x: 0,
          y: 0,
          opacity: 1,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    opacity: containerValues.value.opacity,
    transform: [
      { translateX: containerValues.value.x },
      { translateY: containerValues.value.y },
      { scale: interpolate(started.value, [0, 1], [1, 0.99, 0.95]) },
    ],
  }));

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });

  const renderImage = ({ item, index }) => {
    return (
      <CardImage
        source={{ uri: `${PARCK_ME_SERVER}${item}` }}
        key={`card-image-${index}`}
      />
    );
  };

  const gestures = Gesture.Simultaneous(
    panGesture,
    flingGesture,
    longPressGesture,
  );

  return (
    // Extends bottom scrollable area with border bottom hack
    <Animated.ScrollView
      bounces={false}
      contentContainerStyle={{ flex: 1 }}
      onScroll={scrollHandler}>
      <GestureDetector gesture={gestures}>
        <Animated.View style={animatedStyle}>
          <HeaderContainer>
            <CloseButton />
            <AddToFavourites active={isInFavourite} onPress={toggleFavourite} />
          </HeaderContainer>
          <SharedElement id={`${shareId}-container`}>
            <Carousel
              key={`${shareId}-container`}
              data={pictures || []}
              renderItem={renderImage}
              width={Dimensions.get('screen').width}
              height={300}
              loop={false}
            />
          </SharedElement>
          <View style={{ paddingHorizontal: 8 }}>
            <SharedElement id={`${shareId}-description`}>
              <Text style={{ fontSize: 32 }}>{name}</Text>
            </SharedElement>
            <SharedElement id={`${shareId}-address`}>
              <Text>{addressName}</Text>
            </SharedElement>
            <Animatable.Text
              animation={'fadeIn'}
              delay={300}
              style={{ fontSize: 18, lineHeight: 24, marginVertical: 32 }}>
              {description}
            </Animatable.Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.ScrollView>
  );
}

DetailPage.sharedElements = route => {
  const { garage } = route.params as any;
  return [
    {
      id: `${garage.shareId}-container`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `${garage.shareId}-description`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `${garage.shareId}-address`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

const mapStateToProps = ({ favourites }: RootState) => {
  return {
    favourites,
  };
};
export default connect(mapStateToProps, {
  getFavourites,
})(DetailPage);
