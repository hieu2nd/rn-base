import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Dimensions, FlatList, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import * as Progress from 'react-native-progress';
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
const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const width = 200;
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const Home = () => {
  // const font = useFont(require("../../../assets/fonts/Barlow-Black.ttf"), 32);
  // if (font === null) {
  //   return null;
  // }

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: width * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(100 - (Math.floor(width * (1 - progress.value))) * 100 / width)}`;
  });

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 5000 });
  }, []);
  const renderCard = (item: any) => {
    return (
      <>
        <FastImage style={{ height: 500, alignItems: 'center', justifyContent: 'center' }} source={{ uri: item.uri }}>
          {/* <Text style={{ color: item.color, fontSize: 20 }} children={item.text} /> */}
        </FastImage>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg>
        {/* <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          strokeLinecap={'round'}
          animatedProps={animatedProps}
        /> */}
        <AnimatedLine
          x1={20}
          y1={width / 2}
          x2={width}
          y2={width / 2}
          strokeWidth={50}
          stroke={STROKE_COLOR}
          strokeDasharray={width}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
      {/* <SwipeList
          data={DATA}
          renderItem={renderCard}
        />
        <Canvas style={{ flex: 1 }}>
          <Fill color="white" />
          <Text
            color="transparent"
            x={DEVICE.width / 3.5}
            y={DEVICE.height / 2}
            text="Hello World"
            font={font}            // font={null}
          />
        </Canvas> */}
    </View>
  );
};

const styles = StyleSheet.create({
  btn1: { marginBottom: 20 },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256,256,256,0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: DEVICE.width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
  },
});

export { Home };
