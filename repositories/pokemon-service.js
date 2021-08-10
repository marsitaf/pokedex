export const PokemonService = {
    getList(httpClient, offset) {
        return httpClient.$get("/api/pokemon/", { params: { offset } })
    },
    getDescription(httpClient, name) {
        return httpClient.$get(`/api/pokemon/${name}`)
    }
}