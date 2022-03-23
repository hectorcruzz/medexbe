const app = require('../../app');
const supertest = require("supertest");
describe ('Test suite de api v1 pacientes endpoint', ()=> {
  it("GET /api/v1/pacientes/", async ()=> {
    await supertest(app).get('/api/v1/pacientes')
      .set({ apitoken:'1d89504d-fc8c-4d74-af42-03fc64146363'})
      .expect(200);
  });
});
