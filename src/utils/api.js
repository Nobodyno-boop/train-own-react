const errors = [
  {
    error_code: 1,
    message: `No URL specified ("url" parameter is empty)`,
  },
  {
    error_code: 2,
    message: `Invalid URL submitted`,
  },
  {
    error_code: 3,
    message: `Rate limit reached. Wait a second and try again`,
  },
  {
    error_code: 4,
    message: `IP-Address has been blocked because of violating our terms of service`,
  },
  {
    error_code: 5,
    message: `shrtcode code (slug) already taken/in use`,
  },
  {
    error_code: 6,
    message: `Unknown error`,
  },
  {
    error_code: 7,
    message: `No code specified ("code" parameter is empty)`,
  },
  {
    error_code: 8,
    message: `Invalid code submitted (code not found/there is no such short-link)`,
  },
  {
    error_code: 9,
    message: `Missing required parameters`,
  },
  {
    error_code: 10,
    message: `Trying to shorten a disallowed Link. More information on disallowed links`,
  },
]

const errorCode = (code) => {
  return (
    errors.find((x) => x.error_code == code) ?? {
      error_code: -1,
      message: 'Internal app error',
    }
  )
}

const ENDPOINT = 'https://api.shrtco.de/v2/'

const _request = async (url, json) => {
  return new Promise((r, rr) => {
    fetch(url + jsonToUrl(json), {
      method: 'POST',
    })
      .then((x) => x.json())
      .then((x) => {
        if (x.ok) {
          return r(x)
        } else rr(errorCode(x.error_code ?? -1))
      })
      .catch((error) => rr(errorCode(error.errorCode)))
  })
}

const jsonToUrl = (json) => {
  let data = []
  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      const element = json[key]
      data.push(key + '=' + element)
    }
  }
  return '?' + data.reduce((x, d) => x + '&' + d)
}
// https://github.com/wankdanker/node-function-rate-limit/blob/master/index.js
function rateLimit(limitCount, limitInterval, fn) {
  var fifo = []

  // count starts at limit
  // each call of `fn` decrements the count
  // it is incremented after limitInterval
  var count = limitCount

  function call_next(args) {
    setTimeout(function () {
      if (fifo.length > 0) {
        call_next()
      } else {
        count = count + 1
      }
    }, limitInterval)

    var call_args = fifo.shift()

    // if there is no next item in the queue
    // and we were called with args, trigger function immediately
    if (!call_args && args) {
      fn.apply(args[0], args[1])
      return
    }

    fn.apply(call_args[0], call_args[1])
  }

  return function rate_limited_function() {
    var ctx = this
    var args = Array.prototype.slice.call(arguments)
    if (count <= 0) {
      fifo.push([ctx, args])
      return
    }

    count = count - 1
    call_next([ctx, args])
  }
}

const rate = rateLimit(1, 1000, (data, fn) => {
  fn(data)
})

export const info = async (code, fn) =>
  rate(await _request(ENDPOINT + 'info', { code: code }), fn)

export const create = async (link, fn) =>
  rate(await _request(ENDPOINT + 'shorten', { url: link }).catch(fn), fn)
