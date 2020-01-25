const initialState = {
  mapData: "Hello World!",
  mapNames: [],
  mapCoords: [
    {pointName: "a", areaCoords: "785,462, 16", markType: ""},
    {pointName: "b", areaCoords: "463,547, 16", markType: ""},
    {pointName: "c", areaCoords: "918,757, 16", markType: ""},
    {pointName: "d", areaCoords: "528,924, 16", markType: ""},
    {pointName: "e", areaCoords: "765,1151, 16", markType: ""},
    {pointName: "f", areaCoords: "910,1194, 16", markType: ""},
    {pointName: "g", areaCoords: "808,1531, 16", markType: ""},
    {pointName: "h", areaCoords: "1380,564, 16", markType: ""},
    {pointName: "i", areaCoords: "1497,637, 16", markType: ""},
    {pointName: "j", areaCoords: "1390,962, 16", markType: ""},
    {pointName: "k", areaCoords: "1627,1026, 16", markType: ""},
    {pointName: "l", areaCoords: "1375,1249, 16", markType: ""},
    {pointName: "m", areaCoords: "945,1771, 16", markType: ""},
    {pointName: "n", areaCoords: "1470,1711, 16", markType: ""},
    {pointName: "o", areaCoords: "1599,1643, 16", markType: ""}
  ],
  mapSelect: 0,
  mapZoomInfo: {},
  mapLoaded: false,
  click: false,
  currZoom: 0,
  defaultXOffset: 0,
  defaultYOffset: 0,
  zoomXOffset: 0,
  zoomYOffset: 0
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
      default:
        return state;
  }
}
