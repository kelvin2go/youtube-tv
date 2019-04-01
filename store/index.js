export const state = () => ({
  sidebar: false
})

export const mutations = {
  openSidebar (state) {
    state.sidebar = true
  },
  closeSidebar (state) {
    state.sidebar = false
  },
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setSidebar (state, val) {
    state.sidebar = val
  }
}
