import React, { useState, useEffect } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/UseFetch';
import { useSelector } from 'react-redux';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import Spinner from "../../../components/spinner/Spinner";

const HeroBanner = () => {


    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("")

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data])

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }

    }

    const searchClickHandler = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`)

        }
    }

    return (
        <>
            {
                loading ? (<Spinner initial={true} />)
                    : (<div className='heroBanner'>
                        <div className="backdrop-img">
                            <Img src={background} />
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="heroBannerContent">
                                <span className="title">
                                    Unlimited movies, TV shows and more</span>
                                <span className="subTitle">Millions of movies, TV Shows and people to discover. Explore Now !</span>
                                <div className="searchInput">
                                    <input onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Seach for movie or tv show....' />
                                    <button onClick={searchClickHandler}>Search</button>
                                </div>
                            </div>
                        </ContentWrapper>
                    </div>
                    )
            }
        </>
    )

}

export default HeroBanner
