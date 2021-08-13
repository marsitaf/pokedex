<template lang="pug">
    section.pokemons-collection
        .poke-container
            poke-search.pokemons-collection__search(@change="updateSearchTerm")

            poke-placeholder(v-if="isEmptyList", @clicked="backHome")
                template(slot="title") Uh-oh!
                template(slot="message") You look lost on your journey!
                template(slot="button") Go back home
            
            pokedex-collection-list(
                v-else
                ref="collectionList"
                :list="pokemonsFilterlist"
            )

        poke-footer
            poke-button(
                variant="primary", 
                :active="showAllList",
                @click="handlerClickFilterButton"
            ) 
                i.pokeicon-list 
                | All
            poke-button(
                variant="primary",
                :active="showFavoritesList"
                @click="handlerClickFilterButton"
            ) 
                i.pokeicon-star 
                | Favorites

        pokedex-pokemon-detail-modal(ref="detailModal")
</template>

<script>

import { mapState } from "vuex"
import PokedexCollectionList from "@/components/Pokedex/CollectionList"

export default {
    async fetch({ store }) {
        await store.dispatch("pokemon/getList");
        store.commit("SET_LOADING_STATE", false)
    },
    components: {PokedexCollectionList },
    data: () => ({
        searchTerm: null,
        showFavoritesList: false,
        showAllList: true
    }),
    computed: {
        ...mapState({
            pokemonsList: state => state.pokemon.list,
            paginationOffset: state => state.pokemon.offset,
            totalItems: state => state.pokemon.totalItems
        }),
        isEmptyList() {
            return this.pokemonsFilterlist?.length === 0;
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
        }
    },
    methods: {
        backHome() {
            this.$router.push("/")
        },
        handlerClickFilterButton() {
            this.showFavoritesList = !this.showFavoritesList
            this.showAllList = !this.showAllList
        },
        updateSearchTerm(term) {
            this.searchTerm = term
        }
    },
    destroyed() {
        this.$store.commit("pokemon/RESET_DATA")
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
</style>
