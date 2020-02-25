export const getMapNamesFetch = () => {
    return dispatch => {

      const loadJSON = (callback) => {
        var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("application/json")
        xobj.open('GET', '../json/maps.json', true)
        xobj.onreadystatechange = () => {
          if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback as .open
            // will NOT return a value but simply returns undefined
            // in asynchronous mode
            callback(JSON.parse(xobj.response))
          }
        }
        xobj.send(null)
      }

      loadJSON((json) => {
        dispatch(handleMapNames(json))
        dispatch(getMapCoordsFetch(json.mapNames[0]))
      })
    }
}

export const getMapCoordsFetch = data => {
  return dispatch => {
    const loadJSON = (callback) => {
      var xobj = new XMLHttpRequest()
      xobj.overrideMimeType("application/json")
      xobj.open('GET', `../json/${data}.json`, true)
      xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
          // Required use of an anonymous callback as .open
          // will NOT return a value but simply returns undefined
          // in asynchronous mode
          callback(JSON.parse(xobj.response))
        }
      }
      xobj.send(null)
    }

    loadJSON((json) => {
      dispatch(handleMapCoords(json))
    })
  }
}

export const handleClearData = data => {
  return dispatch => {
    dispatch(handleClearInfo())
    dispatch(handleMap(data.mapNumber))
    dispatch(getMapCoordsFetch(data.mapName))
  }
}


export const handleMap = data => ({
  type: 'HANDLE_MAP',
  payload: data
})

export const handleMapData = data => ({
  type: 'HANDLE_MAP_DATA',
  payload: data
})

export const handleZoomOffset = data => ({
  type: 'HANDLE_ZOOM_OFFSET',
  payload: data
})

export const handleMouseDown = () => ({
  type: "HANDLE_MOUSE_DOWN"
})

export const handleMouseUp = () => ({
  type: "HANDLE_MOUSE_UP"
})

export const handleMouseMove = data => ({
  type: "HANDLE_MOUSE_MOVE",
  payload: data
})

export const handleMapNames = data => ({
  type: "HANDLE_MAP_NAMES",
  payload: data
})

export const handleSvgChange = data => ({
  type: "HANDLE_SVG_CHANGE",
  payload: data
})

export const handleMapCoords = data => ({
  type: "HANDLE_MAP_COORDS",
  payload: data
})

export const handleClearInfo = data => ({
  type: "HANDLE_CLEAR_INFO",
  payload: data
})
