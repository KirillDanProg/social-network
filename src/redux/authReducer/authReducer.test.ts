import {authReducer, initialAuthStateType} from "./authReducer";

let startState: initialAuthStateType
test.skip("user should be authorized", () => {
    startState = {
        id: null,
        login: null,
        email: null
    }
    const data = {
        id: 99,
        login: "Kirill",
        email: "@gmail"
    }
    const action = {
        type: "USER-AUTH" as any,
        payload: {
            id: data.id,
            email: data.email,
            login: data.login,

        }
    }

    const newState = authReducer(startState, action)

    expect(newState.id).toBe(data.id)
    expect(newState.login).toBe(data.login)
    expect(newState.email).toBe(data.email)
})

