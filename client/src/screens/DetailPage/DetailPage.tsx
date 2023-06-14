import { PARCK_ME_SERVER } from '@env';
import { Route } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { isNil } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { trigger } from 'react-native-haptic-feedback';
import { Button } from 'react-native-paper';
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
import { ProfilePicture } from '../../components/MessageListItem/style';
import { getFavourites } from '../../redux/actions/favourites';
import { RootState } from '../../redux/store';
import { AuthResponseDto } from '../../services/authService';
import garageService, { GarageDto } from '../../services/garageService';
import { HeaderContainer, HostInfoContainer } from './DetailPage.style';

const END_POSITION = 100;

interface DetailPageProps extends StackScreenProps<any> {
  favourites: GarageDto[];
  user: AuthResponseDto['user'];
  getFavourites: () => Promise<any>;
}
function DetailPage({
  route,
  navigation,
  favourites,
  user,
  getFavourites,
}: DetailPageProps) {
  const { garage } = route.params as any;
  const {
    pictures,
    id,
    name,
    addressName,
    description,
    shareId,
    approved,
    user: host,
  } = garage as GarageDto & { shareId: string };

  const finalize = useSharedValue(false);
  const flicked = useSharedValue(false);
  const started = useSharedValue(0);
  const containerValues = useSharedValue({ x: 0, y: 0, opacity: 1 });
  const isDragging = useSharedValue(false);
  const scrollOffset = useSharedValue(0);
  const carouselContainerRef = useRef<any>(null);

  const isInFavourite = useMemo(
    () => !!favourites.find(e => e.id === id),
    [favourites, id],
  );

  const isPendingAproval = useMemo(
    () => !approved && user?.isAdmin,
    [user?.isAdmin, approved],
  );

  useEffect(() => {
    getFavourites();
  }, [getFavourites]);

  // useEffect(() => {
  //   const carouselContainer = carouselContainerRef.current;
  //   return () => {
  //     carouselContainer.transitionTo({ opacity: 0 });
  //   };
  // }, []);

  const toggleFavourite = useCallback(async () => {
    if (!id) {
      return;
    }
    trigger('notificationSuccess');
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
    .direction(Directions.DOWN | Directions.RIGHT)
    .onStart(() => {
      flicked.value = true;
    });

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((e, state) => {
      if (
        ((isDragging.value || flicked.value) && scrollOffset.value <= 0) ||
        e.changedTouches[0].x < 25
      ) {
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

  const handleApproval = useCallback(() => {
    if (isNil(id)) {
      return;
    }
    Alert.alert(
      'Approval',
      'Do you approve this garage request?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await garageService.approve(id);
            navigation.goBack();
          },
          style: 'default',
        },
      ],
      {
        cancelable: false,
      },
    );
  }, [id, navigation]);

  const contackHost = useCallback(() => {
    if (host.id === user.id) {
      Alert.alert('Ooops', 'You can not contact yourself');
      return;
    }
    navigation.navigate('ChatPage', { receiver: host });
  }, [host, user, navigation]);

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
            <Animatable.View ref={carouselContainerRef}>
              <Carousel
                key={`${shareId}-container`}
                data={pictures || []}
                renderItem={renderImage}
                width={Dimensions.get('screen').width}
                height={300}
                loop={false}
              />
            </Animatable.View>
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
            <HostInfoContainer>
              <Text>Hosted by {host.name}</Text>
              <ProfilePicture
                source={{ uri: `${PARCK_ME_SERVER}${host.profile_picture}` }}
              />
            </HostInfoContainer>
            <Button mode="outlined" onPress={contackHost}>
              Contack host
            </Button>
            {isPendingAproval && (
              <Button onPress={handleApproval}>Approve</Button>
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.ScrollView>
  );
}

DetailPage.sharedElements = (route: Route<any>, otherRoute: Route<any>) => {
  const { garage, disableSharedTransition } = route.params as any;
  // Do not transition when going to Chat
  if (otherRoute.name === 'ChatPage' || disableSharedTransition) {
    return [];
  }
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

const mapStateToProps = ({ favourites, auth }: RootState) => {
  return {
    favourites,
    user: auth.user,
  };
};
export default connect(mapStateToProps, {
  getFavourites,
})(DetailPage);
