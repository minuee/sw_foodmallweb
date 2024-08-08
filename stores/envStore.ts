import { atom } from 'recoil';
import { localStorageEffect } from 'utils/localStorage';
import * as rdd from "react-device-detect";
//2. sessionStorage에 저장하고 싶은 경우
//Next.js를 쓴다면 sessionStorage는 아래와 같이 따로 설정 필요
/* const sessionStorage =
      typeof window !== 'undefined' ? window.sessionStorage : undefined
const { persistAtom } = recoilPersist({
  key: '내맘대로 정하는 키 이름',
  storage: sessionStorage,
}); */

export interface accessInbfoTypes {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isChrome: boolean;
  isFirefox : boolean;
  isSafari: boolean;
  isOpera: boolean;
  isIE: boolean;
  isEdge: boolean;
  isSamsungBrowser:boolean;
}

// 사이드바 오픈 여부
export const accessEnvirmentInfo = atom<accessInbfoTypes>({
  key: `accessInfo_` + new Date().getTime(),
  default: {
    isDesktop : rdd.isDesktop ?? true,
    isTablet : rdd.isTablet,
    isMobile : rdd.isMobile,
    isIOS : rdd.isIOS,
    isAndroid : rdd.isAndroid,
    isChrome : rdd.isChrome,
    isFirefox : rdd.isFirefox,
    isSafari : rdd.isSafari,
    isOpera : rdd.isOpera,
    isIE : rdd.isIE,
    isEdge: rdd.isEdge,
    isSamsungBrowser : rdd.isSamsungBrowser
  },
  effects: [localStorageEffect('accessEnvirmentInfo')],
});

export const accessForceDesktop = atom({
  key: `accessForceDesktop` + new Date().getTime(),
  default: false
});
