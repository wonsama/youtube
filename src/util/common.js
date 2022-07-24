// see more
// https://developers.google.com/youtube/v3/docs/playlists
// https://developers.google.com/youtube/v3/docs/playlistItems

require("dotenv").config();
const axios = require("axios").default;

/**
 * PLAYLISTS API URI
 */
const YT_PLAYLISTS = `https://www.googleapis.com/youtube/v3/playlists`;

/**
 * PLAYLISTITEMS API URI
 */
const YT_PLAYLISTITEMS = `https://www.googleapis.com/youtube/v3/playlistItems`;

/**
 * YouTube Data API v3 호출 시 사용되는 기본 파라미터
 */
let params = {
  // YouTube Data API v3 키
  // https://console.cloud.google.com/apis/api/youtube.googleapis.com/
  // 위 링크를 통해 발급 받을 수 있음
  key: process.env.API_KEY,

  // 필수
  // playlists : id or snippet or status
  // playlistItems : id or snippet or status or contentDetails
  part: "snippet",

  // 필터 : channelId
  // use in playlists only
  channelId: process.env.CHANNEL_ID,

  // 필터 : playlistId
  // use in playlistItems only
  playlistId: process.env.PLAY_LIST_ID,

  // 선택적 매개변수
  maxResults: 50, // 최대 50, 기본 5
};

function validate() {
  // 파라미터 로딩 체크
  const checkItems = ["key", "channelId", "playlistId"];
  let cause = [];
  for (let r of checkItems) {
    if (!params[r]) {
      cause.push(`check .env key-value ::: key - [${r}] 's value is empty.`);
    }
  }
  return cause.join("\n");
}

/**
 * 입력 받은 값을 쿼리 스트링으로 변환 해주도록 한다
 * @param {KeyValue} source KeyValue 형태의 데이터
 */
const getQuery = (source) => {
  let items = [];
  for (let o of Object.keys(source)) {
    items.push(`${o}=${source[o]}`);
  }
  return items.join(`&`);
};

/**
 * 입력받은 URL 정보 기준 데이터를 생성한다
 * @param {string} url 호출 주소
 * @param {object} params 파라미터
 * @param {string} pageToken 페이지 토큰, 다음 페이지 호출이 가능한 경우에만 값이 존재
 * @param {Array} results 결과, 배열
 */
async function find(url, params, pageToken, results = []) {
  let cause = validate();
  if (cause) {
    throw new Error(cause);
  }
  if (pageToken) {
    params.pageToken = pageToken;
  }
  let res = await axios.get(`${url}/?${getQuery(params)}`);
  results.push(...res.data.items);
  if (res.data.nextPageToken) {
    return await find(url, params, res.data.nextPageToken, results);
  }
  return results;
}

module.exports = {
  YT_PLAYLISTS,
  YT_PLAYLISTITEMS,
  params,
  getQuery,
  find,
};
