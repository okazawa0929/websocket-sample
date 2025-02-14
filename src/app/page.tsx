'use client'

import { SubmitButton } from '@/components/submitButton'
import { useBatchProcess } from '@/hooks/useBatchProcess'

export default function Home() {
  const { isProcessing, startBatchProcess } = useBatchProcess()

  return (
    <>
      <SubmitButton
        isPending={isProcessing}
        label='バッチ処理を開始'
        pendingLabel='処理中'
        onClick={startBatchProcess}
        disabled={isProcessing}
        className='w-40'
      />
    </>
  )
}
