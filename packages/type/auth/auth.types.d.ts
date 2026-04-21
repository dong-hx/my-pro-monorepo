export type AuthRole = 'admin' | 'editor' | 'viewer';
export interface JwtPayload {
    sub: string;
    email: string;
    name: string;
    role: AuthRole;
}
export interface AuthUserView {
    id: string;
    email: string;
    name: string;
    role: AuthRole;
}
export interface LoginResponse {
    accessToken: string;
    tokenType: 'Bearer';
    expiresIn: number;
    user: AuthUserView;
}
//# sourceMappingURL=auth.types.d.ts.map