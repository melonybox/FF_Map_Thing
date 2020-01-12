export const getMapData = (mapZoomInfo,defaultXOffset,defaultYOffset) => {
  return dispatch => {

    let data = {mapZoomInfo: mapZoomInfo,
                defaultXOffset: defaultXOffset,
                defaultYOffset: defaultYOffset}

    dispatch(handleMapData(data))
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
