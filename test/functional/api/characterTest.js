const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let datastore = require("../../../models/characters");

describe("Characterss", () => {
    describe("GET /characters", () => {
        it("should return all the characters", done => {
            request(server)
                .get("/characters")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(2);
                    done(err);
                });
        });
    });
});


                // .end((err, res) => {
                //     expect(res.body).to.be.a("array");
                //     expect(res.body.length).to.equal(2);
                //     const result = _.map(res.body, character => {
                //         return { id: character.id};
                //     });
                //     expect(result).to.deep.include({_id: "5db464721c9d4400000181d3"});
                //     expect(result).to.deep.include({_id: "5db4a28321ebfc0fe0a03256"});
                //     done(err);
                // });