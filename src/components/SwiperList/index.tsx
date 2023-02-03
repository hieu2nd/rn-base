import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { DEVICE } from '@utils';
import { PanGestureHandler } from 'react-native-gesture-handler';
interface ISwipeListProps {
    data: any[];
    renderItem: (item: any) => void;
    onSwipeLeftEnd?: (finished?: boolean) => void;
    onSwipeRightEnd?: (finished?: boolean) => void;
    degree?: number;
    swipeThreshold?: number
}
const SWIPE_THRESHOLD = 0.5 * DEVICE.width
const LIMIT_DISTANCE = 1.5 * DEVICE.width

export const SwipeList = ({ data, degree = 120, swipeThreshold = SWIPE_THRESHOLD, onSwipeRightEnd, onSwipeLeftEnd, renderItem }: ISwipeListProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useSharedValue(0)
    const y = useSharedValue(0);
    const onFinished = (direction: 'right' | 'left', finished?: boolean) => {
        if (finished) {
            setCurrentIndex(prv => {
                x.value = 0;
                return prv + 1;
            })
            const onEnd = direction === 'right' ? onSwipeRightEnd : onSwipeLeftEnd
            onEnd?.(finished);
        }
    }
    const onSwipeEnd = (direction: 'right' | 'left') => {
        const distance = direction === 'right' ? LIMIT_DISTANCE : -LIMIT_DISTANCE
        x.value = withTiming(distance, { duration: 500 }, (finished) => {
            runOnJS(onFinished)(direction, finished)
        })
        y.value = 0
    }
    const onReset = () => {
        x.value = withSpring(0)
        y.value = withSpring(0)
    }
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
        },
        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            {
                if (event.translationX > swipeThreshold) {
                    runOnJS(onSwipeEnd)('right')
                }
                else if (event.translationX < -swipeThreshold) {
                    runOnJS(onSwipeEnd)('left')
                }
                else {
                    runOnJS(onReset)()
                }
            }
        },
    });
    const swipeStyle = useAnimatedStyle(() => {
        const rotation = interpolate(x.value, [-DEVICE.width, 0, DEVICE.width], [-degree / 2, 0, degree / 2]);
        return {
            transform: [
                {
                    translateX: x.value,
                },
                {
                    translateY: y.value,
                },
                {
                    rotateZ: `${rotation}deg`
                }
            ],
        };
    });
    return (
        <View >
            {data.map((item, index) => {
                if (currentIndex > index) return null
                return (
                    <PanGestureHandler
                        key={JSON.stringify(item)}
                        onGestureEvent={gestureHandler}
                    >
                        <Animated.View
                            style={
                                [
                                    currentIndex === index && swipeStyle,
                                    { position: 'absolute', width: DEVICE.width, zIndex: data.length - index }
                                ]
                            }
                        >
                            {renderItem(item)}
                        </Animated.View>
                    </PanGestureHandler>
                )
            })}
        </View>
    )
}