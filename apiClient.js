import axios from 'axios';

window.baseUrl = 'https://widgets-api.dicitech.com/api/widgets/';
const apiClient = axios.create({
    baseURL: window.baseUrl,
    byWidgetId: false, // set default to false
});

// Helper function to get widget id
async function getWidgetId() {

    const { data: { data: { id: widgetId } } } = await apiClient.get('info/field-groups');
    localStorage.setItem('field-groups_widget_id', widgetId);
    return widgetId;
}

apiClient.interceptors.request.use(async (config) => {
    if (config.byWidgetId) {
        const id = await getWidgetId();
        config.url = `${id}/${config.url}`; // append the widget id to the endpoint
    }
    delete config.byWidgetId; // remove custom parameter
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default apiClient;
