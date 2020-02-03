const initialState = {
  mapData: "Hello World!",
  mapNames: [],
  mapCoords: [
    {pointName: "a", xAxis: 785, yAxis: 462, markType: "markEmpty"},
    {pointName: "b", xAxis: 463, yAxis: 547, markType: "markEmpty"},
    {pointName: "c", xAxis: 918, yAxis: 757, markType: "markEmpty"},
    {pointName: "d", xAxis: 528, yAxis: 924, markType: "markEmpty"},
    {pointName: "e", xAxis: 765, yAxis: 1151, markType: "markEmpty"},
    {pointName: "f", xAxis: 910, yAxis: 1194, markType: "markEmpty"},
    {pointName: "g", xAxis: 808, yAxis: 1531, markType: "markEmpty"},
    {pointName: "h", xAxis: 1380, yAxis: 564, markType: "markEmpty"},
    {pointName: "i", xAxis: 1497, yAxis: 637, markType: "markEmpty"},
    {pointName: "j", xAxis: 1390, yAxis: 962, markType: "markEmpty"},
    {pointName: "k", xAxis: 1627, yAxis: 1026, markType: "markEmpty"},
    {pointName: "l", xAxis: 1375, yAxis: 1249, markType: "markEmpty"},
    {pointName: "m", xAxis: 945, yAxis: 1771, markType: "markEmpty"},
    {pointName: "n", xAxis: 1470, yAxis: 1711, markType: "markEmpty"},
    {pointName: "o", xAxis: 1599, yAxis: 1643, markType: "markEmpty"}
  ],
  mapSelect: 0,
  mapZoomInfo: {},
  mapLoaded: false,
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
      default:
        return state;
  }
}
