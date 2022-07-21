/**
 * @example const [count, setCount] = useState(0)
 *
 *
 * @param {any} dt default value
 * @returns
 */
export const useState = (dt) => {
  let state = Fr.registerState(dt)

  return [
    (patch = '') => Fr.getState(state.id, patch),
    (value) => {
      Fr.setState(state.id, value)
    },
  ]
}

export const useMap = (fn, data) => {
  return { fn: fn, data: data, _n: 'useMap' }
}
