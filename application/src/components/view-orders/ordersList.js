import React from 'react';

const OrdersList = (props) => {
    const { orders, OnEdit, OnDelete, OnEdittable, OnCancel } = props;
    if (!props || !props.orders || !props.orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

    return orders.map(order => {
        const createdDate = new Date(order.createdAt);
        if (order.edittable) {
            const menuItemChosen = (event) => {
                order.order_item = event.target.value;
            }
            const menuQuantityChosen = (event) => {
                order.quantity = event.target.value;
            }
            return (
                <div className="row view-order-container" key={order._id}>
                    <div className="col-md-4 view-order-left-col p-3">
                        <select
                            value={order.order_item}
                            onChange={(event) => menuItemChosen(event)}
                            className="menu-select"
                        >
                            <option value="Soup of the Day">Soup of the Day</option>
                            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                            <option value="Chili Con Carne">Chili Con Carne</option>
                        </select>
                        <p>Ordered by: {order.ordered_by || ''}</p>
                    </div>
                    <div className="col-md-4 d-flex view-order-middle-col">
                        <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                        <p>Quantity:
                        <select value={order.quantity} onChange={(event) => menuQuantityChosen(event)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select></p>
                    </div>
                    <div className="col-md-4 view-order-right-col">
                        <button className="btn btn-success" onClick={() => OnEdit(order)}>Update</button>
                        <button className="btn btn-danger" onClick={() => OnCancel()}>Cancel</button>
                    </div>
                </div>
            )
        }
        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    <h2>{order.order_item}</h2>
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                    <p>Quantity: {order.quantity}</p>
                </div>
                <div className="col-md-4 view-order-right-col">
                    <button className="btn btn-success" onClick={() => OnEdittable(order)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => OnDelete(order)}>Delete</button>
                </div>
            </div>
        );
    });
}

export default OrdersList;