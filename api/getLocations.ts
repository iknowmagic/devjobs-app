import json from './data.json'
import _orderBy from 'lodash/orderBy'
import _keys from 'lodash/keys'
import _groupBy from 'lodash/groupBy'

export default (req, res) => {
  const result = _orderBy(_keys(_groupBy(json, 'location')))
  res.end(JSON.stringify(result))
}
