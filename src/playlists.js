let cm = require("./util/common");
const fs = require("fs");

/**
 * 플레이 리스트 목록을 조회한다
 * @param {string} filePath 결과 파일 저장 위치
 */
async function search(filePath = "./output/list.txt") {
  let res = await cm.find(cm.YT_PLAYLISTS, cm.params);
  res.sort((a, b) => a.snippet.title.localeCompare(b.snippet.title));

  let buf = [];
  buf.push(`|id|title|publishedAt|`);
  buf.push(`|-|-|-|`);
  for (let r of res) {
    let publishedAt = r.snippet.publishedAt;
    let title = r.snippet.title;
    let id = r.id;
    buf.push(`|${id}|${title}|${publishedAt}|`);
  }
  fs.writeFileSync(filePath, buf.join("\n"), "utf-8");
}
module.exports = { search };
