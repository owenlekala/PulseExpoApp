/**
 * Maps icon names (mgc_* format) to SVG file paths
 * Format: mgc_{name}_{variant} -> {category}/{name}_{variant}.svg
 */
export const iconMap: Record<string, string> = {
  // Navigation
  mgc_home_2_line: 'building/home_2_line',
  mgc_home_2_fill: 'building/home_2_fill',
  mgc_user_2_line: 'user/user_2_line',
  mgc_user_2_fill: 'user/user_2_fill',
  mgc_setting_2_line: 'system/settings_2_line',
  mgc_setting_2_fill: 'system/settings_2_fill',
  
  // Auth
  mgc_mail_line: 'contact/mail_line',
  mgc_mail_fill: 'contact/mail_fill',
  mgc_lock_line: 'system/lock_line',
  mgc_lock_fill: 'system/lock_fill',
  mgc_eye_line: 'system/eye_line',
  mgc_eye_fill: 'system/eye_fill',
  mgc_eye_close_line: 'system/eye_close_line',
  mgc_eye_close_fill: 'system/eye_close_fill',
  
  // Common
  mgc_arrow_left_line: 'arrow/arrow_left_line',
  mgc_arrow_left_fill: 'arrow/arrow_left_fill',
  mgc_arrow_right_line: 'arrow/arrow_right_line',
  mgc_arrow_right_fill: 'arrow/arrow_right_fill',
  mgc_close_line: 'system/close_line',
  mgc_close_fill: 'system/close_fill',
  mgc_check_line: 'system/check_line',
  mgc_check_fill: 'system/check_fill',
  mgc_add_line: 'system/add_line',
  mgc_add_fill: 'system/add_fill',
  mgc_subtract_line: 'system/subtract_line',
  mgc_subtract_fill: 'system/subtract_fill',
  mgc_edit_line: 'editor/edit_line',
  mgc_edit_fill: 'editor/edit_fill',
  mgc_delete_line: 'system/delete_line',
  mgc_delete_fill: 'system/delete_fill',
  mgc_search_line: 'system/search_line',
  mgc_search_fill: 'system/search_fill',
  mgc_filter_line: 'system/filter_line',
  mgc_filter_fill: 'system/filter_fill',
  
  // Theme
  mgc_sun_line: 'weather/sun_line',
  mgc_sun_fill: 'weather/sun_fill',
  mgc_moon_line: 'weather/moon_line',
  mgc_moon_fill: 'weather/moon_fill',
  mgc_computer_line: 'device/computer_line',
  mgc_computer_fill: 'device/computer_fill',
};

/**
 * Get SVG file path for an icon name
 */
export function getIconPath(iconName: string): string | null {
  return iconMap[iconName] || null;
}

