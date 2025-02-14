import { atom } from 'jotai'
import { v4 as uuidv4 } from 'uuid'

// アプリ起動時に一意のユーザーIDを生成（デモ用）
export const userIdAtom = atom<string>(uuidv4())
