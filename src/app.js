const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const controller = require('./controller');
app.use(express.json());

// Routes
app.get('/api/items', controller.getItems);
app.post('/api/items', controller.createItem);
app.put('/api/items/:id', controller.updateItem); // Update route
app.delete('/api/items/:id', controller.deleteItem); // Delete route

// Start the server only if the script is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`API is running on http://localhost:${port}`);
    });
}
// Middleware untuk parsing JSON
app.use(express.json());

// Rute DELETE
app.delete('/api/items/:id', controller.deleteItem); // Pastikan fungsi `deleteItem` sudah didefinisikan

module.exports = app;
