import { useLoaderData } from 'react-router';
import Banner from './Banner';
import Footer from './Footer';
import ExpiryItems from '../NearlyExpiryItems/ExpiryItems';

const Home = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            <Banner/>
           <ExpiryItems foodItemsdata ={data}/>
            <Footer/>
            
            
        </div>
    );
};

export default Home;
