import { PokemonService } from "@/repositories/index"
import { cloneObject } from "@/utilities"

export const state = () => ({
    list: [],
    limit: 20,
    offset: 20,
    totalItems: 0,
    detail: {}
})

export const mutations = {
    UPDATE_LIST(ctxState, data) {
        const { results, count } = data || {}
        const isEmpty = !Boolean(ctxState.list.length)
        const mapData = (results ?? []).map(item => ({
            name: item.name,
            status: false,
            url: item.url
        })) ;

        ctxState.totalItems = count
        
        if(isEmpty) {
            ctxState.list = mapData 
        } else ctxState.list.push(...mapData)
    },
    UPDATE_DETAIL(ctxState, data) {
        debugger
        const {  name, weight, height, types, sprites } = data || {}
        const { status } = ctxState.list.find(item => item.name == name) || {}
        ctxState.detail = {
            name, weight, height, types, status, image: sprites?.other.dream_world.front_default
        }
    },
    UPDATE_STATUS(ctxState, data) {
        const { name, status } = data || {}; 
        const itemIndex = ctxState.list.findIndex(item => item.name == name) 
        if(itemIndex == -1) return
        ctxState.list[itemIndex].status = true;
        ctxState.list = cloneObject(ctxState.list)
    },
    INCREMENT_PAGINATION_OFFSET(ctxState) {
        ctxState.offset += ctxState.limit
    },
    UPDATE_PAGINATION_LIMIT(ctxState, data) {
        ctxState.offset = data
    }
}

export const actions = {
    async getList(ctx) {
        try {
            const response = await PokemonService.getList(this.$axios, ctx.state.offset);
            ctx.commit("UPDATE_LIST", response)
        } catch(error) {
            ctx.commit("UPDATE_LIST", [])
            console.error(error);
        }
    },
    async getDetail(ctx, name) {
        return await PokemonService.getDescription(this.$axios, name);
    }
}
