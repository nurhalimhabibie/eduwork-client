import axiosInstance from '../axiosInstance';

export const getProducts = async () => {
	try {
		const response = await axiosInstance.get('/api/products');
		return response.data.data; // Mengembalikan respons data lengkap
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};
