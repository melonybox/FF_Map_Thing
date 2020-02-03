export const getMapNamesFetch = () => {
  return dispatch => {
    return fetch("/json/maps.json")
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          dispatch(handleMapNames(data))
        }
    })
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
