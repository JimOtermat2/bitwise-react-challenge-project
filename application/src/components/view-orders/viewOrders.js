import React, { useState, useEffect } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';

const CURRENT_ORDERS_URL = `${SERVER_IP}/api/current-orders`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;
const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);

    // define our use functions
    const refreshOrders = () => {
        fetch(CURRENT_ORDERS_URL)
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                setOrders(response.orders);
            } else {
                console.log('Error getting orders');
            }
        });
    }

    const editOrder = ((order) => {
        // TODO: need to figure out what they want to edit it _to_
        console.log("EDITTING ORDER " + JSON.stringify(order));
        fetch(EDIT_ORDER_URL, {
            method: `POST`,
            body: JSON.stringify({
                id: order._id,
                ordered_by: order.ordered_by,
                quantity: order.quantity,
                order_item: order.order_item // was menu_item in the spec, but add order uses order_item, so guessing that's right
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log("Edit Success", JSON.stringify(response));
            if (response.success) {
                refreshOrders();
            }
        })
        .catch(error => console.error(error));
	})

	const edittableOrder = ((order) => {
		// turn off editting for all the other orders to avoid weirdness
		orders.map(o => o.edittable = false);
		// make this one specifically edittable
        order.edittable = true;
        // force a refresh
        setOrders([...orders]);
    })

	const deleteOrder = ((order) => {
        fetch(DELETE_ORDER_URL, {
            method: `POST`,
            body: JSON.stringify({
                id: order._id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                refreshOrders();
            }
        })
        .catch(error => console.error(error));
	})

    // refresh with effect
    useEffect(refreshOrders, [])

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                    OnEdit = {(order) => {editOrder(order)}}
                    OnDelete = {(order) => {deleteOrder(order)}}
                    OnEdittable = {(order) => {edittableOrder(order)}}
                    OnCancel = {() => {refreshOrders()}}
                />
            </div>
        </Template>
    );
}