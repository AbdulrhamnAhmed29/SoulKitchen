import api from './axiosConfig';


//    CRUD GLOBAL FUNCTIONS 
export const baseApi =
{
    // 1. (Read)
    getAll: async (endpoint, params = {}) => {
        const res = await api.get(endpoint, { params });
        return res.data
    },
    // 2.  (Read) by id
    getOne: async (endpoint, id, params = {}) => {
        const res = await api.get(`${endpoint}/${id}`, { params });;
        return res.data
    },

    // 3.(Create)
    create: async (endpoint, data) => {
        const res = await api.post(endpoint, { data });
        return res.data
    },

    // 4. (Update)
    update: async (endpoint, id, data) => {
        const res = await api.put(`${endpoint}/${id}`, { data });
        return res.data 
    },

    // 5.(Delete)
    delete: async (endpoint, id) => {
        const res = await api.delete(`${endpoint}/${id}`);
        return  res.data 
    },
};
