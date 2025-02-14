import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!global.io) {
    return NextResponse.json({ error: 'WebSocket server not initialized' }, { status: 500 })
  }

  const { userId } = await request.json()
  // バッチ処理をシミュレート
  setTimeout(() => {
    global.io?.to(userId).emit('batchComplete')
  }, 3000)

  return NextResponse.json({ status: 'accepted' }, { status: 202 })
}
