<template lang="pug">
    .pokemons-collection__list
        poke-infinite-scroll(
            ref="infiniteScroll", 
            :options="intersectionOptions",
            @intersection="loadMore"
        )
            pokedex-card(
                v-for="(pokemon, index) in list",
                :key="pokemon.id",
                :data="pokemon",
                ref="pokedexCard"
            )
</template>

<script>
import { mapState } from "vuex"
import PokeInfiniteScroll from "@/components/PokeInfiniteScroll"
import PokedexCard from "@/components/Pokedex/Card"

export default {
    name: "poke-collection-list",
    components: { PokeInfiniteScroll, PokedexCard },
    props: {
        list: {
            type: Array,
            default: () => { return [] }
        }
    },
    data: () => ({
        lastListItem: null,
        mountedItemsCounter: 0
    }),
    computed: {
        ...mapState({
            pokemonsList: state => state.pokemon.list,
            paginationOffset: state => state.pokemon.offset,
            totalItems: state => state.pokemon.totalItems
        }),
        intersectionOptions() {
            return Object.freeze({
                root: null,
                rootMargin: "0px",
                threshold: 1.0
            });
        }
    },
    methods: {
        async loadMore() {
            this.$store.commit("pokemon/INCREMENT_PAGINATION_OFFSET");
            await this.$store.dispatch("pokemon/getList");
            this.resetObserver(); 
            this.$setLoadingState(false)
        },
        resetObserver() {
            this.$refs.infiniteScroll.disconnect();
            if(this.isAllItemsWasRequested) return 
            this.$refs.infiniteScroll.observe();
        }
    },
    mounted() { 
        this.$nextTick(() => { 
            this.$refs.infiniteScroll.observe()
        })
    }
}
</script>

<style lang="scss">
    .pokemons-collection__list {
        overflow: auto;
        .poke-card {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
        }
    }
</style>