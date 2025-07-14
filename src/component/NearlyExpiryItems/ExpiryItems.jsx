import { use, useEffect, useState } from 'react';
import Container from '../layout/Container/Container';
import { AuthContext } from '../context/AuthContext';
import Loading from '../Loading/Loading';
import ExpiryItemsCard from './ExpiryItemsCard';


const ExpiryItems = ({ roommatesData }) => {
	const { loading } = use(AuthContext);
	const [display, setDisplay] = useState([]);
	const [viewAll, setViewAll] = useState(false);

	console.log(roommatesData);

	useEffect(() => {

	   if(!roommatesData) return ;

	   const availablePosts = roommatesData?.filter(avail => avail.availability === 'available');

		if (viewAll) {
			setDisplay(availablePosts);
		} else {
			const limitedData =availablePosts?.slice(0, 6);
			setDisplay(limitedData);
		}
	}, [roommatesData, viewAll]);

	if (loading) {
		return <Loading />
	}

	// if(!roommatesData){
	// 	return (
	// 		<div className='bg-white'>
	// 			<Container>
	// 				<div className='text-center mt-10'>
	// 					<p className='text-green-700'>Loading Nearly expired Food....</p>
	// 				</div>
	// 			</Container>

	// 		</div>
	// 	)
	// }

	return (
		<div className=' bg-white '>
			<Container>
				<div className='container mx-auto md:p-10 py-3 '>
					<div className='text-center items-center px-10 md:px-24 text-black mb-4 '>
						<h1 className='font-bold text-2xl  md:text-3xl'>Nearly Expiry Food Items
						</h1>
						<p className='text-gray-500 text-[9px] md:text-[16px] p-4'>
							Almost Expired – Take Action Now!
						</p>
					</div>
					{
						display.length === 0 ? (
							<div className='text-center mt-10'>
								<p className='text-gray-500 text-lg'>No Food Items Found</p>
							</div>
						) :
							(
								<div className='grid grid-cols-1 md:grid-cols-2 gap-1  '>
									{
										display?.map((post) => (
											<ExpiryItemsCard key={post._id} post={post}></ExpiryItemsCard>
										))
									}
								</div>
							)
					}
					<div className='text-center mt-10'>
						<button
							onClick={() => setViewAll(!viewAll)}
							className='btn border border-none md:w-2/12 bg-[#24ab63] text-white text-sm md:text-xl px-6 md:px-10 rounded-full md:py-7 '
						>
							{viewAll ? 'Show Less' : 'See More'}
						</button>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default ExpiryItems;



