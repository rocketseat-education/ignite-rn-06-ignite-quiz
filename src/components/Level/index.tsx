import { useEffect } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  interpolateColor
} from 'react-native-reanimated';

import { THEME } from '../../styles/theme';
import { styles } from './styles';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {

  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', COLOR]
      )
    }
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      )
    }
  })

  function onPressIn() {
    scale.value = withTiming(1.1);
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  },[isChecked])

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View style={
        [
          styles.container,
          { borderColor: COLOR },
          animatedContainerStyle
        ]
      }>
        <Animated.Text style={
          [
            styles.title,
            animatedTextStyle
          ]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}