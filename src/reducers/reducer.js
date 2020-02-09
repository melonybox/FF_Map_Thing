const initialState = {
  mapData: "Hello World!",
  mapNames: [],
  mapCoords: [],
  mapSelect: 0,
  mapZoomInfo: {},
  mapLoaded: false,
  mapCoordsLoaded: false,
  click: false,
  currZoom: 0,
  defaultXOffset: 0,
  defaultYOffset: 0,
  zoomXOffset: 0,
  zoomYOffset: 0,
  svgYOffset: 0,
  svgXOffset: 0
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
      case "HANDLE_MAP_NAMES":
        return {...state, ...action.payload}
      case "HANDLE_SVG_CHANGE":
        return {...state,
                mapCoords: state.mapCoords.map(
                  (item, idx) => idx === action.payload.elPos ? {...item, markType: action.payload.markType} : item
                )}
        // return {...state,
        //         mapCoords: {
        //           ...state.mapCoords,
        //           [action.payload.elPos]: {
        //             ...state.mapCoords[action.payload.elPos],
        //             markType: action.payload.markType
        //           }
        //         }}
      case "HANDLE_MAP_COORDS":
          return {...state, ...action.payload, mapCoordsLoaded: true}
      default:
        return state;
  }
}
