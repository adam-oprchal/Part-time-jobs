import { Strategy as LocalStrategy } from 'passport-local';
import { accountRepository } from './accountRepository';

const incorrectEmailOrPassword = 'Incorrect email or password';

export const passportStrategy = () =>
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done) => {
      const account = await accountRepository.getUserForAuth(email);

      if (account.isErr) {
        return done(null, false, { message: incorrectEmailOrPassword });
      } else if (account.isOk) {
        const isPasswordCorrect = await accountRepository.checkPassword(
          account.value.passwordHash,
          password
        );
        if (!isPasswordCorrect) {
          return done(null, false, { message: incorrectEmailOrPassword });
        }

        return done(null, account.value);
      }
    }
  );
