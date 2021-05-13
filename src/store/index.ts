import { createStore } from 'vuex'
import { $dogCeo } from "../libs";
interface Istate {
    count: number;
    dogInfo: any;
}

export function initStore() {
    const store = createStore<Istate>({
        state() {
            return {
                count: 0,
                dogInfo: {}
            }
        },
        mutations: {
            increment(state: Istate) {
                state.count++
            },
            setDogInfo(state: Istate, data = {}) {
                state.dogInfo = data
            }
        },
        actions: {
            increment(context: any) {
                context.commit('increment')
            },
            async setDogInfo(context: any) {
                const _dogInfo = await $dogCeo.get("/breeds/image/random");
                context.commit('setDogInfo', _dogInfo)
                return _dogInfo;
            }
        }
    });
    return store;
}
