import api from './axiosConfig';


//    CRUD GLOBAL FUNCTIONS 
export const baseApi =
{
    // 1. (Read)
    getAll: async (endpoint, params = {}) => {
        const res = await api.get(endpoint, { params });
        return res
    },
    // 2.  (Read) by id
    getOne: async (endpoint, id, params = {}) => {
      
        const res = await api.get(`${endpoint}/${id}?populate=*`, { params });;
        return res
    },
 
    // 3.(Create)
    create: async (endpoint, data) => {
        const res = await api.post(endpoint, { data });
        return res
    },

    // 4. (Update)
    update: async (endpoint, id, quantity) => {
        const res = await api.put(`${endpoint}/${id}`, {
            data: {
                quantity: quantity,
            }
        });
        return res;
    },

    // 5.(Delete)
    delete: async (endpoint, id) => {
        const res = await api.delete(`${endpoint}/${id}`);
        return res.data
    },
};
