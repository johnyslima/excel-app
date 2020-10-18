// функциональный подход (замыкания)
export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeneres = []

  return {
    subscribe(fn) {
      listeneres.push(fn) // подписываемся на событие
      return {
        unsubscribe() {
          listeneres = listeneres.filter((listener) => listener !== fn) // отписываемся
        }
      }
      // return () => {
      //   listeneres = listeneres.filter((listner) => listner !== fn) // отписываемся
      // }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeneres.forEach((listener) => listener(state)) // listener() - эл-ты массива явля-ся функциями
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}


// // классовый подход
// export class Store {
//   constructor(rootReducer, initialState = {}) {
//     this.rootReducer = rootReducer
//     this.state = this.rootReducer({...initialState}, {type: '__INIT__'})
//     this.listeners = []
//   }

//   subscribe(fn) {
//     this.listeneres.push(fn) // подписываемся на событие
//     return {
//       unsubscribe() {
//         this.listeneres = this.listeneres.filter((listener) => listener !== fn) // отписываемся
//       }
//     }
//   }

//   dispatch(action) {
//     this.state = this.rootReducer(this.state, action)
//     this.listeneres.forEach((listener) => listener(this.state)) // listener() - эл-ты массива явля-ся функциями
//   }

//   getState() {
//     return this.state
//   }
// }
