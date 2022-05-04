import axiosClient from "./"

export const getSinglePostAPI = (id) => {
    return axiosClient.get(`/posts/${id}`)
}

export const deletePostAPI = (id) => {
    return axiosClient.delete(`/posts/${id}`)
}

export const updatePostAPI = (id, payload) => {
    return axiosClient.patch(`/posts/${id}`, payload)
}

export const getPostsAPI = () => {
    return axiosClient.get('/posts')
}

export const createPostAPI = (payload) => {
    return axiosClient.post('/posts', payload)
}

