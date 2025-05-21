const userRegisterconnection = require( '../config/userRegisterdb');
const products = require('../data/products.json');


exports.getProducts = async (req, res, next) => {

  
   const searchName = req.query.name || ''; // default to empty string

  try {
    const query = searchName
      ? 'SELECT * FROM product_with_images WHERE name LIKE ?'
      : 'SELECT * FROM product_with_images';

    const values = searchName ? [`%${searchName}%`] : [];

    const [rows] = await userRegisterconnection
      .promise()
      .query(query, values);
      if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  
      const productMap = {};
  
      for (const item of rows) {
        const id = item.product_id;
  
        // Initialize product if not already in the map
        if (!productMap[id]) {
          productMap[id] = {
            product_id: id,
            name: item.name,
            price: parseFloat(item.price),
            description: item.description,
            ratings: parseFloat(item.ratings),
            images: [],
            category: item.category,
            seller: item.seller,
            stock: item.stock
          };
        }
  
        // Add image if available
        if (item.image) {
          productMap[id].images.push({ image: item.image });
        }
      }

    //   console.log(productMap)

  
      const products = Object.values(productMap);
    //   console.log("Formatted products:", JSON.stringify(products, null, 2));
  
      res.json({ success: true, "products":products });

  
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to retrieve product." });
    }
  };
  


    exports.importProducts = async (req, res) => {
        try {
          for (const product of products) {
            const [result] = await userRegisterconnection.promise().query(
              `INSERT INTO product (name, price, description, ratings, category, seller, stock)
               VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                product.name,
                product.price,
                product.description,
                product.ratings,
                product.category,
                product.seller,
                product.stock
              ]
            );
      
            // console.log("result",result)
      
            const productId = result.insertId;
      
            // Insert images
            for (const img of product.images) {
              await userRegisterconnection.promise().query(
                `INSERT INTO product_images (product_id, image) VALUES (?, ?)`,
                [productId, img.image]
              );
            }
          }
      
          res.status(201).json({ success: true, message: "Products imported successfully." });
        } catch (error) {
          console.error("Import error:", error);
          res.status(500).json({ success: false, message: "Failed to import products." });
        }
      };

exports.singleProduct = (req, res, next) => {
    const productId = req.params.id; // or req.query.id, depending on routing

    const query = 'SELECT * FROM product_with_images WHERE product_id = ?';

    userRegisterconnection.query(query, [productId], (err, results) => {

        // console.log(results)
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product: results[0] });
    });
};
