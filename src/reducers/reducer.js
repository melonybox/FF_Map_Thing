const initialState = {
  mapData: "Hello World!",
  mapName: ["Lakeland_-_Tyger","Kholusia_-_Forgiven_Pedantry"],
  mapSelect: 0,
  mapZoomInfo: {},
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
                          defaultYOffset: action.payload.defaultYOffset}
      default:
        return state;
  }
}
