import { atom } from 'jotai'

/**
 * バッチ処理の状態を表す型
 *
 * - idle: 初期状態（未実行）
 * - processing: 処理実行中
 * - completed: 処理完了
 * - error: エラー発生
 */
export type BatchStatus = 'idle' | 'processing' | 'completed' | 'error'

/**
 * バッチ処理の状態を管理するための型
 *
 * @property isProcessing - 処理中かどうかのフラグ
 * @property status - 処理の現在の状態
 * @property error - エラーが発生した場合のメッセージ
 */
type BatchState = {
  isProcessing: boolean
  status: BatchStatus
  error?: string
}

/**
 * バッチ処理の状態を管理するグローバルステート
 *
 * このatomは以下の目的で使用されます：
 * 1. バッチ処理の進行状況の追跡
 * 2. UI表示の制御（ボタンの無効化など）
 * 3. エラーハンドリング
 *
 * 初期状態は未実行（idle）で、処理は開始されていない状態
 */
export const batchStatusAtom = atom<BatchState>({
  isProcessing: false,
  status: 'idle',
})
