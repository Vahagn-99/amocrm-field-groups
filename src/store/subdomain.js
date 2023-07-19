import apiClient from "../../apiClient";

const subdomain = {
    namespaced: true,
    state: {
        subdomainId: localStorage.getItem("subdomain_id"),
        subdomain: null,
        isRegistred: false,
        isWidgetRegistred: false,
        isExists: false,
        isLicensed: false,
        hasPhone: false,
    },
    getters: {
        getSubdomainId: (state) => state.subdomainId,
        isRegistred: (state) => state.isRegistred,
        isExists: (state) => state.isExists,
        isLicensed: (state) => state.isLicensed,
        hasPhone: (state) => state.hasPhone,
        getSubdomain: (state) => state.subdomain,
    },
    mutations: {
        setSubdomainId: (state, subdomainId) => state.subdomainId = subdomainId,
        setIsRegistred: (state, isRegistred) => state.isRegistred = isRegistred,
        setIsExists: (state, isExists) => state.isExists = isExists,
        setIsLicensed: (state, isLicensed) => state.isLicensed = isLicensed,
        setHasPhone: (state, hasPhone) => state.hasPhone = hasPhone,
        setSubdomain: (state, subdomain) => state.subdomain = subdomain,
        setIsSaved: (state, isSaved) => state.isSaved = isSaved,
    },
    actions: {
        // save new client data in the back-end
        async: async ({ commit }, subdomainName) => {
            const resposne = await apiClient.get(`subdomains/${subdomainName}/async`, { byWidgetId: true });
            const subdomain = resposne.data.data;
            commit("setSubdomainId", subdomain.id);
            commit("setSubdomain", subdomain);
            localStorage.setItem("subdomain_id", subdomain.id);
        },
        store: async ({ commit }, data) => {
            const resposne = await apiClient.post("subdomains", data, { byWidgetId: true });
            const subdomain = resposne.data.data;
            commit("setSubdomainId", subdomain.id);
            commit("setSubdomain", subdomain);
            localStorage.setItem("subdomain_id", subdomain.id);
        },
        destory: async (subdomainId) => {
            await apiClient.delete(`subdomains/${subdomainId}`, { byWidgetId: true });
            localStorage.clear();
        },
        checkIsRegistred: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`subdomains/${subdomainId}/status`, { byWidgetId: true });
            const { status } = resposne.data.data
            commit("setIsRegistred", status);
        },
        checkIsLicensed: async ({ commit }, subdomainId) => {
            const resposne = await apiClient.get(`subdomains/${subdomainId}/license`, { byWidgetId: true });
            const { status } = resposne.data.data
            commit("setIsLicensed", status);
        },
        checkIsExists: async ({ commit }, subdomain) => {
            const resposne = await apiClient.get(`subdomains/${subdomain}/exists`, { byWidgetId: true });
            const { status } = resposne.data.data
            commit("setIsExists", status);
        },
        checkHasPhone: async ({ commit, state }) => {
            const resposne = await apiClient.get(`subdomains/${state.subdomainId}/phone`, { byWidgetId: true });
            const { status } = resposne.data.data
            commit("setHasPhone", status);
        },
        checkIsSaved: async ({ commit, state }) => {
            const resposne = await apiClient.get(`subdomains/${state.subdomainId}/saved`, { byWidgetId: true });
            const { status } = resposne.data.data
            commit("setIsSaved", status);
        },
        addPhone: async ({ state }, { phone, country, mask }) => {
            await apiClient.post(`subdomains/${state.subdomainId}/phone`, { phone: phone, country: country, mask: mask }, { byWidgetId: true });
        }
    },
}

export default subdomain;