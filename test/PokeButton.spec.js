import Button from "@/components/PokeButton"
import { mount } from "@vue/test-utils"

describe("Button", () => {
    it("Pokebutton click event was emitted", () => {
        const onClick = jest.fn()
        const wrapper = mount(Button, {
            listeners: {
                click: onClick
            }
        })
        wrapper.trigger("click")
        expect(onClick).toHaveBeenCalled()
    })
})