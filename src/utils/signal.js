const _event = () => ({
  events: {},
  emit(event, ...args) {
    let cb = this.events[event] ?? []
    cb.forEach((x) => x(...args))
  },
  on(event, cb) {
    this.events[event]?.push(cb) ?? (this.events[event] = [cb])

    return () => {
      this.events[event] = this.events[event]?.filter((x) => cb !== x)
    }
  },
})

export const useSignal = _event()

export const reresh = (props) => React.refresh(props)
