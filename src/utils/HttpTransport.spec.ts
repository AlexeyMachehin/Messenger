import { ChatDto } from './dto/chat';
import { HTTPTransport } from './HttpTransport';

const httpTransport = new HTTPTransport();

describe('HTTPTransport', () => {
    it('Sign in', (done) => {
        httpTransport
            .post(`auth/signin`, {
                data: JSON.stringify({ login: 'Lehazzz', password: 'Qwerty123' }),
            })
            .then(() => {
                done();
            })
            .catch(error => {
                done(new Error(error.message));
            });
    });

    it('Get chat', (done) => {
        httpTransport
            .get<ChatDto>(`/chats`, { data: { title: 'Test' } })
            .then(() => {
                done();
            })
            .catch(error => {
                done(new Error(error.message));
            });
    });
});
