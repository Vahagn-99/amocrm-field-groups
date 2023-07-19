import apiClient from "../../apiClient";

const selectable = {
    namespaced: true,
    state: {
        countries: [],
    },
    getters: {
        getCountries: (state) => state.countries,
    },
    mutations: {
        setCountries: (state, countries) => state.countries = countries,
    },
    actions: {
        getCountries: async ({ commit }) => {
            const resposne = await apiClient.get(`/countries`);
            const countries = resposne.data.data
            commit("setCountries", countries);
        },
    },
}

export default selectable;