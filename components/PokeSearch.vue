<template lang="pug">
    div
        i.pokeicon-search
        input(type="text", placeholder="Search", autocomplete="off")
</template>

<style lang="scss", scoped>
    div {
        width: 100%; 
        height: 50px;
        border-radius: $border-radius-default;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        padding: 15px;
        transition: all .25s ease-in-out;
        &:focus-within {
            box-shadow: $elevation-1;
        }
        i {
            margin-right: 10px;
            color: $gv-regular;
            flex: none;
        }
        input {
            font-size: 16px;
            color: $gv-darker;
            flex: 1;
            &::placeholder {
                color: $gv-regular;
                opacity: 1; /* Firefox */
            }
        }
    }
</style>