export class User {

    constructor(
            public userName?: string,
            public userEmail?: string,
            public id?: number,
            private _token?: string,
            private _expirationData?: Date

            ){}


            get token(): string | null | undefined {
                if (!this._expirationData || new Date() > this._expirationData) {
                    return null;
                }
                return this._token;
            }
            set token(token: string) {
                this._token = token;
            }
        }