const app = require('../../app');
const supertest = require("supertest");
describe ('Test suite de api v1 pacientes endpoint', () => {

    it("GET /api/v1/pacientes/", async () =>{
        await supertest(app).get('api/v1/pacientes')
        .set({apitoken:'90a18f68-7b98-4912-bc05-768a82bdb0ae'})
        .expect(200);
    });
});