import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`; // Replace with your API URL

export const fetchPlots = async (page, pageSize) => {
    try {
        const response = await axios.get(`${API_URL}plots?page=${page + 1}&limit=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching plots:", error);
        return [];
    }
};


export const uploadFile = async (formData) => {
    try {
        const response = await axios.post(API_URL + 'upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        return [];
    }
};