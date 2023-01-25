import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { IUserService } from "interfaces/user.interface";
import config from "config";

export class AuthMiddleware {
  private secretOrKey: string;
  private jwtFromRequest;
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.secretOrKey = config.jwtSecret;
    this.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    this.userService = userService;
  }

  public authenticate(): any {
    return passport.authenticate("jwt", { session: false });
  }

  public initialize(): any {
    passport.use(
      new JWTStrategy(
        {
          secretOrKey: this.secretOrKey,
          jwtFromRequest: this.jwtFromRequest,
        },
        async (payload: any, done: any) => {
          try {
            const user = await this.userService.getOneById(payload.id);
            if (!user) {
              return done(null, false);
            }
            done(null, user);
          } catch (error) {
            done(error);
          }
        },
      ),
    );
  }
}

export default AuthMiddleware;
