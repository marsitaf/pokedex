export const state = () => ({
    isLoading: false
})

export const mutations = {
    SET_LOADING_STATE(ctxState, isLoading) {
        ctxState.isLoading = isLoading;
    }
}