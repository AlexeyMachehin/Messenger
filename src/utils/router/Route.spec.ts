import { expect } from 'chai';
import { Block } from '../Block';
import { CommonProps } from '../models/props';
import { Router } from './router';
import { ROUTES } from './routes';

describe('Router', () => {
    const router = new Router('.main');

    class Login extends Block<CommonProps> {
        constructor(props: CommonProps) {
            super('div', props);
        }
    }

    class Profile extends Block<CommonProps> {
        constructor(props: CommonProps) {
            super('div', props);
        }
    }

    router
        .use(ROUTES.Login, Login, false)
        .use(ROUTES.Profile, Profile, false)
        .start();

    it('Change route', () => {
        router.go(ROUTES.Login);
        router.go(ROUTES.Profile);
        expect(router.history.length).to.eq(4);
    });

    it('Get chat id from router', () => {
        router.go(ROUTES.ChatById(2104), { chatId: 2104 });
        const params = router.getParams().chatId;
        expect(params).to.eq(2104);
    });

});