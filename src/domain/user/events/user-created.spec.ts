import UserCreated from "./user-created";

describe('UserCreated', () => {

    it('should be of type UserCreated', () => {
        const userCreated = new UserCreated('1', 'username', 'password');

        expect(userCreated.type).toBe(UserCreated.TYPE)

    });
    it('should be have same payload', () => {
        const userCreated = new UserCreated('1', 'username', 'password');

        expect(userCreated.payload.userId).toBe('1');
        expect(userCreated.payload.username).toBe('username');
        expect(userCreated.payload.password).toBe('password')

    })

});