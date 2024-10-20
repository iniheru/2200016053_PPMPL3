const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
    
    let createdItemId; // Variabel untuk menyimpan ID item yang dibuat

    // Test to create a new item
    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Item 3');
                createdItemId = res.body.id; // Simpan ID item yang baru dibuat
                done();
            });
    });

    // Test to get all items
    it('should return all items', (done) => {
        request(app)
            .get('/api/items')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.at.least(1);
                done();
            });
    });

    // Test to update an item by id
    it('should update an item by id', (done) => {
        const updatedItem = { name: 'Updated Item 3' };
        request(app)
            .put(`/api/items/${createdItemId}`)
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('name', 'Updated Item 3');
                done();
            });
    });

// Controller method to get item by id
exports.getItemById = (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === itemId);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
};

    // Test to delete an item by id
    it('should delete an item by id', (done) => {
        request(app)
            .delete(`/api/items/${createdItemId}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Item deleted successfully');
                done();
            });
    });

// Test to ensure the item was deleted
it('should not find the deleted item', (done) => {
    request(app)
        .get(`/api/items/${createdItemId}`)
        .end((err, res) => {
            expect(res.status).to.equal(404);  // Pastikan status 404
            expect(res.body).to.have.property('message', 'Item not found');  // Pastikan ada properti 'message'
            done();
        });
});

    // Test to update an item that does not exist
    it('should return 404 when updating a non-existing item', (done) => {
        const updatedItem = { name: 'Non-existing Item' };
        request(app)
            .put(`/api/items/999`) // ID yang tidak ada
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Test to delete an item that does not exist
    it('should return 404 when deleting a non-existing item', (done) => {
        request(app)
            .delete(`/api/items/999`) // ID yang tidak ada
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

});
