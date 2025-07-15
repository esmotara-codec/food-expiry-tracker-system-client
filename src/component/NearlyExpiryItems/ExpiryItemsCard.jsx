import { Link } from 'react-router-dom'; // 🛠️ Fix: react-router-dom, not react-router
import Container from '../layout/Container/Container';
import { useMemo } from 'react';

// Mapping range strings to number of days
const expiryMap = {
	 '1 Week': 7,
    '2 Weeks': 14,
    '1 Month': 30,
	'1-2months': 60,
	'3-6months': 120,
	'6-12months': 240,
	'1-1.5years': 365,
	 '2years': 730,
};

// Convert to actual expiry date
const getActualExpiryDate = (dateAdded, expiryRange) => {
	const daysToAdd = expiryMap[expiryRange] || 0;
	const addedDate = new Date(dateAdded);
	addedDate.setDate(addedDate.getDate() + daysToAdd);
	return addedDate.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
};

const ExpiryItemsCard = ({ post }) => {
	const { title, _id, expiryDate, Category, image, dateAdded } = post;

	const formatName = (str) => {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	const actualExpiryDate = useMemo(() => {
		if (!dateAdded || !expiryDate) return 'N/A';
		return getActualExpiryDate(dateAdded, expiryDate);
	}, [dateAdded, expiryDate]);

	const daysLeft = useMemo(() => {
		const expiry = new Date(getActualExpiryDate(dateAdded, expiryDate));
		const today = new Date();
		const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)); //
		return diff;
	}, [dateAdded, expiryDate]);

	return (
		<Container>
			<div className='bg-white border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 '>
				<div className='p-5'>
					<div className='flex flex-row gap-5'>
						<div>
							<img
								src={image}
								alt='Food-image'
								className='w-28 h-40 md:h-32 object-cover rounded-2xl'
							/>
						</div>
						<div className='flex flex-col flex-grow gap-4'>
							<div>
								<h2 className='text-lg md:text-xl font-semibold text-gray-700 '>
									{title}
								</h2>
								<p className='text-gray-700 text-sm md:text-[14px] font-semibold'>
									Category : {formatName(Category)}
								</p>
								<p className='text-gray-700 text-sm md:text-[14px] font-semibold'>
									Expiry Date : {actualExpiryDate}
								</p>
								<p className='text-red-500 text-sm font-semibold'>
									{daysLeft > 0 ? `Expires in ${daysLeft} days` : 'Expired'}
								</p>
							</div>
							<Link to={`/foodDetails/${_id}`}>
								<button className='btn bg-white w-full border border-[#24ab63]/20 text-center text-[#24ab63] md:px-5 md:py-2 rounded-full shadow-none '>
									View Details
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ExpiryItemsCard;
