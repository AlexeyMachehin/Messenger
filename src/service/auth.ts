import HTTPTransport from "../utils//httpTransport";
class Authorization extends HTTPTransport {

    signIn(login: string, password: string) {
        this.post("auth/signin", {
            data: {
                login,
                password
            }
        }).then((res) => console.log(res));
    }
}

export const authorization = new Authorization();