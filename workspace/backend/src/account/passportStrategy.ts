import { Strategy as LocalStrategy } from "passport-local";
import { accountRepository } from "./accountRepository";
import assert from "assert";

export const passportStrategy = () =>
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            const account = await accountRepository.getUserForAuth(email);

            if (account.isErr) {
                return done(account.error);
            } else if (account.isOk) {
                const isPasswordCorrect = await accountRepository.checkPassword(account.value.passwordHash, password);
                if (!isPasswordCorrect) {
                    return done(null, false, { message: "Incorrect email or password" });
                }
            
                return done(null, account.value);
            }
        }
    )
