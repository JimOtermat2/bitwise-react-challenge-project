import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';

const CURRENT_ORDERS_URL = `${SERVER_IP}/api/current-orders`;
const LIVE_ORDER_MODE_URL = `${SERVER_IP}/api/live-mode`;

class ViewOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    interval;

    // define our use functions
    refreshOrders = () => {
        fetch(CURRENT_ORDERS_URL)
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                this.setState({orders: response.orders});
            } else {
                console.log('Error getting orders');
            }
        });
    }

    turnOnLiveMode = () => {
        fetch(LIVE_ORDER_MODE_URL, {
            method: `POST`
        })
    }

    componentDidMount() {
        // refresh after mounting
        this.refreshOrders();
        // clear interval just in case
        clearInterval(this.interval);
        // start regular refresh, every 5 seconds
        this.interval = setInterval(this.refreshOrders, 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    <button className="btn btn-success" onClick={this.turnOnLiveMode}>Live Mode!</button>
                    <OrdersList
                        orders={this.state.orders}
                    />
                </div>
            </Template>
        );
    }
}

export default ViewOrders;