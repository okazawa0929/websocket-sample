import { Button, type ButtonProps } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { FC } from 'react'

type Props = ButtonProps & {
  isPending: boolean
  label: string
  pendingLabel: string
}

export const SubmitButton: FC<Props> = ({ isPending, label, pendingLabel, ...props }) => {
  return (
    <Button type='submit' {...props}>
      {isPending ? (
        <>
          <Loader2 className='mr-1 h-4 w-4 animate-spin' />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  )
}
