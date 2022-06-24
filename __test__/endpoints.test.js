const supertest = require('supertest');
const app =  require('../app');
const uuid = require('uuid');

const request = supertest(app);

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

  // it("api/users should return 'Users not found'", (done) => {
  //   request
  //     .get('/api/users')
  //     .expect(404)
  //     .expect({ error: "Users not found" })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       return done();
  //     });
  // });

  it("api/users/:(wrong id) should return 'User not found'", (done) => {
    const id = uuid.v1();
    request
      .get(`/api/users/${id}`)
      .expect(404)
      .expect({ error: "User not found" })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
