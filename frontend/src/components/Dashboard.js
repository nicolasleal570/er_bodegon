import React, { Component } from 'react'
import TopProductsChart from './partials/TopProductsChart';
import TopProductClient from './partials/TopProductClient';

export class Dashboard extends Component {
    render() {
        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h3>Categorías más Populares</h3>
                    </div>
                    <div className="card-body">
                        <TopProductsChart />
                    </div>
                </div>

                {/* <div className="card mt-4">
                    <div className="card-header">
                        <h3>Productos y Compradores más comunes</h3>
                    </div>
                    <div className="card-body">
                        <TopProductClient />
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Dashboard
