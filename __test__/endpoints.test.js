const supertest = require('supertest');
const app =  require('../app');

const request = supertest(app);

const user = {
  id: '1',
  name: 'Vitali',
};

const updatedUser = {
  name: 'Vitali Santalau',
};

describe("Test endpoints", () => {
  it("api is working", (done) => {
    request
      .get('/api')
      .expect(200)
      .expect('api is working')
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("check wrong route", (done) => {
    request
      .get('/api/wrong')
      .expect(404)
      .expect('Ooops, something is wrong. You should check the route.')
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("api/users should return 'Users not found'", (done) => {
    request
      .get('/api/users')
      .expect(404)
      .expect({ error: "Users not found" })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("POST api/users should create user", (done) => {
    request
      .post(`/api/users`)
      .send(user)
      .expect(201)
      .expect(user)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("GET api/users/:id should return user", (done) => {
    request
      .get(`/api/users/1`)
      .expect(200)
      .expect(user)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("PUT api/users/:id should update user", (done) => {
    request
      .put(`/api/users/1`)
      .send(updatedUser)
      .expect(200)
      .expect(updatedUser)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("DELETE api/users/:id should delete user", (done) => {
    request
      .delete(`/api/users/1`)
      .expect(200)
      .expect({})
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("api/users/:(wrong id) should return 'User not found'", (done) => {
    request
      .get(`/api/users/1`)
      .expect(404)
      .expect({ error: "User not found" })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
