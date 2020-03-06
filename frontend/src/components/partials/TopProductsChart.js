import React, { Component } from 'react'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';


export class TopProductsChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topCategoriesLoading: true,
            data: {
                labels: [],
                datasets: []
            }
        }
    }

    componentDidMount() {
        let data = [];
        let labels = [];
        let datasets = [];
        axios.get('http://localhost:8000/api/top/categories/').then(res => {
            res.data.success.forEach(item => {
                data.push(item.id);
                labels.push(item.name.toUpperCase());
            });

            datasets.push({
                label: 'Categorías más populares',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            });


            this.setState({
                ...this.state,
                data: {
                    ...this.state.data,
                    labels: labels,
                    datasets: datasets
                }
            }, () => {
                this.setState({ ...this.state, topCategoriesLoading: false })
                console.log(this.state.data);

            });

        }).catch(err => console.log(err));
    }

    render() {
        return (
            this.state.topCategoriesLoading ? '' : <Doughnut data={this.state.data} />
        )
    }
}

export default TopProductsChart
