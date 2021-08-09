<template lang="pug">
    div.poke-loader(
        :class="{ 'poke-loader--active': isLoading }"
    )
        img(src="@/assets/images/pokeball.png")
</template>

<script>
export default {
    computed: {
        isLoading() {
            return this.$store.state.isLoading; 
        }
    },
}
</script>

<style lang="scss">
    .poke-loader {
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%; 
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        background-color: rgba(250,250,250,0.7);
        user-select: none;
        pointer-events: none;
        z-index: 99999;
        transition: opacity 320ms ease-in-out;
        position: fixed;
    }
    .poke-loader--active {
        opacity: .95;
        user-select: auto;
        pointer-events: auto;

        img {
            transition: opacity 320ms ease-in-out;
            animation: shake 1.25s infinite;
        }
    }
</style>