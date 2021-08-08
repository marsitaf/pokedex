<template lang="pug">
    section.pokemons-collection
        .poke-container
            poke-search.pokemons-collection__search(:term="searchTerm")
            .pokemons-collection__list
                poke-card(
                    v-for="(pokemon, index) in pokemonsList"
                    :key="index"
                    :status="pokemon.status",
                    @select="showPokedexDetail(pokemon)"
                ) {{ pokemon.name }}
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
    methods: {
        showPokedexDetail(item) {
            this.$refs.detailModal.open(item);
        }
    }
}
</script>

<style lang="scss">
    .pokemons-collection {
        padding-top: 35px;
    }
    .pokemons-collection__search,
    .pokemons-collection__list > div {
        max-width: 570px;
    }
    .pokemons-collection__search {
        margin: 0 auto;
    }
    .pokemons-collection__list {
        padding-top: 40px;
        > div {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
        }
    }
</style>
