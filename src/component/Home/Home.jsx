import { useLoaderData } from 'react-router';
import Banner from './Banner';
import Footer from './Footer';
import ExpiryItems from '../NearlyExpiryItems/ExpiryItems';
import FeatureSection from './Featured/FeatureSection';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    const data = useLoaderData();
    // console.log(data);
    return (
        <div>
            <Banner/>
           <ExpiryItems foodItemsdata ={data}/>
           <FeatureSection/>
           <WhyChooseUs/>
            <Footer/>
            
            
        </div>
    );
};

export default Home;
