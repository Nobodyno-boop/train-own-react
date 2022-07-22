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
    (value, refresh = true) => {
      Fr.setState(state.id, value, refresh)
    },
  ]
}

export const useMap = (fn, data) => {
  return { fn: fn, data: data, _n: 'useMap' }
}
export const useContext = (fn, ...data) => {
  return { fn: fn, data: data, _n: 'useContext' }
}
