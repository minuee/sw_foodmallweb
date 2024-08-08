import { atom } from 'recoil';
import { localStorageEffect } from 'utils/localStorage';

//2. sessionStorage에 저장하고 싶은 경우
//Next.js를 쓴다면 sessionStorage는 아래와 같이 따로 설정 필요
/* const sessionStorage =
      typeof window !== 'undefined' ? window.sessionStorage : undefined
const { persistAtom } = recoilPersist({
  key: '내맘대로 정하는 키 이름',
  storage: sessionStorage,
}); */

export interface userInbfoTypes {
  mem_id: string;
  mem_name : string;
  mobile : string;
  email : string;
  token: string;
  state : string;
}

// 사이드바 오픈 여부
export const loginUserState = atom<userInbfoTypes>({
  key: `loginUserState_` + new Date().getTime(),
  default: {
    mem_id: "",
    mem_name: "",
    email: "",
    mobile: "",
    token: "",
    state : "",
  },
  effects: [localStorageEffect('loginUserState')],
});
