<template lang="pug">
    section
        .poke-container
            .pokemon-collection
                poke-card(
                    v-for="(item, index) in pokemonsList"
                    :key="index"
                    :status="item.status"
                ) {{ item.name }}
        poke-footer
            poke-button(:active="true")
                i.pokeicon-list 
                | All
            poke-button 
                i.pokeicon-star
                |Favorites
</template>

<script>
import PokeCard from "@/components/PokeCard"
import PokeFooter from "@/components/PokeFooter"
import PokeButton from "@/components/PokeButton"

export default {
    components: { PokeCard, PokeFooter, PokeButton },
    data: () => ({
        test: null,
        pokemonsList: new Array(10).fill({ name: "Pikachu", status: true})
    })
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
