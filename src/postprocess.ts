import { readFileSync } from 'fs'
import { resolve } from 'path'
import { unwrapResult } from '@promptbook/utils'

const postprocess = (output: string) => {
  console.log(unwrapResult(output))
}

postprocess(
  JSON.parse(readFileSync(resolve('./output.json'), 'utf8')).content[0].text
)
