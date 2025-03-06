import { unwrapResult } from '@promptbook/utils'

export const postprocess = (output: string) => {
  return unwrapResult(output)
}
