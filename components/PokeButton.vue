
<script scoped>
export default {
    name: "poke-button",
    functional: true,
    props: { 
        disabled: Boolean,
        variant: {
            type: String,
            default: "primary",
            validator: (value) => ["primary", "icon"].includes(value)
        },
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
                "poke-button--secondary": context.props.variant == "secondary",
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
        --height: 40px;
        --ph: 20px;
        --pv: 11px;
        --fz: 18px;
        --br: 60px;
        background: $gv-regular;
        border-radius: var(--br);
        height: var(--height);
        padding: var(--pv) var(--ph);
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
            margin-right: 10px;
        }
        &:active {
            background-color: darken($gv-regular, 10%);
            transform: scale(0.98);
        }
    }

    .poke-button--active {
        background-color: $pc-regular;
        &:active {
            background-color: $pc-dark;
        }
    }
</style>
