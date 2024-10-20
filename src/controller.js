// src/controller.js

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// Get all items
exports.getItems = (req, res) => {
  res.status(200).json(items);
};

// Create a new item
exports.createItem = (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
};

// Update an item by id
exports.updateItem = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === itemId);

  if (!item) {
      return res.status(404).json({ message: 'Item not found' });
  }

  item.name = req.body.name || item.name;
  res.status(200).json(item);
};

// Delete an item by id
exports.deleteItem = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' }); // Mengembalikan pesan jika item tidak ditemukan
  }

  items.splice(itemIndex, 1);
  res.status(200).json({ message: 'Item deleted successfully' }); // Pesan ketika item berhasil dihapus
};

// Get an item by id
exports.getItemById = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === itemId);

  if (!item) {
      return res.status(404).json({ message: 'Item not found' });  // Pastikan ini mengirimkan pesan yang sesuai
  }

  res.status(200).json(item);
};

