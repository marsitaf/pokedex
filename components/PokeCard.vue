<template lang="pug">
    .poke-card(@click="select")
        p.poke-card__description 
            slot
        poke-button.status-button(icon, :class="{ 'active': status }") 
            i.pokeicon-star
</template>

<script>
import PokeButton from "@/components/PokeButton"
export default {
    name: "poke-card",
    components: { PokeButton },
    props: {
        status: Boolean
    },
    methods: {
        select() {
            this.$emit("select")
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$emit("mounted")
        })
    }
}
</script>

<style lang="scss" scoped>
    .poke-card {
        align-items: center;
        background: #ffffff;
        border-radius: $border-radius-default;
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr 44px;
        column-gap: 20px;
        min-height: 60px;
        padding-left: 20px;
        padding-right: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
        width: 100%;
        transition: all 0.25s ease-in-out;
        &:hover {
            box-shadow: $elevation-1;
            transform: scale(1.01);
        }
    }
    .poke-card__description {
        font-size: 22px;
    }
</style>