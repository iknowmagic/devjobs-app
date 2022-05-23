import json from './data.json'
import _keys from 'lodash/keys'
import _groupBy from 'lodash/groupBy'
import { VercelRequest, VercelResponse } from '@vercel/node'

export default (req: VercelRequest, res: VercelResponse) => {
  const result = _keys(_groupBy(json, 'location').sort())
  res.end(JSON.stringify(result))
}
