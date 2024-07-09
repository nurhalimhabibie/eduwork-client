import axiosInstance from '../axiosInstance';

export const fetchCartItems = async () => {
	try {
		const response = await axiosInstance.get('/api/carts');
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : 'Server error';
	}
};

export const updateCartItems = async (items) => {
	try {
		const response = await axiosInstance.put('/api/carts', { items });
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : 'Server error';
	}
};
