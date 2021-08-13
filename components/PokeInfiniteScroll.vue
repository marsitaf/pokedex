<template lang="pug">
    div 
        slot(ref="item")
</template>

<script>
export default {
    name: "infinite-scroll",
    props: {
        options: {
            type: Object,
            default: () => { return {} }
        }
    },
    data: () => ({
        intersectionInstance: null
    }),
    methods: {
        initializeInstance() {
            this.intersectionInstance = new IntersectionObserver(
                this.handleIntersectionCallback, 
                this.intersectionOptions
            );
        },
        async handleIntersectionCallback(entries) {
            for (const entry of entries) {
                const { isIntersecting, intersectionRatio } = entry;
                if(isIntersecting && intersectionRatio > 0) {
                    this.$emit("intersection")
                }
            }
        },
        observe() {
            const target = this.$slots.default?.slice(-1)?.[0]?.elm;
            if(target) this.intersectionInstance?.observe(target)
        },
        disconnect() {
            this.intersectionInstance?.disconnect()
        }
    },
    beforeMount() {
        this.initializeInstance()
    }
}
</script>