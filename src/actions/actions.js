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

export const handlePointerDown = () => ({
  type: "HANDLE_POINTER_DOWN"
})

export const handlePointerUp = () => ({
  type: "HANDLE_POINTER_UP"
})
