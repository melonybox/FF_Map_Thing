const initialState = {
  mapData: "Hello World!",
  mapName: ["Amh_Araeng_-_Tarchia","Il_Mheg_-_Aglaope"],
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
        return {...state, ...action.payload, mapLoaded: true}
      case 'HANDLE_ZOOM_OFFSET':
        return {...state, ...action.payload}
      case "HANDLE_MOUSE_DOWN":
        return {...state, click: true}
      case "HANDLE_MOUSE_UP":
        return {...state, click: false}
      case "HANDLE_MOUSE_MOVE":
        return {...state, ...action.payload}
      default:
        return state;
  }
}
