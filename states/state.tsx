import { atom } from "recoil";
import { Event, Member } from '@prisma/client';
import { recoilPersist } from "recoil-persist";
import { EventWithStoreAndFormat } from '../types/types'

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : window.sessionStorage
});

export const inputEventDetail = atom<EventWithStoreAndFormat|null>({
  key: 'eventDetailKey',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

export const inputMember = atom<Member|null>({
  key: 'memberKey',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

export const inputEventsByDate = atom<EventWithStoreAndFormat[]|[]>({
  key: 'eventsByDateKey',
  default: [],
  effects_UNSTABLE: [persistAtom]
})