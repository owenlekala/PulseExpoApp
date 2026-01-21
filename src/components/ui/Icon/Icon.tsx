import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { getIconData, iconDataMap } from './iconData';
import { IconName } from '@/constants/icons';
import { useTheme } from '@/hooks/useTheme';

interface IconProps {
  name: IconName | string;
  size?: number;
  color?: string;
  style?: any;
}

/**
 * Icon component for Ming Cute icons
 * Uses react-native-svg to render SVG icons
 */
export function Icon({ name, size = 24, color, style }: IconProps) {
  const { colors } = useTheme();
  const iconColor = color || colors.text;
  
  // Get the icon data
  const iconData = getIconData(name);
  
  // If icon not found, return placeholder
  if (!iconData) {
    console.warn(`Icon "${name}" not found. Available icons: ${Object.keys(iconDataMap).join(', ')}`);
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            backgroundColor: iconColor,
            borderRadius: size / 2,
            opacity: 0.3,
          },
          style,
        ]}
      />
    );
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <G fill="none" fillRule="evenodd">
        {iconData.paths.map((pathData, index) => {
          // Skip the first path (usually the transparent bounding box)
          if (index === 0 && pathData.d.includes('M24 0v24H0V0z')) {
            return null;
          }
          
          return (
            <Path
              key={index}
              d={pathData.d}
              fill={iconColor}
              fillRule={pathData.fillRule || 'nonzero'}
            />
          );
        })}
      </G>
    </Svg>
  );
}
