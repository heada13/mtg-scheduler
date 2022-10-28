import { atom } from "recoil";
import { Event } from '@prisma/client';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const inputEventDetail = atom<Event|null>({
  key:'eventDetail',
  default:null,
  effects_UNSTABLE: [persistAtom]
})