const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let db, validID;

let Character = require("../../../models/characters");

//
describe("Characters", () => {
    describe("GET /characters", () => {
        before(async function () {
            await Character.deleteMany({});
            await Character.create(testCharacter);
        });
        it("should return all the characters", async () => {
            await request(server)
                .get("/characters")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .then(res => {
                    const characters = JSON.parse(res.text);
                    expect(characters).to.have.length(1);
                    expect(characters[0]._id).to.equal(testCharacter._id.toString());
                    expect(characters[0].CharacterName).to.equal(testCharacter.CharacterName);
                });
        });
    });
    describe("GET /characters/:id", () => {
        // describe("when the id is valid", () => {
        it("should return the matching characters", async () => {
            await request(server)
                .get(`/characters/${testCharacter._id}`)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .then(async res => {
                    const character = res.body;
                    expect(character._id).to.equal(testCharacter._id.toString());
                    expect(character.CharacterName).to.equal(testCharacter.CharacterName)
                await Character.deleteMany({});
                });
        });
    });
describe("POST /character", () => {
    it("should return confirmation message and update testCharacter", () => {
        const character = {
            upvotes: 4,
            CharacterName: "Gerard",
            level: 7
        };
        return request(server)
            .post("/characters")
            .send(character)
            .expect(200)
            .then(result => {
                expect(result.body.message).to.equal('Character Successfully Added!');
            })
    });
});

});
const testCharacter = new Character({
    upvotes: 4,
    CharacterName: "Gerard",
    level: 7

});


//    describe("when the id is invalid", () => {
//        it("should return the NOT found message", done => {
//            request(server)
//                .get("/characters/5dbfff991c9d4400000d7da7")
//                .set("Accept", "application/json")
//                .expect("Content-Type", /json/)
//                .expect(200)
//                .expect({message: "Character NOT Found!"}, (err, res) => {
//                    done(err);
//                });
//         });


// describe("GET /characters/:id", () => {
//     describe("when the id is valid", () => {
//         it("should return the matching character", done => {
//             request(server)
//                 .get(`/characters/${testCharacter._id}`)
//                 .set("Accept", "application/json")
//                 .expect("Content-Type", /json/)
//                 .expect(200)
//                 .then((err, res) => {
//                     expect(res.body).to.deep.include(testCharacter);
//                     done(err);
//                 });
//         });
//     });







