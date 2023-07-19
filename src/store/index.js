import { createStore } from "vuex";
import subdomain from "./subdomain";
import selectable from "./selectable";

const store = createStore({
    modules: {
        subdomain,
        selectable
    }
});

export default store;