import { MAPBOX_TOKEN } from '@env';

import { debounce } from 'lodash';
import React, { useDeferredValue, useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomTextInput from '../../components/TextInput';
import { theme } from '../../theme/theme';
import {
  LocationOverlay,
  SearchContainer,
  SearchItemSubText,
  SearchItemText,
  SearchItemView,
} from './LocationSearchInput.styles';

// const MapboxClient = require('@mapbox/mapbox-sdk');
//@ts-ignore
import MapboxClient from '@mapbox/mapbox-sdk';
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
import Geocoding, {
  GeocodeFeature,
} from '@mapbox/mapbox-sdk/services/geocoding';

const baseClient = MapboxClient({ accessToken: MAPBOX_TOKEN });
const geocodingService = Geocoding(baseClient);

interface LocationSearchInputProps {
  onPress?: (location: GeocodeFeature) => void;
}
function LocationSearchInput(props: LocationSearchInputProps) {
  const [locationQuery, setLocationQuery] = useState({ value: '', error: '' });
  const [locationSearchActive, setLocationSearchActive] = useState(false);
  const [locationResponse, setLocationResponse] = useState<
    GeocodeFeature[] | null
  >(null);
  const [choosenLocation, setChoosenLocation] = useState<GeocodeFeature | null>(
    null,
  );
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
            setLocationResponse(match.features);
          });
      } else if (defferedSearch.value.length === 0) {
        setLocationResponse(null);
      }
    }, 500);
    debounced();
    return () => {
      debounced.cancel();
    };
  }, [defferedSearch]);

  const handlePressLocation = (location: GeocodeFeature) => {
    setChoosenLocation(location);
    setLocationSearchActive(false);
    props.onPress && props.onPress(location);
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

  const returnLocationIcon = () => {
    return (
      <Icon name="search-location" size={24} color={theme.colors.secondary} />
    );
  };

  return (
    <>
      <CustomTextInput
        left={<TextInput.Icon icon={returnLocationIcon} />}
        label="Location"
        returnKeyType="next"
        multiline
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
    </>
  );
}

export default LocationSearchInput;
