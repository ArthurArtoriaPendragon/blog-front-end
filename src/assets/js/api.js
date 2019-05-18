const host = 'http://localhost:3000';
const version = '/v1';
const root = `${host}/api${version}`;

const api = {
  blog: {
    create: `${root}/article/create`,
    list: `${root}/article/list`,
    delete: `${root}/article/delete`,
    detail: `${root}/article`,
    update: `${root}/article/update`
  },
  user: {
    login: `${root}/user/login`,
    register: `${root}/user/register`
  }
};

export default api;
