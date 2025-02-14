import { createServer } from 'node:http'
import { parse } from 'node:url'
import next from 'next'
import { Server } from 'socket.io'

declare global {
  // グローバルにSocket.IOサーバーインスタンスを保持
  // 今回はNext.jsのAPIルートからアクセスするので必要
  var io: Server | undefined
}

// Next.jsの開発モードの設定
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, turbo: true })
const handle = app.getRequestHandler()

// Next.jsの準備が整ってからサーバー起動
app.prepare().then(() => {
  // HTTPサーバーを作成
  // Next.jsのリクエストハンドラーを組み込む
  const server = createServer((req, res) => {
    if (!req.url) return
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  // Socket.IOサーバーの初期化
  const io = new Server(server, {
    cors: {
      origin: '*', // 本番環境では適切なオリジンの設定が必要
      methods: ['GET', 'POST'],
    },
  })

  // グローバルにSocket.IOサーバーインスタンスを保存
  // これによりNext.jsのAPIルートからWebSocketイベントを発火できる
  global.io = io

  // クライアントとのWebSocket接続を管理
  io.on('connection', (socket) => {
    console.log('connected')

    // ユーザーごとの個別ルームを作成
    // これにより特定のユーザーにのみメッセージを送信できる
    socket.on('joinRoom', (userId: string) => {
      socket.join(userId)
      console.log(`User ${userId} joined room`)
      console.log('Current rooms:', socket.rooms)
    })

    // クライアントが切断したときのクリーンアップ
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
  })

  // サーバーを3000番ポートで起動
  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000')
  })
})
