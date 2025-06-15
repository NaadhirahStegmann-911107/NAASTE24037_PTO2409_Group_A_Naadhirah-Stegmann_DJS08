/* eslint-disable no-unused-vars */
import React from'react';
import { useParams, Link, Outlet } from "react-router-dom";

export default function HostVanDetail() {
    const { id } = useParams();
    const [currentVan, setCurrentVan] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/host/vans/vans/${id}`)
            .then(res => res.json())
            .then(data => setCurrentVan.log(data))
    }, [id])

    if (!currentVan) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            <Link to=".." realtive="path" className="back-button">&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} width={150} />
                    <div className="host-van-details-info-text">
                        <i className={`van-type- van-type-${currentVan.type}`}>{currentVan.type}</i>
                        <h3>{currentVan.name}</h3>
                        <h4>{currentVan.price}</h4>
                    </div>
                </div>
                <Outlet />
            </div>
        </section>
    );
}