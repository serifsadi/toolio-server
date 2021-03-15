import { expect } from "chai";
import { agent as request } from 'supertest';
import app from '../src/index';

const testCases = [
  { keyword: 'Awesome', count: 52 },
  { keyword: 'AWESOME', count: 52 },
  { keyword: 'awesome', count: 52 },
  { keyword: 'pApeR', count: 63 },
  { keyword: 'PAPER', count: 63 },
  { keyword: 'car', count: 44 },
  { keyword: 'CHAIR', count: 54 },
];

describe("API Test", () => {

  it("should always fail - Missing required query parameter [keyword]", async () => {

    const res = await request(app)
      .get('/products')
      .send();

    expect(res.status).to.equal(400);

  });

  it("should always fail - Missing required query parameter [keyword]", async () => {

    const res = await request(app)
      .get('/products?keyword=')
      .send();

    expect(res.status).to.equal(400);

  });

  it("should always fail - Missing required query parameter [keyword]", async () => {

    const res = await request(app)
      .get('/products?query=Awesome')
      .send();

    expect(res.status).to.equal(400);

  });

  testCases.forEach((data) => {

    it(`should POST /products?keyword=${data.keyword}`, async () => {

      const res = await request(app)
        .get(`/products?keyword=${data.keyword}`)
        .send();

      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.empty;
      expect(res.body).to.be.an("array");

      expect(res.body).to.have.lengthOf(data.count)
      res.body.every((p: any) => {
        expect(Object.keys(p)).to.have.lengthOf(2)
        expect(p).to.have.keys(['id', 'title'])
      });

    });

  });

});
