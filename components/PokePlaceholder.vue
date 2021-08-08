<template lang="pug">
    div
        h2 #[slot(name="title")]
        p #[slot(name="message")]
        poke-button(
            v-if="$slots.button", 
            variant="primary", 
            active,
            @click="$emit('clicked')"
        ) #[slot(name="button")]
</template>

<script>
export default {
    name: "poke-placeholder"
}
</script>

<style lang="scss", scoped>
    div {
        text-align: center;
        h2 {
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        p {
            font-size: 20px;
        }
        button {
            margin-top: 25px;
        }
    }
</style>