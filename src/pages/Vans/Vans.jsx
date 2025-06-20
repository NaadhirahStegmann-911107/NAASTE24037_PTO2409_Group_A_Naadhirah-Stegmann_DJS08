import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vans, setVans] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    const typeFilter = searchParams.get("type");

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data);
            
                } catch (err) {
                    console.log(err);
                } finally {  
                    setLoading(false)
                }
            }       

            loadVans();
    }, []);
        

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans;
    
    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-title">
            <Link to={van.id} state={{search: `?${searchParams.toString()}`, type: typeFilter }}>
                <img src={van.imageURL} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    if(loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.buttons}</h1>
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button onClick={() => handleFilterChange({type: "simple"})} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>Simple</button>
                <button onClick={() => handleFilterChange({type: "luxury"})} className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>Luxury</button>
                <button onClick={() => handleFilterChange({type: "rugged"})} className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>Rugged</button>

                {typeFilter ? (<button onClick={() => handleFilterChange({})} className="van-type clear-filter">Clear Filter</button>) : null}

            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}