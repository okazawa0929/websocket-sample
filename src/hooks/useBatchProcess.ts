import { batchStatusAtom } from '@/jotai/batchAtom'
import { userIdAtom } from '@/jotai/userAtom'
import { useAtom, useAtomValue } from 'jotai'
import { toast } from 'sonner'

/**
 * バッチ処理の開始と状態管理を行うカスタムフック
 *
 * このフックは以下の機能を提供します：
 * 1. バッチ処理の開始（APIリクエスト）
 * 2. 処理状態の管理と更新
 * 3. エラーハンドリングとユーザーへの通知
 */
export const useBatchProcess = () => {
  const [batchStatus, setBatchStatus] = useAtom(batchStatusAtom)
  const userId = useAtomValue(userIdAtom)

  /**
   * バッチ処理を開始する関数
   *
   * 処理の流れ：
   * 1. 状態を「処理中」に更新
   * 2. APIにリクエストを送信
   * 3. エラー発生時は状態を「エラー」に更新
   *
   * 注意：実際の完了通知はWebSocketで受け取るため、
   * この関数では完了状態への更新は行いません
   */
  const startBatchProcess = async () => {
    try {
      // バッチ処理の開始を状態に反映
      setBatchStatus({
        isProcessing: true,
        status: 'processing',
      })

      // バッチ処理開始のAPIリクエスト
      const response = await fetch('/api/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ユーザーIDを送信して、WebSocketで個別に通知を受け取れるようにする
        body: JSON.stringify({
          userId,
        }),
      })

      if (!response.ok) {
        throw new Error('バッチ処理の開始に失敗しました')
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'バッチ処理でエラーが発生しました'
      setBatchStatus({
        isProcessing: false,
        status: 'error',
        error: errorMessage,
      })
      // ユーザーにエラーを通知
      toast(errorMessage, {
        style: {
          backgroundColor: '#fee2e2',
          color: '#ef4444',
          borderColor: '#fecaca',
        },
      })
    }
  }

  return {
    isProcessing: batchStatus.isProcessing,
    startBatchProcess,
  }
}
