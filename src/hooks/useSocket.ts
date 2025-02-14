'use client'

import { socketAtom } from '@/jotai/socketAtom'
import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { io } from 'socket.io-client'

/**
 * WebSocket接続を確立する関数
 *
 * @param userId - ユーザーを識別するためのID
 * @returns Socket.IOのインスタンス
 *
 * この関数は以下の機能を提供します：
 * 1. Socket.IOクライアントの初期化
 * 2. 再接続の設定
 * 3. ユーザー固有のルームへの参加
 */
export const connectSocket = (userId: string) => {
  // Socket.IOクライアントの初期化
  const newSocket = io('http://localhost:3000', {
    reconnection: true,
    reconnectionAttempts: 3,
  })

  // 接続確立時の処理
  newSocket.on('connect', () => {
    // ユーザー固有のルームに参加
    // これにより、このユーザーだけに通知を送信できる
    newSocket.emit('joinRoom', userId)
  })

  return newSocket
}

/**
 * WebSocket接続を管理するカスタムフック
 *
 * @param userId - ユーザーを識別するためのID
 * @returns WebSocket関連の操作と状態
 *
 * このフックは以下の機能を提供します：
 * 1. WebSocket接続の確立
 * 2. 接続の切断
 * 3. コンポーネントのアンマウント時の自動切断
 */
export const useSocket = (userId: string) => {
  // WebSocketインスタンスをグローバルに管理
  const [socket, setSocket] = useAtom(socketAtom)

  // WebSocket接続を確立する関数
  const connectSocketWithUser = useCallback(() => {
    setSocket(connectSocket(userId))
  }, [userId, setSocket])

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect()
      setSocket(null)
    }
  }, [socket, setSocket])

  // コンポーネントのアンマウント時に自動的に接続を切断
  useEffect(() => {
    return () => {
      disconnectSocket()
    }
  }, [disconnectSocket])

  return {
    socket,
    connectSocket: connectSocketWithUser,
    disconnectSocket,
  }
}
