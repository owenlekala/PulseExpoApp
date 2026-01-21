/**
 * Ming Cute icon name mappings
 * Reference: https://www.mingcute.com/
 */
export const ICONS = {
  // Navigation
  HOME: 'mgc_home_2_line',
  PROFILE: 'mgc_user_2_line',
  SETTINGS: 'mgc_setting_2_line',
  
  // Auth
  EMAIL: 'mgc_mail_line',
  PASSWORD: 'mgc_lock_line',
  EYE: 'mgc_eye_line',
  EYE_CLOSE: 'mgc_eye_close_line',
  USER_EDIT: 'mgc_user_edit_line',
  TIME_DURATION: 'mgc_time_duration_line',
  
  // Common
  ARROW_LEFT: 'mgc_arrow_left_line', // Arrow with lines (like <>)
  ARROW_RIGHT: 'mgc_arrow_right_line', // Arrow with lines (like <>)
  LEFT: 'mgc_left_line', // Simple left arrow (like <)
  RIGHT: 'mgc_right_line', // Simple right arrow (like >)
  CLOSE: 'mgc_close_line',
  MENU: 'mgc_menu_line',
  CHECK: 'mgc_check_line',
  PLUS: 'mgc_add_line',
  MINUS: 'mgc_subtract_line',
  EDIT: 'mgc_edit_line',
  DELETE: 'mgc_delete_line',
  SEARCH: 'mgc_search_line',
  FILTER: 'mgc_filter_line',
  FILE: 'mgc_file_line',
  
  // Theme
  SUN: 'mgc_sun_line',
  MOON: 'mgc_moon_line',
  SYSTEM: 'mgc_computer_line',
  
  // Profile
  PERSONAL_INFO: 'mgc_user_2_line',
  SUBSCRIPTIONS: 'mgc_file_line',
  PURCHASE_HISTORY: 'mgc_file_line',
  NOTIFICATIONS: 'mgc_mail_line',
  CHANGE_PASSWORD: 'mgc_lock_line',
  BIOMETRICS: 'mgc_setting_2_line',
  SECURITY_QUESTION: 'mgc_lock_line',
  REFERRAL: 'mgc_user_edit_line',
  REDEEM: 'mgc_file_line',
} as const;

export type IconName = typeof ICONS[keyof typeof ICONS];

