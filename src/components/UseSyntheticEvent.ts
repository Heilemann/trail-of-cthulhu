const useSyntheticEvent = () => {
  const getElementFromEvent = (e: any) => {
    const y = e.data.pointer.y
    const x = e.data.pointer.x
    return document.elementsFromPoint(x, y)[0]
  }
  return (e: any, eventName: string) => {
    const target = getElementFromEvent(e)

    const syntheticEvent = new CustomEvent('CustomEvent')
    // TODO: If this is deprecated, is there a better way to do this?
    syntheticEvent.initCustomEvent(eventName, true, true, null)

    // @ts-ignore: we're setting dataTransfer, not reading it...
    syntheticEvent.dataTransfer = {
      data: {
        documentId: e.data.data,
      },
      setData: function (type: string, val: string) {
        this.data[type] = val
      },
      getData: function (type: string) {
        return this.data[type]
      },
    }

    Object.defineProperty(syntheticEvent, 'target', {
      value: target,
    })

    target.dispatchEvent(syntheticEvent)
  }
}

export default useSyntheticEvent
