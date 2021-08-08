<template lang="pug">
    .poke-card(@click="select")
        p.poke-card__description #[slot]
        poke-button.status-button(icon, :class="{ 'active': status }") 
            i.pokeicon-star
</template>

<script>
export default {
    name: "poke-card",
    props: {
        status: Boolean
    },
    methods: {
        select() {
            this.$emit("select")
        }
    }
}
</script>

<style lang="scss" scoped>
    .poke-card {
        align-items: center;
        background: #ffffff;
        border-radius: 5px;
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr 44px;
        column-gap: 20px;
        max-width: 570px;
        min-height: 60px;
        padding-left: 20px;
        padding-right: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
        width: 100%;
        transition: all 0.25s ease-in-out;
        &:hover {
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
            transform: scale(1.01);
        }
    }
    .poke-card__description {
        font-size: 22px;
    }
</style>