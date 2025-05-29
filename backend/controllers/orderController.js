const userRegisterconnection = require( '../config/userRegisterdb');

exports.createOrder =  async(req, res) => {
    const cartItems = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    try {
        // Calculate total amount
        let amount = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.products.price);
            const qty = item.qty;
            amount += price * qty;
        });
        amount = amount.toFixed(2);
        const status = 'pending';
        const cartItemsJSON = JSON.stringify(cartItems);

        // Insert order
        const [result] = await userRegisterconnection.promise().query(
            `INSERT INTO orders (cartItems, amount, status, createdAt) VALUES (?, ?, ?, NOW())`,
            [cartItemsJSON, amount, status]
        );

        const orderId = result.insertId;

        // Update stock for each item
        for (const item of cartItems) {
            await userRegisterconnection.promise().query(
                `UPDATE product_with_images SET stock = stock - ? WHERE product_id = ?`,
                [item.qty, item.products.product_id]
            );
        }

        res.json({
            success: true,
            message: "Order created and stock updated",
            order: {
                orderId,
                cartItems,
                amount,
                status
            }
        });

    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create order or update stock",
            error: err.message
        });
    }
};


exports.allOrders = async (req, res) => {
    try {
      const [rows] = await userRegisterconnection.promise().query("SELECT * FROM orders");
      console.log("All orders:", rows);
      res.json(rows);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to retrieve orders." });
    }
  };
