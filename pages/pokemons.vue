<template lang="pug">
    section.pokemons-collection
        .poke-container
            poke-search.pokemons-collection__search(@change="updateSearchTerm")

            poke-collection-list(
                v-if="resultExist", 
                :list="pokemonsFilterlist",
                :update="updateData",
                @showDetail="showPokedexDetail"
            )

            poke-placeholder(v-if="!resultExist", @clicked="backHome")
                template(#title) Uh-oh!
                template(#message) You look lost on your journey!
                template(#button) Go back home

        poke-footer
            poke-button(
                variant="primary", 
                :active="showAllList",
                @click="handlerClickFilterButton"
            ) #[i.pokeicon-list] All
            poke-button(
                variant="primary",
                :active="showFavoritesList"
                @click="handlerClickFilterButton"
            ) #[i.pokeicon-star] Favorites

        poke-pokemon-detail-modal(ref="detailModal")
</template>

<script>

import { mapState } from "vuex"
import { intersectionCallback } from "@/utilities"

export default {
    async fetch({ store }) {
        await store.dispatch("pokemon/getList");
        store.commit("SET_LOADING_STATE", false)
    },
    data: () => ({
        test: null,
        dialogVisible: false,
        searchTerm: null,
        showFavoritesList: false,
        showAllList: true,
        lastListItem: null,
        observer: null,
        mountedItemsCounter: 0
    }),
    computed: {
        ...mapState({
            pokemonsList: state => state.pokemon.list,
            paginationOffset: state => state.pokemon.offset,
            totalItems: state => state.pokemon.totalItems
        }),
        resultExist() {
            return Boolean(this.pokemonsFilterlist?.length);
        },
        filterBySearchList() {
            return this.searchTerm ? 
                this.pokemonsList.filter(item => item.name.includes(this.searchTerm))
                : this.pokemonsList
        },  
        pokemonsFilterlist() {
            return this.showFavoritesList ?
                this.filterBySearchList.filter(item => item.status)
                : this.filterBySearchList
        },
        intersectionOptions() {
            return Object.freeze({
                root: document.querySelector(".pokemons-collection__list"),
                rootMargin: "0px",
                threshold: 1.0
            });
        },
        isAllItemsRequested() {
            return this.paginationOffset >= this.totalItems
        },
        lastItemWasMounted() {
            return this.mountedItemsCounter === this.paginationOffset
        }
    },
    methods: {
        async showPokedexDetail(item) {
            this.$setLoadingState(true)
            try {
                const response = await this.$store.dispatch("pokemon/getDetail", item.name);
                const detail = this.transformPokemonDetail(response, item.status)
                this.$refs.detailModal.open(detail);
            } catch(error) {
                alert("Ha ocurrido un error. Inténtalo de nuevo")
            }
            this.$setLoadingState(false)
        },
        transformPokemonDetail(data, status) {
            return {
                name: data?.name ?? "", 
                weight: data?.weight ?? "", 
                height: data?.height ?? "", 
                types: this.transformTypesToString(data?.types), 
                status
            }
        },
        transformTypesToString(types) {
            if(!types || !Array.isArray(types)) return ""
            let typesFilter = types.map(item => item.type?.name)

            return typesFilter.join(", ")
        },
        backHome() {
            this.$router.push("/")
        },
        handlerClickFilterButton() {
            this.showFavoritesList = !this.showFavoritesList
            this.showAllList = !this.showAllList
        },
        updateSearchTerm(term) {
            this.searchTerm = term
        },
        async updateData() {
            this.$store.commit("pokemon/INCREMENT_PAGINATION_OFFSET");
            await this.$store.dispatch("pokemon/getList");
            this.$setLoadingState(false)
        },
    }
}
</script>

<style lang="scss">
    .pokemons-collection {
        padding-top: 35px;
        .poke-container {
            max-height: calc(100vh - 115px);
            display: grid;
            grid-template-rows: 50px 1fr;
            row-gap: 40px;
        }
    }
    .pokemons-collection__search {
        margin: 0 auto;
    }
    .pokemons-collection__list {
        overflow: auto;
        .poke-card {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
        }
    }
</style>
