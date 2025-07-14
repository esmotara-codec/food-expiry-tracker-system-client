import { Link } from 'react-router';
import Container from '../layout/Container/Container';

const ExpiryItemsCard = ({ post }) => {
    const { title , _id, expiryDate, Category , image } = post;
	const formatName = (str) => {
		if(!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

    return (
        <Container>
			<div className='bg-white border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 '>
				<div className='p-5'>
						<div className='flex flex-row gap-5'>
							<div>
								<img src={image} 
								alt="Food-image" 
								className='w-28 h-40 md:h-32 object-cover rounded-2xl'
								/>
							</div>
							<div className='flex flex-col flex-grow gap-4'>
								<div>
									<h2 className='text-lg md:text-xl font-semibold text-gray-700 '>{title}</h2>
								<p className='text-gray-700 text-sm md:text-[14px] font-semibold'>Category : {formatName(Category)}</p>
								<p className='text-gray-700 text-sm md:text-[14px] font-semibold'>Expiry dates : {formatName(expiryDate)}</p>
								</div>
								<Link to={`/postDetails/${_id}`}>
							<button className='btn bg-white w-full border  border-[#24ab63]/20 text-center text-[#24ab63] md:px-5 md:py-2 rounded-full shadow-none '>
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