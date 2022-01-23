import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";
import { useEffect, useContext, useState } from "react";
import { LocationContext } from "../../../services/location/location.context";

import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/write";
import currentLocation from "../../../../assets/currentLocation";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
const SearchContainer = styled.View`
  position: absolute;
  z-index: 999;
top: 5px
  width: 100%;
`;

const Container = styled.View`
  position: absolute;
  z-index: 999;
  bottom: 60px
left: 20px
  width: 100%;
`;

const Container2 = styled.View`
  position: absolute;
  z-index: 999;
  bottom: 60px
left:120px
  width: 100%;
`;

export const MapScreen = ({ navigation, route }) => {
  const { location } = useContext(LocationContext);

  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <>
      <ExpoStatusBar style="auto"></ExpoStatusBar>
      <Text>안녕</Text>
      <SearchContainer>
        <Image source={cloud} height={542} width={158}></Image>
      </SearchContainer>
      <Map
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: location[0],
          longitude: location[1],
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <MapView.Marker
          key={"you"}
          title={"you"}
          coordinate={{
            latitude: location[0],
            longitude: location[1],
          }}
        ></MapView.Marker>
      </Map>
      <Container>
        <SvgXml xml={write} width={54} height={64} />
      </Container>
      <Container2>
        <SvgXml xml={currentLocation} width={54} height={54.96} />
      </Container2>
    </>
  );
};
