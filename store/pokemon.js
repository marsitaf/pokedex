import { PokemonService } from "@/repositories/index"
import { cloneObject } from "@/utilities"

export const state = () => ({
    list: [],
    limit: 20,
    offset: 20,
    totalItems: 0,
    detail: {},
    showDetailModal: false
})

export const mutations = {
    UPDATE_LIST(ctxState, data) {
        const { results, count } = data || {}
        const isEmpty = !Boolean(ctxState.list?.length)
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
        const transformTypesToString = (types) => {
            if(!types || !Array.isArray(types)) return ""
            let typesFilter = types.map(item => item.type?.name)

            return typesFilter.join(", ")
        }
        
        ctxState.detail = {
            name: data?.name ?? "", 
            weight: data?.weight ?? "", 
            height: data?.height ?? "", 
            image: data?.sprites?.other.dream_world.front_default ?? "", 
            types: transformTypesToString(data?.types), 
            status
        }
    },
    UPDATE_SHOW_DETAIL_MODAL(ctxState, condition) {
        ctxState.showDetailModal = condition;
    },
    UPDATE_STATUS(ctxState, data) {
        const { name, status } = data || {}; 
        const itemIndex = ctxState.list.findIndex(item => item.name == name) 
        if(itemIndex == -1) return
        ctxState.list[itemIndex].status = status;
        ctxState.list = cloneObject(ctxState.list)
    },
    INCREMENT_PAGINATION_OFFSET(ctxState) {
        ctxState.offset += ctxState.limit
    },
    UPDATE_PAGINATION_LIMIT(ctxState, data) {
        ctxState.offset = data
    },
    RESET_DATA(ctxState) {
        ctxState.list = []
        ctxState.offset = 20
        ctxState.totalItems = 0
    }
}

export const actions = {
    async getList(ctx) {
        try {
            const response = await PokemonService.getList(this.$axios, ctx.state.offset);
            ctx.commit("UPDATE_LIST", response)
        } catch(error) {
            ctx.commit("UPDATE_LIST", [])
            alert("Ha ocurrido un error. Inténtalo de nuevo")
        }
    },
    async getDetail(ctx, name) {
        try {
            const response = await PokemonService.getDescription(this.$axios, name);
            ctx.commit("UPDATE_DETAIL", response)
            ctx.commit("UPDATE_SHOW_DETAIL_MODAL", true)
        } catch(error) {
            ctx.commit("UPDATE_DETAIL", {})
        }
    }
}
