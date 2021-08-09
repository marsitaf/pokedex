export default function ({ $axios, store, redirect }) {
    $axios.onRequest(config => {
        store.commit("SET_LOADING_STATE", true)
        console.log(store.state.isLoading)
    })
}