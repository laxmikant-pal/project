const request = require('supertest');
const app = require('../app');

describe('Product Endpoints', () => {
    let token;
  
    beforeAll(async () => {
  
      const res = await request(app)
        .post('/auth/login')
        .send({
            username:"laxmikant",
            password:"14789558255"
        });
      token = res.body.token;
    });
  
    it('should create a new product', async () => {
        const res = await request(app)
          .post('/products/create')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Test Product',
            description: 'Test Description',
            price: 10.99,
            stockQuantity: 100
          });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name', 'Test Product');
        productId = res.body._id; 
      });
    
      
      it('should get a single product by its ID', async () => {
        const res = await request(app)
          .get(`/products/${productId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', productId);
      });
    
   
      it('should update a product', async () => {
        const updatedProductData = { name: 'Updated Product Name' };
        const res = await request(app)
          .put(`/products/${productId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedProductData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(updatedProductData);
      });
    
     
      it('should delete a product', async () => {
        const res = await request(app)
          .delete(`/products/${productId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Product deleted successfully');
      });
    });