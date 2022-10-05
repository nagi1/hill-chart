import { ConfigInternal } from './types';

export const DEFAULT_SIZE = 10;

export const DEFAULT_CONFIG: ConfigInternal = {
  target: 'svg',
  width: 900,
  height: 300,
  preview: false,
  darkMode: false,
  backgroundColor: 'transparent',
  footerText: {
    show: true,
    fontSize: 0.75,
  },
  margin: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 20,
  },
};
