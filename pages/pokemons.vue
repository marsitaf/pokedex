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

export default {
    data: () => ({
        test: null,
        pokemonsList: new Array(10).fill({
            name: "Squirtle",
            weight: 20,
            height: 18,
            types: "Normal, Water",
            status: true,
            image: require("@/assets/images/squirtle.png")
        }),
        dialogVisible: false,
        searchTerm: null
    }),
    computed: {
        resultExist() {
            return false;
        },
    },
    methods: {
        showPokedexDetail(item) {
            this.$refs.detailModal.open(item);
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
    .pokemons-collection__search,
    .pokemons-collection__list > div {
        max-width: 570px;
    }
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
