// process.argv
// 0 : node
// 1 : app
// 2 : param ...
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const params = process.argv.slice(2);

/**
 * 진입점
 *
 * list : playlist 목록 출력 - CHANNEL_ID 값을 기준으로 조회
 * items :  playlist 내 목록 출력 - PLAY_LIST_ID 값을 기준으로 조회
 */
async function init() {
  let isError = true;
  if (params.length >= 1) {
    if (params[0] == "list") {
      const { search } = require("./src/playlists");
      await search();
      isError = false;
    } else if (params[0] == "items") {
      const { search } = require("./src/playlistItems");
      await search();
      isError = false;
    }
  }

  // 경고 문구 출력
  if (isError) {
    console.error(
      "only available ::: $ node app list ... or ... $ node app items"
    );
  }
}
init();
