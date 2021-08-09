export default ({ store }, inject) => {
    inject("setLoadingState", enabled => store.commit("SET_LOADING_STATE", enabled));
};