const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")

let db, validID

let Weapon = require("../../../models/weapons")

//
describe("Weapons", () => {
    beforeEach(async () => {
        await Weapon.deleteMany({})
        // datastore.push({
        //     _id: "5db4a28321ebfc0fe0a03256",
        //     upvotes: 4,
        //     CharacterName: "Gerard",
        //     level: 7
        //
        // });
        await Weapon.create(testWeapon)
    // datastore.push({
    //     _id: "5dbfff991c9d4400000d7da7",
    //     upvotes: 2,
    //     CharacterName: "GerardTwo",
    //     level: 49
    // });
    })

    describe("GET /weapons", () => {
        it("should return all the weapons", async () => {
            await request(server)
                .get("/weapons")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .then(res => {
                    const weapons = JSON.parse(res.text)
                    expect(weapons).to.have.length(1)
                    expect(weapons[0]._id).to.equal(testWeapon._id.toString())
                    expect(weapons[0].WeaponName).to.equal(testWeapon.WeaponName)
                })
        })
    })

    describe("GET /weapon/:id", () => {
        describe("when the id is valid", () => {
            it("should return the matching weapons", async () => {
                request(server)
                    .get("/weapons/5db4a28321ebfc0fe0a03256")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then( res => {
                        const weapons = JSON.parse(res.text)
                        expect(weapons).to.have.length(1)
                        expect(weapons[0]._id).to.equal(testWeapon._id.toString())
                        done(err)
                    })
            })
        })
    })
    // describe("POST /weapon", () => {
    //     it("should return confirmation message and update testWeapon", () => {
    //         const weapon = {
    //             WeaponName: "ice sword",
    //             PowerBonus: 12,
    //             Design: "a cool ice sword"
    //         };
    //         return request(server)
    //             .post("/weapons")
    //             .send(weapon)
    //             .expect(200)
    //             .then(result => {
    //                 expect(result.body.message).to.equal('Weapon Successfully Added!');
    //             })
    //     });
    // });

    const testWeapon = new Weapon({
        _id: "5db49f7a21ebfc0fe0a03251",
        WeaponName: "ice sword",
        PowerBonus: 12,
        Design: "a cool sword"
    })
})

