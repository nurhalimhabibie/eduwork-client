import axiosInstance from '../axiosInstance';

export const getCategories = async () => {
	try {
		const response = await axiosInstance.get('/api/categories');
		return response.data; // Mengembalikan respons data lengkap
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};
