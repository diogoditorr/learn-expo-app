import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IconButtonProps extends PressableProps {
  icon: InstanceType<typeof MaterialIcons>['props']['name'];
  label: string;
}

export default function IconButton({ icon, label, ...rest }: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} {...rest}>
      <MaterialIcons name={icon} size={24} color='#fff' />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
