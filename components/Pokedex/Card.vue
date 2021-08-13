<template lang="pug">
    .poke-card(@click="showDetailModal")
        p {{ data.name }}
        poke-button.status-button(icon, :class="{ 'active': data.status }") 
            i.pokeicon-star
</template>

<script>

export default {
    name: "pokedex-card",
    props: {
        data: {
            type: Object,
            default: () => { return {} }
        }
    },
    methods: {
        async showDetailModal() {
            await this.$store.dispatch("pokemon/getDetail", this.data.name);
            this.$setLoadingState(false)
        }
    }
}
</script>