import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

import { styles } from './styles';
import { THEME } from '../../styles/theme';

import { LevelBars } from '../LevelBars';
import { QUIZZES } from '../../data/quizzes';

type Props = TouchableOpacityProps & {
  data: typeof QUIZZES[0];
  index: number
}

export function QuizCard({ data, index, ...rest }: Props) {
  const Icon = data.svg;

  return (
    <TouchableOpacityAnimated
      style={styles.container}
      entering={FadeInUp.delay(index * 100)}
      exiting={FadeOut}
      {...rest}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GREY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>
        {data.title}
      </Text>
    </TouchableOpacityAnimated>
  );
}