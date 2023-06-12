import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { StackScreenProps } from '@react-navigation/stack';
import { isEmpty, isNil, toNumber } from 'lodash';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { ActivityIndicator } from 'react-native-paper';
import Background from '../../components/Background';
import Button from '../../components/Button';
import LocationSearchInput from '../../components/LocationSearchInput';
import CustomTextInput from '../../components/TextInput';
import garageService from '../../services/garageService';
import {
  ImagePreview,
  ImagePreviewContainer,
  ImagePreviewTitle,
  Title,
} from './AddNewPlace.style';

type Props = StackScreenProps<any>;
function AddNewPlace({ navigation }: Props) {
  const [garageName, setGarageName] = useState({ value: '', error: '' });
  const [price, setPrice] = useState({ value: '', error: '' });
  const [location, setChoosenLocation] = useState<GeocodeFeature>();
  const [images, setImages] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);

  const addNewPlace = useCallback(async () => {
    if (isEmpty(location)) {
      return;
    }
    setLoading(true);
    // First create the garage instance
    const response = await garageService.add({
      name: garageName.value,
      pricePerHour: toNumber(price.value),
      addressName: location.place_name,
      longitude: location.center[0],
      latitude: location.center[1],
    });
    //
    if (!isEmpty(images) && !isNil(response.id)) {
      await garageService.uploadImages(response.id, images);
    }
    setLoading(false);
    navigation.goBack();
  }, [garageName.value, images, location, navigation, price.value]);

  const onImagePickerResponse = useCallback((response: ImagePickerResponse) => {
    if (!response.assets) {
      return;
    }
    // const parsedImages = [...response.assets.flatMap(i => i || [])];
    const parsedImages = response.assets.filter(Boolean);
    !isEmpty(parsedImages) && setImages(parsedImages);
  }, []);

  const renderImagePreviews = () =>
    !isEmpty(images) && (
      <View>
        <ImagePreviewTitle>Images</ImagePreviewTitle>
        <ImagePreviewContainer>
          {images.map(i => (
            <ImagePreview
              key={`image-preview-${i.fileName}`}
              source={{ uri: i.uri }}
            />
          ))}
        </ImagePreviewContainer>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
      {loading && <ActivityIndicator />}
      <Background>
        {/* <CloseButtonContainer onPress={navigation.goBack}>
          <SafeAreaView>
            <MaterialIcons name="close" size={32} />
          </SafeAreaView>
        </CloseButtonContainer> */}
        <Title>Add a new place</Title>
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
        <LocationSearchInput onPress={setChoosenLocation} />
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
          mode="outlined"
          onPress={() =>
            launchImageLibrary(
              {
                mediaType: 'photo',
                selectionLimit: 4,
                includeBase64: false,
                quality: 0.8,
                maxWidth: 1000,
                maxHeight: 1000,
              },
              onImagePickerResponse,
            )
          }>
          Add images
        </Button>
        {renderImagePreviews()}
        <Button mode="contained" onPress={addNewPlace}>
          Add
        </Button>
      </Background>
    </ScrollView>
  );
}

export default AddNewPlace;
