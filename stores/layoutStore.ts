import { atom } from 'recoil';
import { localStorageEffect } from 'utils/localStorage';

// 사이드바 오픈 여부
export const sidebarState = atom({
  key: `sidebarState_${new Date().getTime()}`,
  default: false,
  // default: false,
});

//로딩바
export const loadingState = atom({
  key: `loading_${new Date().getTime()}`,
  default: true,
  // default: false,
});
//로딩바
export const tootipState = atom({
  key: `tootip_${new Date().getTime()}`,
  default: false,
  // default: false,
});
//Global Scroll Postion
export const globalScrollPostion = atom({
  key: `globalScrollPostion_${new Date().getTime()}`,
  default: 0,
});

//Global Scroll Postion
export const globalOpenReservation = atom({
  key: `globalOpenReservation${new Date().getTime()}`,
  default: 0,
});

//Global Scroll Postion
export const globalDropDownLocale = atom({
  key: `globalDropDownLocale${new Date().getTime()}`,
  default: false,
});
// 가로모드 세로모드
export const landscapeState = atom({
  key: `landscapeState_${new Date().getTime()}`,
  default: {
    isLandscape : false,
    width: 0,
    height:  0,
    baseWidth: 0,
    baseHeight:  0
  },
  effects: [localStorageEffect("landscapeState")],
});