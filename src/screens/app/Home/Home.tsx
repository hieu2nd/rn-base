import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, FlatList, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Box, useTheme } from '@theme';
import { AppButton, AppInput, AppScrollWrapBottomTab, GlobalService, LargeList, VirtualList } from '@components';
import { AppchangeLanguage } from '@instances';
import { ENUM_LANGUAGE } from '@translations';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import reactotron from 'reactotron-react-native';
import { DEVICE } from '@utils';
import { Card, Button as Btn } from '@rneui/themed';
import FastImage from 'react-native-fast-image';
const data = [{
  name: 1,
  id: 1,
},
{
  name: 1,
  id: 2,
},
{
  name: 1,
  id: 3,
},
{
  name: 1,
  id: 4,
},
{
  name: 1,
  id: 5,
}]
const LINK = 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg'
const DATA = [
  { id: 1, text: 'Card #1', uri: LINK, color: 'green' },
  { id: 2, text: 'Card #2', uri: LINK, color: 'red' },
  { id: 3, text: 'Card #3', uri: LINK, color: 'purple' },
  { id: 4, text: 'Card #4', uri: LINK, color: 'yellow' },
  { id: 5, text: 'Card #5', uri: LINK, color: 'pink' },
  { id: 6, text: 'Card #6', uri: LINK, color: 'brown' },
  { id: 7, text: 'Card #7', uri: LINK, color: 'black' },
  { id: 8, text: 'Card #8', uri: LINK, color: 'white' },
];
const Home = () => {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        reactotron.log!(evt,gestureState)
      },
      onPanResponderRelease: (evt, gestureState) => {
      },
    }),
  ).current;
  const renderCard = (item: any, index: number) => {
    return (
      <View {...panResponder.panHandlers} key={JSON.stringify(item)} style={{ position: 'absolute', zIndex: DATA.length - (index) }} >
        <FastImage style={{ width: DEVICE.width, aspectRatio: 3 / 4, alignItems: 'center', justifyContent: 'center' }} source={{ uri: item.uri }}>
          <Text style={{
            fontSize: 20,
            color: item.color
          }} children={item.text} />
        </FastImage>
      </View>
    )
  }
  return (
    <AppScrollWrapBottomTab isHeightStatus>
      <>
        {DATA.map((item, index) => {
          return (
            renderCard(item, index)
          )
        })}
        {/* <FlatList
          data={DATA}
          renderItem={renderCard}
        /> */}
      </>
    </AppScrollWrapBottomTab>
  );
};

const styles = StyleSheet.create({
  btn1: { marginBottom: 20 },
});

export { Home };
