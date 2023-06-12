import { PARCK_ME_SERVER } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { trigger } from 'react-native-haptic-feedback';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { SharedElement } from 'react-navigation-shared-element';
import { GarageDto } from '../../services/garageService';
import { CardImage } from '../Card/Card.styles';
import CloseButton from '../CloseButton';

const END_POSITION = 100;

type DetailPageProps = StackScreenProps<any>;
function DetailPage({ route, navigation }: DetailPageProps) {
  const { garage } = route.params as any;
  const { pictures, id, name, addressName } = garage as GarageDto;

  const finalize = useSharedValue(false);
  const flicked = useSharedValue(false);
  const started = useSharedValue(false);
  const containerValues = useSharedValue({ x: 0, y: 0, opacity: 1 });
  const isDragging = useSharedValue(false);
  const scrollOffset = useSharedValue(0);

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
          started.value = true;
        }
      } else {
        state.fail();
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
      flicked.value = false;
      started.value = false;
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
    opacity: containerValues.value.opacity,
    transform: [
      { translateX: containerValues.value.x },
      { translateY: containerValues.value.y },
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
      style={{ borderBottomColor: 'white', borderBottomWidth: 400 }}
      onScroll={scrollHandler}>
      <GestureDetector gesture={gestures}>
        <Animated.View
          style={[
            animatedStyle,
            {
              backgroundColor: 'white',
              flex: 1,
              borderRadius: 8,
              overflow: 'hidden',
            },
          ]}>
          <View style={{ position: 'absolute', zIndex: 10, top: 32 }}>
            <CloseButton />
          </View>
          <SharedElement id={`${id}-container`}>
            <Carousel
              key={`${id}-container`}
              data={pictures || []}
              renderItem={renderImage}
              width={Dimensions.get('screen').width}
              height={300}
              loop={false}
            />
          </SharedElement>
          <View style={{ paddingHorizontal: 8 }}>
            <SharedElement id={`${id}-description`}>
              <Text style={{ fontSize: 32 }}>{name}</Text>
            </SharedElement>
            <SharedElement id={`${id}-address`}>
              <Text>{addressName}</Text>
            </SharedElement>
            <Animatable.Text
              animation={'fadeIn'}
              delay={300}
              style={{ fontSize: 18, lineHeight: 24, marginVertical: 32 }}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words
              etc.There are many variations of passages of Lorem Ipsum
              available, but the majority have suffered alteration in some form,
              by injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words
              etc.There are many variations of passages of Lorem Ipsum
              available, but the majority have suffered alteration in some form,
              by injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words
              etc.There are many variations of passages of Lorem Ipsum
              available, but the majority have suffered alteration in some form,
              by injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
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
      id: `${garage.id}-container`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `${garage.id}-description`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `${garage.id}-address`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default DetailPage;
