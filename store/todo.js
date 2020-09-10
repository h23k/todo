export const state = () => ({
  tasks: [],
  lastInsertTask: {},
})

export const getters = {
  getInsertIndex: state => {
    return state.tasks.indexOf(state.lastInsertTask)
  },
}

export const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  insert(state, { id, name }) {
    state.lastInsertTask = {
      id: id,
      name: name,
      isOpen: true,
    }
    state.tasks.unshift(state.lastInsertTask)
  },
  remove(state, id) {
    const task = state.tasks.find(task => task.id === id)
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },
  updateName(state, { id, name }) {
    const task = state.tasks.find(task => task.id === id)
    task.name = name
  },
  done(state, id) {
    const task = state.tasks.find(task => task.id === id)
    task.isOpen = !task.isOpen
  },
}