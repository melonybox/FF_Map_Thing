const initialState = {
  mapData: "Hello World!",
  mapName: ["Lakeland_-_Tyger","Kholusia_-_Forgiven_Pedantry"],
  mapSelect: 0,
  mapZoomInfo: {},
  mapLoaded: false,
  click: false,
  currZoom: 0,
  defaultXOffset: 0,
  defaultYOffset: 0,
  zoomXOffset: 0,
  zoomYOffset: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'HANDLE_MAP':
        return {...state, mapSelect: action.payload }
      case 'HANDLE_MAP_DATA':
        return {...state, mapZoomInfo: action.payload.mapZoomInfo,
                          defaultXOffset: action.payload.defaultXOffset,
                          defaultYOffset: action.payload.defaultYOffset,
                          zoomXOffset: action.payload.defaultXOffset,
                          zoomYOffset: action.payload.defaultYOffset,
                          mapLoaded: true}
      case 'HANDLE_ZOOM_OFFSET':
        return {...state, currZoom: action.payload.currZoom,
                          zoomXOffset: action.payload.zoomXOffset,
                          zoomYOffset: action.payload.zoomYOffset}
      case "HANDLE_POINTER_DOWN":
        return {...state, click: true}
      case "HANDLE_POINTER_UP":
        return {...state, click: false}
      default:
        return state;
  }
}
