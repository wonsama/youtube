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
  const match = {
    list: "./src/playlists",
    items: "./src/playlistItems",
    search: "./src/search",
  };

  if (params.length >= 1) {
    // import 이후 수행할 작업 지정
    let target = params[0];
    if (Object.keys(match).includes(target)) {
      const { search } = require(match[target]);
      await search();
      isError = false;
    }
  }

  // 경고 문구 출력
  if (isError) {
    console.error(
      `only available ::: $ node app [${Object.keys(match).join(", ")}]`
    );
  }
}
init();
