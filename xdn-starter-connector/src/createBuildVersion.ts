import { join } from 'path'
import crypto from 'crypto'
import { JS_DIR } from '@xdn/core/deploy/paths'
import { FILENAME } from './getBuildVersion'
import fs from './fs'

/**
 * Creates .xdn/lambda/BUILD_ID, which contains a hash of the browser.js
 * bundle. This is used to create the far-future URL /__xdn__/{hash}/browser.js
 */
export default function createBuildVersion() {
  fs.writeFileSync(
    join(process.cwd(), JS_DIR, FILENAME),
    crypto
      .createHash('sha256')
      .update(fs.readFileSync(join(process.cwd(), 'dist', 'browser.js'), 'utf8'))
      .digest('base64'),
    'utf8'
  )
}
