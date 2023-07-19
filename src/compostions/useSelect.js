import { computed } from 'vue';
import { useStore } from 'vuex';

export function useSelect() {
    const store = useStore();
    // selectable datas
    const countries = computed(() => store.getters['selectable/getCountries']);
    // fetch selectable data
    const getCountries = async () => await store.dispatch('selectable/getCountries');

    return {
        getCountries,
        countries
    };
}