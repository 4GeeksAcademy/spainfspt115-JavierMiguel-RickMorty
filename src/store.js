import { Locations } from "./pages/Locations";

export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    favorites: [],
    characters: [],
    episodes: [],
    locations: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'toggle_favorite': {
      const character = action.payload;
      const alreadyFav = store.favorites.some((favorite) => favorite.id === character.id);
      return {
        ...store,
        favorites: alreadyFav
          ? store.favorites.filter((favorite) => favorite.id !== character.id)
          : [...store.favorites, character],
      };
    }
    case 'set_characters' : {
      return {
        ...store,
        characters: action.payload,
      };
    };
    case 'set_episodes' : {
      return {
        ...store,
        episodes: action.payload,
      };
    };
    case 'set_locations' : {
            return {
        ...store,
        locations: action.payload,
      };
    };
    default:
      throw Error('Unknown action.');
  }    
}
