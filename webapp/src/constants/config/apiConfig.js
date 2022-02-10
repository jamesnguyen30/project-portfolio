const LOCAL_HOST_IP = 'localhost';
const PORT = '8080';
const LOCAL_HOST = `${LOCAL_HOST_IP}:${PORT}}`;
const HTTP_PROTOCOL = 'http';

const apiConfig = {
  localhost: LOCAL_HOST,
  baseUurl: `${HTTP_PROTOCOL}://${[LOCAL_HOST].join('/')}`,
};

export default apiConfig;
