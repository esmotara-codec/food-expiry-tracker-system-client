import { useEffect, useState } from 'react';
import axios from 'axios';
import ExpiryItemsCard from './ExpiryItemsCard';


const ExpiringSoonSection = () => {
	const [expiringItems, setExpiringItems] = useState([]);

	useEffect(() => {
		const fetchExpiringItems = async () => {
			try {
				const res = await axios.get('http://localhost:5000/expiring-soon');
				setExpiringItems(res.data);
			} catch (error) {
				console.error('Failed to fetch expiring items:', error);
			}
		};

		fetchExpiringItems();
	}, []);

	if (expiringItems.length === 0) {
		return null;
	}

	return (
		<div className="py-8">
			<h2 className="text-2xl font-bold text-red-600 text-center mb-6">
				⚠️ Items Expiring Soon
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12">
				{expiringItems.map((item) => (
					<ExpiryItemsCard key={item._id} post={item} />
				))}
			</div>
		</div>
	);
};

export default ExpiringSoonSection;
