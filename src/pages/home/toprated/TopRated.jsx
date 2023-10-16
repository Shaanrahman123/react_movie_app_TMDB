import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/UseFetch';
import Carousel from '../../../components/carousel/Carousel';


const TopRated = () => {

    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/top_rated`);



    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    }

    return (
        <div className='carouselSeciton'>
            <ContentWrapper>
                <span className='carouselTitle'>Top Rated</span>
                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel endpoint={endpoint} data={data?.results} loading={loading} />

        </div>
    )
}

export default TopRated