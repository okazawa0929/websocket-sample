'use client'

import { useSocket } from '@/hooks/useSocket'
import { batchStatusAtom } from '@/jotai/batchAtom'
import { userIdAtom } from '@/jotai/userAtom'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { toast } from 'sonner'

/**
 * バッチ処理の状態を監視し、WebSocketを通じて完了通知を受け取るコンポーネント
 *
 * このコンポーネントは以下の役割を持ちます：
 * 1. バッチ処理中のWebSocket接続の管理
 * 2. バッチ処理完了イベントの受信と状態更新
 * 3. ユーザーへの完了通知（トースト表示）
 */
export const BatchProcessListener = () => {
  const [batchStatus, setBatchStatus] = useAtom(batchStatusAtom)
  const userId = useAtomValue(userIdAtom)
  const { socket, connectSocket, disconnectSocket } = useSocket(userId)

  // バッチ処理中のソケット接続管理
  // バッチ処理が開始されたときのみWebSocket接続を確立
  useEffect(() => {
    if (batchStatus.status === 'processing' && !socket) {
      connectSocket()
    }
  }, [batchStatus.status, socket, connectSocket])

  // バッチ処理完了イベントの監視
  // WebSocketを通じて完了通知を受け取り、状態を更新
  useEffect(() => {
    if (!socket) return

    // バッチ処理完了時の処理
    const handleComplete = () => {
      // バッチ処理の状態を完了に更新
      setBatchStatus({ isProcessing: false, status: 'completed' })

      // ユーザーに完了を通知
      toast('バッチ処理が完了しました', {
        style: {
          backgroundColor: '#dcfce7',
          color: '#124a28',
          borderColor: '#bbf7d0',
        },
      })

      // 完了後はWebSocket接続を切断
      disconnectSocket()
    }

    // 完了イベントのリスナーを登録
    socket.on('batchComplete', handleComplete)

    // コンポーネントのアンマウント時やsocketの再作成時にリスナーを解除
    return () => {
      socket.off('batchComplete', handleComplete)
    }
  }, [socket, setBatchStatus, disconnectSocket])

  return null
}
