import request from "supertest";

import { User } from "../../models/User";
import users from "../__mock__/users";

import app from "../../index";

afterAll(async () => {
    await app.close()
});

beforeEach(async () => {
    await User.remove({});
    await User.create(users[0]);
});

describe("POST /api/v0/check/email",() => {
    it("should return false if email already used to signup", async () => {
        const res = await request(app).post("/api/v0/check/email").send({ email: users[0].email });
        expect(res.status).toBe(200);
        expect(res.body.valid).toBe(false);
    })
});

describe("POST /api/v0/check/username",() => {
    it("should return false if username already used to signup", async () => {
        const res = await request(app).post("/api/v0/check/username").send({ username: users[0].username });
        expect(res.status).toBe(200);
        expect(res.body.valid).toBe(false);
    })
});
