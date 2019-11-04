const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let db, validID;

let Character = require("../../../models/characters");

//
describe("Characters", () => {
    beforeEach(async () => {
        await Character.deleteMany({});
        // datastore.push({
        //     _id: "5db4a28321ebfc0fe0a03256",
        //     upvotes: 4,
        //     CharacterName: "Gerard",
        //     level: 7
        //
        // });
        await Character.create(testCharacter);
        // datastore.push({
        //     _id: "5dbfff991c9d4400000d7da7",
        //     upvotes: 2,
        //     CharacterName: "GerardTwo",
        //     level: 49
        // });
    });

    describe("GET /characters", () => {
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
        describe("when the id is valid", () => {
            it("should return the matching characters", async () => {
                request(server)
                    .get(`/characters/5db4a28321ebfc0fe0a03256`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then( res => {
                        const characters = JSON.parse(res.text);
                        expect(characters).to.have.length(1);
                        expect(characters[0]._id).to.equal(testCharacter._id.toString());
                        done(err);
                    });
            });
        });
    });
// describe("POST /character", () => {
//     it("should return confirmation message and update datastore", () => {
//         const character = {
//             upvotes: 4,
//             CharacterName: "Gerard",
//             level: 7
//         };
//         return request(server)
//             .post("/characters")
//             .send(character)
//             .expect(200)
//             .expect({ message: "Character Added!" });
//     });



    const testCharacter = new Character({
        _id: "5db4a28321ebfc0fe0a03256",
        upvotes: 4,
        CharacterName: "Gerard",
        level: 7
    });
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







