import { MAPBOX_TOKEN } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import { debounce } from 'lodash';
import React, { useDeferredValue, useEffect, useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import Button from '../../components/Button';
import CustomTextInput from '../../components/TextInput';
import { theme } from '../../theme/theme';
import {
  CloseButtonContainer,
  LocationOverlay,
  SearchContainer,
  SearchItemSubText,
  SearchItemText,
  SearchItemView,
} from './AddNewPlace.style';

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const baseClient = mbxClient({ accessToken: MAPBOX_TOKEN });
const geocodingService = mbxGeocoding(baseClient);

type Props = StackScreenProps<any>;
function AddNewPlace({ navigation }: Props) {
  const [garageName, setGarageName] = useState<any>({ value: '', error: '' });
  const [locationQuery, setLocationQuery] = useState({ value: '', error: '' });
  const [locationSearchActive, setLocationSearchActive] = useState(false);
  const [price, setPrice] = useState({ value: '', error: '' });
  const [locationResponse, setLocationResponse] = useState<any>();
  const [choosenLocation, setChoosenLocation] = useState<any>();
  const defferedSearch = useDeferredValue(locationQuery);

  useEffect(() => {
    setChoosenLocation(null);
    const debounced = debounce(() => {
      if (defferedSearch.value) {
        geocodingService
          .forwardGeocode({
            query: defferedSearch.value,
            // limit: 2,
          })
          .send()
          .then(response => {
            const match = response.body;
            console.log(match.features);
            setLocationResponse(match.features);
          });
      } else if (defferedSearch.value.length === 0) {
        setLocationResponse(undefined);
      }
    }, 500);
    debounced();
    return () => {
      debounced.cancel();
    };
  }, [defferedSearch]);

  const returnLocationIcon = () => {
    return (
      <Icon name="search-location" size={24} color={theme.colors.secondary} />
    );
  };

  const handlePressLocation = (location: any) => {
    setChoosenLocation(location);
    setLocationSearchActive(false);
    console.log('choosenLocation', choosenLocation);
    // setLocationQuery({ value: e.place_name, error: '' });
  };

  const renderSearchResponses = () =>
    locationResponse &&
    locationSearchActive && (
      <LocationOverlay>
        <SearchContainer>
          {locationResponse.map(e => (
            <SearchItemView key={e.id} onPress={() => handlePressLocation(e)}>
              <SearchItemText>{e.text}</SearchItemText>
              <SearchItemSubText>{e.place_name}</SearchItemSubText>
            </SearchItemView>
          ))}
        </SearchContainer>
      </LocationOverlay>
    );

  return (
    <Background>
      <CloseButtonContainer onPress={navigation.goBack}>
        <MaterialIcons name="close" size={32} />
      </CloseButtonContainer>
      <Text>AddNewPlace</Text>
      <CustomTextInput
        label="Garage Name"
        returnKeyType="next"
        value={garageName.value}
        onChangeText={text => {
          setGarageName({ value: text, error: '' });
        }}
        error={!!garageName.error}
        autoCapitalize="none"
      />
      <CustomTextInput
        left={<TextInput.Icon icon={returnLocationIcon} />}
        label="Location"
        returnKeyType="next"
        value={choosenLocation?.place_name || locationQuery.value}
        onFocus={() => setLocationSearchActive(true)}
        onChangeText={text => {
          setLocationQuery({ value: text, error: '' });
        }}
        error={!!locationQuery.error}
        autoCapitalize="none"
        textContentType="fullStreetAddress"
      />
      {renderSearchResponses()}
      <CustomTextInput
        label="Price"
        returnKeyType="next"
        value={price.value}
        onChangeText={text => {
          setPrice({ value: text, error: '' });
        }}
        error={!!price.error}
        autoCapitalize="none"
        keyboardType="number-pad"
      />
      <Button
        mode="contained"
        // onPress={onSignUpPressed}
        style={{ marginTop: 24 }}>
        Next
      </Button>
    </Background>
  );
}

export default AddNewPlace;
