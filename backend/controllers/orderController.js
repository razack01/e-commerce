const userRegisterconnection = require( '../config/userRegisterdb');

exports.createOrder = (req, res) => {
    const cartItems = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total amount
    let amount = 0;
    cartItems.forEach(item => {
        amount += item.product.price * item.qty;
    });
    amount = amount.toFixed(2);
    console.log("amount",amount)

    
    const status = 'pending';
    const cartItemsJSON = JSON.stringify(cartItems);

    const insertOrderQuery = `INSERT INTO orders (cartItems, amount, status, createdAt) VALUES (?, ?, ?, NOW())`;

    userRegisterconnection.query(insertOrderQuery, [cartItemsJSON, amount, status], (err, result) => {
        if (err) {
            console.error('Insert order error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        console.log(result)

        const orderId = result.insertId;
        console.log("orderID",orderId)
       res.json({
        success: true,
        message: "Order created successfully",
        order: {
            orderId,
            cartItems: JSON.parse(cartItemsJSON),
            amount,
            status
        }
    });

        // // Now update stock for each product
        // let updateCount = 0;
        // cartItems.forEach(item => {
        //     const updateStockQuery = `UPDATE products SET stock = stock - ? WHERE id = ?`;

            // userRegisterconnection.query(updateStockQuery, [item.qty, item.product._id], (err2) => {
            //     if (err2) {
            //         console.error('Stock update error:', err2);
            //         // Optionally handle rollback here
            //     }

            //     updateCount++;
            //     if (updateCount === cartItems.length) {
            //         // All stock updates done
            //         res.json({
            //             success: true,
            //             orderId,
            //             message: 'Order created and stock updated'
            //         });
            //     }
            // });
        // });
    });
};
