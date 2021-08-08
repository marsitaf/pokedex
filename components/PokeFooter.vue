<template lang="pug">
    footer 
        slot
</template>

<script>
export default {
    name: "poke-footer"
}
</script>
<style lang="scss" scoped>
    footer {
        --btn-width: 150px;
        background-color: #FFFFFF;
        box-shadow: $elevation-2;
        padding: 18px 30px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--btn-width), max-content));
        justify-content: center;
        row-gap: 15px;
        column-gap: 15px;
        flex-wrap: wrap;
    }
</style>