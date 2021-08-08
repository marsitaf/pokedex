
<script scoped>
export default {
    name: "poke-button",
    functional: true,
    props: { 
        disabled: Boolean,
        variant: {
            type: String,
            validator: (value) => ["primary"].includes(value)
        },
        icon: Boolean,
        active: Boolean
    },
    render(createElement, context) {
        const staticClass = {}; 
        context.data?.staticClass?.split(" ").forEach(item => staticClass[item] = true );

        const props = {
            style: context.data.staticStyle,
            class: {
                "poke-button": true,
                "poke-button--primary": context.props.variant == "primary",
                "poke-button--rounded": context.props.icon,
                "poke-button--disabled": Boolean(context.props.disabled),
                "poke-button--active": context.props.active,
                ...staticClass, 
                ...context.data.class
            },
            attrs: {
                ...context.data.attrs,
                type: context.data.attrs?.type || "button",
                disabled: Boolean(context.props.disabled)
            },
            on: context?.listeners || {},
            directives: context.data.directives ? context.data.directives : []
        };
            
        return createElement("button", props, context.children);
    }
};
</script>

<style lang="scss">
    .poke-button {
        --dimension: 40px;
        --ph: 20px;
        --pv: 11px;
        --fz: 18px;
        --br: 60px;
        border-radius: var(--br);
        height: var(--dimension);
        font-size: 18px;
        font-weight: 500;
        outline: none;
        transition: all .25s ease-in-out;
        overflow: hidden;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: max-content;
        color: #FFFFFF;
        i {
            color: inherit;
        }
        &:active {
            transform: scale(0.98);
        }
    }

    .poke-button--primary {
        padding: var(--pv) var(--ph);
        background: $gv-regular;
        i {
            margin-right: 10px;
        }
        &:active(:not(&--active)) {
            background-color: darken($gv-regular, 10%);
        }
        &.poke-button--active {
            background-color: $pc-regular;
            &:active {
                background-color: $pc-dark;
            }
        }
    }

    .poke-button--rounded {
        --br: 100%;
        width: var(--dimension);
    }


    
</style>
