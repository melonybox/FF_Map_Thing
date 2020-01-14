export const getMapData = (mapZoomInfo,defaultXOffset,defaultYOffset) => {
  return dispatch => {

    let data = {mapZoomInfo: mapZoomInfo,
                defaultXOffset: defaultXOffset,
                defaultYOffset: defaultYOffset}

    dispatch(handleMapData(data))
  }
}

export const getZoomOffset = (currZoom,zoomXOffset,zoomYOffset) => {
  return dispatch => {

    let data = {currZoom: currZoom,
                zoomXOffset: zoomXOffset,
                zoomYOffset: zoomYOffset}

    dispatch(handleZoomOffset(data))
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
