<template lang="pug">
    modal(
        name="pokemonDetailModal", 
        :width="570", 
        height="auto",
        :adaptive="true",
        classes="pokemon-detail-modal"
    )
        poke-button.close-button(icon, @click="close") 
            i.pokeicon-close-rounded

        div.pokemon-detail-modal__header
            img(v-if="detail.image", :src="detail.image", data-src="detail.image" :alt="detail.name", loading="eager")
        div.pokemon-detail-modal__body
            ul.body__description
                li 
                    p #[strong Name: ] {{ detail.name }}
                li
                    p #[strong Weight: ] {{ detail.weight }}
                li
                    p #[strong Height: ] {{ detail.height }}
                li
                    p #[strong Types: ] {{ detail.types }}
            div.pokemon-detail-modal__actions
                poke-button(
                    variant="primary", 
                    active, 
                    @click="copyToClipboard"
                    v-tooltip.top-start="tooltipOptions"
                ) Share to my friends
                poke-button.status-button(
                    icon, 
                    :class="{ 'active': detail.status }", 
                    @click="saveAsFavorite"
                ) #[i.pokeicon-star]
    </template>
ç

<script>
import { copyObjectToClipboard, cloneObject } from "@/utilities"

export default {
    name: "PokePokemonDetailModal",
    data: () =>  ({
        detail: {},
        isOpen: true
    }),
    computed: {
        tooltipOptions() {
            return {
                content: 'Tooltip content here',
                show: true,
                trigger: 'manual',
                autoHide: true,
                container: ".pokemon-detail-modal"
            }
        }
    },
    methods: {
        open(data) {
            this.detail = cloneObject(data);
            this.$modal.show('pokemonDetailModal');
        },
        close() {
            this.$modal.hide('pokemonDetailModal');
        },
        copyToClipboard() {
            copyObjectToClipboard(this.detail)
        },
        saveAsFavorite() {
            this.detail.status = !this.detail.status; 
            this.isOpen = true;
            this.$store.commit("pokemon/UPDATE_STATUS", this.detail)
        }
    }
}
</script>

<style lang="scss">
    .pokemon-detail-modal {
        max-width: calc(100% - 30px);
        margin: 0 15px;
        border-radius: $border-radius-default;
        .close-button {
            --dimension: 26px;
            position: absolute;
            flex: none;
            top: 10px;
            right: 10px;
        }
    }
    .pokemon-detail-modal__header {
        height: 220px;
        background-image: url("@/assets/images/pokemon-habitad-large.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            max-height: 180px;
        }
    }
    .pokemon-detail-modal__body {
        padding: 15px 30px 20px;
        .body__description {
            li {
                border-bottom: 1px solid $gv-light;
                padding-top: 11px;
                padding-bottom: 11px;
                font-size: 18px;
            }
            p {
                text-transform: capitalize;
            }
        }
    }
    .pokemon-detail-modal__actions {
        padding-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>