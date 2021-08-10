import Footer from "@/components/PokeFooter.vue"
import { shallowMount } from "@vue/test-utils"

describe("Footer", () => {
    it("Render slot with passed", () => {
        const description = "This is a description"
        const wrapper = shallowMount(Footer, {
            slots: { 
                default: description 
            }
        })
        expect(wrapper.html()).toMatch(description)
    })
})