import { Request, Response } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";

jest.mock("../config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should throw error when no token is provided", async () => {
    await expect(
        authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        )
    ).rejects.toThrow(AuthenticationError);

    expect(nextFunction).not.toHaveBeenCalled();
});

it("should throw error when token verification fails", async () => {
    mockRequest.headers = {
        authorization: "Bearer invalid-token",
    };

    (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(
        new Error("Invalid token")
    );

    await expect(
        authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        )
    ).rejects.toThrow(AuthenticationError);

    expect(nextFunction).not.toHaveBeenCalled();
});

it("should call next() when token is valid", async () => {
    mockRequest.headers = {
        authorization: "Bearer valid-token",
    };

    (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
        uid: "test-uid",
        role: "admin",
    });

    await authenticate(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
    );

    expect(auth.verifyIdToken).toHaveBeenCalledWith("valid-token");
    expect(mockResponse.locals).toEqual({
        uid: "test-uid",
        role: "admin",
    });
    expect(nextFunction).toHaveBeenCalled();
});
});