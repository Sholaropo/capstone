import { Request, Response } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";

describe("isAuthorized middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            params: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should call next() when user has required role", () => {
    mockResponse.locals = {
        uid: "user123",
        role: "admin",
    };

    const middleware = isAuthorized({ hasRole: ["admin", "user"] });

    middleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
});

it("should throw error when user has insufficient role", () => {
    mockResponse.locals = {
        uid: "user123",
        role: "user",
    };

    const middleware = isAuthorized({ hasRole: ["admin"] });

    expect(() =>
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        )
    ).toThrow(AuthorizationError);

    expect(nextFunction).not.toHaveBeenCalled();
});

it("should call next() when same user and allowSameUser is true", () => {
    mockRequest.params = { id: "user123" };
    mockResponse.locals = {
        uid: "user123",
        role: "user",
    };

    const middleware = isAuthorized({
        hasRole: ["admin"],
        allowSameUser: true,
    });

    middleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
});

it("should throw error when role is missing", () => {
    mockResponse.locals = {
        uid: "user123",
    };

    const middleware = isAuthorized({ hasRole: ["admin"] });

    expect(() =>
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        )
    ).toThrow(AuthorizationError);

    expect(nextFunction).not.toHaveBeenCalled();
});
});