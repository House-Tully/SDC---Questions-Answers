import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',

  // stages: [
    //   { duration: '50s', target: 100 }, // below normal load
    //   { duration: '50s', target: 200 }, // normal load
    //   { duration: '50s', target: 300 }, // around the breaking point
    //   { duration: '50s', target: 400 }, // beyond the breaking point
    //   { duration: '30s', target: 0 }, // scale down. Recovery stage.
    // ]
  };

  export default function () {
    let res = http.get('http://localhost:3000/qa/questions/30/answers');
    check(res, { 'is status 200': (r) => r.status === 200 });
  }
