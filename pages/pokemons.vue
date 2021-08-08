<template lang="pug">
    section
        .poke-container
            .pokemon-collection
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
import PokeCard from "@/components/PokeCard"
import PokeFooter from "@/components/PokeFooter"
import PokeButton from "@/components/PokeButton"
import PokePokemonDetailModal from "@/components/PokePokemonDetailModal"

export default {
    components: { 
        PokeCard, PokeFooter, PokeButton,  PokePokemonDetailModal 
    },
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
        dialogVisible: false
    }),
    methods: {
        showPokedexDetail(item) {
            this.$refs.detailModal.open(item);
        }
    }
}
</script>

<style lang="scss">
    .pokemon-collection {
        > div {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
        }
    }
</style>
