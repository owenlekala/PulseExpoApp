import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Note: Replace with actual Hero UI Native Tabs import when installed
// import { Tabs as HUITabs } from 'heroui-native';
import { useTheme } from '@/hooks/useTheme';

interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: any;
}

/**
 * Tabs component wrapper for Hero UI Native Tabs
 * Replace the placeholder implementation with actual Hero UI Native Tabs
 */
export function Tabs({ items, defaultActiveKey, onTabChange, style }: TabsProps) {
  const { colors, spacing } = useTheme();
  const [activeKey, setActiveKey] = useState(defaultActiveKey || items[0]?.key);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    onTabChange?.(key);
  };

  const activeTab = items.find((item) => item.key === activeKey);

  // Placeholder implementation - Replace with actual Hero UI Native Tabs component
  // Example:
  // return (
  //   <HUITabs
  //     selectedKey={activeKey}
  //     onSelectionChange={(keys) => {
  //       const key = Array.from(keys)[0] as string;
  //       handleTabChange(key);
  //     }}
  //     style={style}
  //   >
  //     {items.map((item) => (
  //       <HUITabs.Item key={item.key} title={item.label}>
  //         {item.content}
  //       </HUITabs.Item>
  //     ))}
  //   </HUITabs>
  // );

  return (
    <View style={style}>
      <View style={[styles.tabHeader, { borderBottomColor: colors.border }]}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => handleTabChange(item.key)}
            style={[
              styles.tab,
              {
                borderBottomWidth: activeKey === item.key ? 2 : 0,
                borderBottomColor: colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                {
                  color: activeKey === item.key ? colors.primary : colors.textSecondary,
                  fontWeight: activeKey === item.key ? '600' : '400',
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.tabContent, { padding: spacing.md }]}>
        {activeTab?.content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  tabLabel: {
    fontSize: 16,
  },
  tabContent: {
    width: '100%',
  },
});

