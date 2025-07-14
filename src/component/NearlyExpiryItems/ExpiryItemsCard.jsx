import { Link } from 'react-router';
import Container from '../layout/Container/Container';

const ExpiryItemsCard = ({ post }) => {
    const { name , _id, availability, location, roomType, title , rent  } = post;
	const formatName = (str) => {
		if(!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

    return (
        <Container>
			<div className='text-centermax-w-md border border-gray-300 rounded-4xl md:p-6 p-3'>
			<div className='flex flex-row gap-5 '>
				<div className='w-full'>
					<div className='flex flex-col gap-2'>
						<div className='flex flex-row gap-2 mb-2'>
							<button className='bg-[#09982F]/10 text-green-600 px-2 md:px-4 md:py-1 rounded-3xl text-[14px] md:text-sm  '>
								{availability}
							</button>
							<button className='bg-[#176AE5]/10 text-blue-600 px-3 py-1 rounded-full text-[10px] md:text-sm '>
								{roomType}
							</button>
						</div>
						<div className='text-gray-500 mb-3'>
							<h4 className='font-bold text-gray-800'>Name: {formatName(name)}</h4>
							<p className='text-[12px] md:text-[16px]'>Title: <span>{title}</span></p>
							<p className='text-[12px] md:text-[16px]'>Rent: <span>{rent}</span></p>
							<span>Location: {location}</span>

						</div>

						<Link to={`/postDetails/${_id}`}>
							<button className='btn bg-white border w-full  border-[#176AE5]/20 text-center text-[#176AE5] md:px-10 md:py-2 rounded-full shadow-none '>
								See more
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