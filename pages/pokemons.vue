<template lang="pug">
    section
        .pokemon-collection
            poke-card(
                v-for="(item, index) in pokemonsList"
                :key="index"
                :status="item.status"
            ) {{ item.name }}
</template>

<script>
import PokeCard from "@/components/PokeCard"
export default {
    components: { PokeCard },
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
