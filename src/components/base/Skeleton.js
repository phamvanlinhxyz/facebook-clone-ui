import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { color } from '../../core/common/styleVariables';

const Skeleton = ({ style }) => {
  const animatedValue = useRef(new Animated.Value(0.5));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue.current, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear.inOut,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.current, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.linear.inOut,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: animatedValue.current,
        backgroundColor: color.button.defaultBg,
      }}
    />
  );
};

export default Skeleton;
