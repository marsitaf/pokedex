import Card from "@/components/PokeCard"
import { shallowMount } from "@vue/test-utils"

describe("Card", () => {
    it("Emits a select event on click", async () => {
        const wrapper = shallowMount(Card)
        wrapper.trigger("click")
        expect(wrapper.emitted().select[0]).toEqual([])
    })
})