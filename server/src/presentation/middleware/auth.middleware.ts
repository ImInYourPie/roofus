import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import config from "config";
import { IAdminService } from "interfaces/admin.interface";

export class AuthMiddleware {
  private secretOrKey: string;
  private jwtFromRequest;
  private adminService: IAdminService;

  constructor(adminService: IAdminService) {
    this.secretOrKey = config.jwtSecret;
    this.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    this.adminService = adminService;
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
            const user = await this.adminService.getOneById(payload.id);
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
