import { atom } from "recoil";

export const isDarkAtom = atom({
    key: "isDark",
    default: true,
});

// atom함수에 인자들
// 1. 첫번째 인자 : key --> 이름인데 유일해야 함
// 2. 두번째 인자 : default --> key값의 기본인자