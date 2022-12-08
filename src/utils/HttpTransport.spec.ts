import { HTTPTransport } from "./HttpTransport";

const httpTransport = new HTTPTransport()

describe('HTTPTransport', () => {
  it('Get', (done) => {
    httpTransport
      .get<Record<string, string>>(
        'https://jsonplaceholder.typicode.com/comments',
        { data: { chatId: 1 } }
      )
      .then(() => {
        // const [{ postId }] = JSON.parse(response) || [];
        // if (postId === 1) {
        //   done();
        // } else {
        //   done(new Error('Ожидался массив объектов с ключом postId и значением 1'));
        // }
      })
      .catch(done);
  });

  // it('Post', (done) => {
  //   httpTransport
  //     .post('https://jsonplaceholder.typicode.com/posts', {
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //       data: JSON.stringify({
  //         title: 'foo',
  //         body: 'bar',
  //         userId: 1,
  //       }),
  //     })
  //     .then(({ response }) => {
  //       const { title } = JSON.parse(response) || {};
  //       if (title === 'foo') {
  //         done();
  //       } else {
  //         done(new Error('Ожидался объект с ключом title и значением \'foo\''));
  //       }
  //     })
  //     .catch(done);
  // });
});
