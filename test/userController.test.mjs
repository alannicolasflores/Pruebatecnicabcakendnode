// test/userController.test.mjs
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';// Asegúrate de que esta ruta sea correcta

const { expect } = chai;

chai.use(chaiHttp);

describe('User Controller', () => {
  describe('POST /api/users', () => {
    it('should create a new user', (done) => {
      chai.request(app)
        .post('/api/users')
        .send({
          nombre: 'Juan',
          apellido: 'Pérez',
          email: 'juan.perez@example.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').eql('Usuario creado exitosamente');
          done();
        });
    });

    it('should not create a user with missing fields', (done) => {
      chai.request(app)
        .post('/api/users')
        .send({
          nombre: 'Juan'
          // Falta apellido, email y password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});