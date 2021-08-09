<template lang="pug">
    section.pokemons-collection
        .poke-container
            poke-search.pokemons-collection__search(:term="searchTerm")
            .pokemons-collection__list(v-if="resultExist")
                poke-card(
                    v-for="(pokemon, index) in pokemonsList"
                    :key="index"
                    :status="pokemon.status",
                    @select="showPokedexDetail(pokemon)"
                ) {{ pokemon.name }}
            poke-placeholder(v-if="!resultExist", @clicked="backHome")
                template(#title) Uh-oh!
                template(#message) You look lost on your journey!
                template(#button) Go back home
        poke-footer
            poke-button(variant="primary", :active="true")
                i.pokeicon-list 
                | All
            poke-button(variant="primary") 
                i.pokeicon-star
                |Favorites

        poke-pokemon-detail-modal(ref="detailModal")
</template>

<script>

import { mapState } from "vuex"
export default {
    async fetch({ store }) {
        await store.dispatch("pokemon/getList");
    },
    data: () => ({
        test: null,
        dialogVisible: false,
        searchTerm: null
    }),
    computed: {
        ...mapState({
            pokemonsList: state => state.pokemon.list
        }),
        resultExist() {
            return Boolean(this.pokemonsList?.length);
        },
    },
    methods: {
        async showPokedexDetail(item) {
            try {
                const response = await this.$store.dispatch("pokemon/getDetail", item.name);
                const detail = this.transformPokemonDetail(response, item.status)
                this.$refs.detailModal.open(detail);
            } catch(error) {
                alert("Ha ocurrido un error. Inténtalo de nuevo")
            }
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
        }
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
    // .pokemons-collection__search,
    // .pokemons-collection__list > div {
    //     max-width: 570px;
    // }
    .pokemons-collection__search {
        margin: 0 auto;
    }
    .pokemons-collection__list {
        overflow: auto;
        > div {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
        }
    }
</style>
