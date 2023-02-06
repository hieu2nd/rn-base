import React, { useEffect, useRef, useState } from 'react';
import { Button, FlatList, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Box, useTheme } from '@theme';
import { AppButton, AppInput, AppScrollWrapBottomTab, GlobalService, LargeList, SwipeList, VirtualList } from '@components';
import { AppchangeLanguage } from '@instances';
import { ENUM_LANGUAGE } from '@translations';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import reactotron from 'reactotron-react-native';
import { DEVICE } from '@utils';
import { Card, Button as Btn } from '@rneui/themed';
import FastImage from 'react-native-fast-image';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import Animated, { Easing, interpolate, multiply, useAnimatedGestureHandler, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
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
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const AnimatedLine = Animated.createAnimatedComponent(Rect)
  const CIRCLE_LENGTH = 1000; // 2PI*R
  const R = CIRCLE_LENGTH / (2 * Math.PI);
  const size = DEVICE.width
  const progress = useSharedValue(0);
  const alpha = interpolate(progress.value, [0, 1], [0, Math.PI * 2])
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }))
  const renderCard = (item: any) => {
    return (
      <>
        <FastImage style={{ height: 500, alignItems: 'center', justifyContent: 'center' }} source={{ uri: item.uri }}>
          <Text style={{ color: item.color, fontSize: 20 }} children={item.text} />
        </FastImage>
      </>
    )
  }
  const x = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
    },
    onEnd: (event, ctx) => {

    },
  });
  useEffect(() => {
    progress.value = withTiming(1, { duration: 10000, easing: Easing.linear })
  }, [])
  return (
    <AppScrollWrapBottomTab isHeightStatus>
      <>
        {/* <SwipeList
          data={DATA}
          renderItem={renderCard}
        /> */}
        <View style={styles.container}>
          <Svg width={size} height={size}>
            {/* <AnimatedCircle
              stroke="white"
              fill={"none"}
              cx={size / 2}
              cy={size / 2}
              r={R}
              strokeWidth={15}
              strokeDasharray={1000}
              animatedProps={animatedProps}
            /> */}
            <AnimatedLine
              x={100}
              y={size / 2}
              width={size / 2}
              strokeWidth={10}
              rx={50}
              ry={50}
              stroke="red"
              fill={"none"}
              strokeDasharray={1000}
            />
            <AnimatedLine
              x={100}
              y={size / 2}
              width={size / 2}
              strokeWidth={10}
              rx={50}
              ry={50}
              stroke="white"
              fill={"none"}
              strokeDasharray={1000}
              animatedProps={animatedProps}
            />
            <View style={[{ position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: 'red', top: size / 2 - 10, left: 90 }]} />
          </Svg>
        </View>

      </>
    </AppScrollWrapBottomTab>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: { marginBottom: 20 },
});

export { Home };
