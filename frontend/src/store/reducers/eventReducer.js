const initialState = {
  events: [],
  event: null,
  filterBy: {
    type: '',
    location: '',
    date: '',
    time: '',
  },
  locations: [],
};

export function eventReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.events };
    case 'CLEAR_EVENT':
      return { ...state, event: null };
    case 'SET_EVENT':
      return { ...state, event: action.event };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.addedEvent] };
    case 'UPDATE_EVENT':
      return { ...state, event: action.event };
    case 'REMOVE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.eventId),
      };
    case 'SET_FILTER':
      return { ...state, filterBy: action.filterData };
    case 'SET_LOCATIONS':
      return { ...state, locations: action.locations };
    case 'UPDATE_REVIEW':
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.event._id ? action.event : event
        ),
      };
    default:
      return state;
  }
}
