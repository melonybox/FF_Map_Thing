const initialState = {
  mapData: "Hello World!",
  mapName: ["Lakeland_-_Tyger","Kholusia_-_Forgiven_Pedantry"],
  mapSelect: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'HANDLE_MAP':
        return {...state, mapSelect: action.payload }        
      default:
        return state;
  }
}
