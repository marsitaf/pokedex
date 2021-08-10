<template lang="pug">
    .pokemons-collection__list
        div
            poke-card(
                v-for="(pokemon, index) in list"
                :key="pokemon.id",
                :status="pokemon.status",
                :ref="`pokemon-${pokemon.name}`"
                @select="showPokedexDetail(pokemon)",
                @mounted="incrementMountedItemCounter(pokemon)"
            ) {{ pokemon.name }}
</template>

<script>
import { mapState } from "vuex"
import { intersectionCallback } from "@/utilities"

export default {
    name: "poke-collection-list",
    props: {
        list: {
            type: Array,
            default: () => { return [] }
        },
        update: {
            type: Function
        }
    },
    data: () => ({
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
        showPokedexDetail(item) {
            this.$emit("showDetail", item)
        },
        incrementMountedItemCounter(item) {
            this.mountedItemsCounter++
            if(this.lastItemWasMounted) {
                const itemRef = this.$refs?.[`pokemon-${item.name}`]
                this.lastListItem = itemRef[0].$el
                this.resetObserver()
            }
        },
        resetObserver() {
            this.observer?.disconnect();
            this.setObserver(this.lastListItem, this.isAllItemsRequested, this.update)
        },
        setObserver(target, disconect, updatedataCallback) {
            if(!this.observer) {
                this.observer = new IntersectionObserver(
                    (entries) => intersectionCallback(entries, disconect, updatedataCallback), 
                    this.intersectionOptions
                );
            }
            this.observer.observe(target);
        }
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