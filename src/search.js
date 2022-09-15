let cm = require("./util/common");
const fs = require("fs");

/**
 * 플레이 리스트 목록을 조회한다
 * @param {string} filePath 결과 파일 저장 위치
 */
async function search(filePath = "./output/search.txt") {
  let res = await cm.find(cm.YT_SEARCH, cm.paramSearch);
  // console.log(res);
  //   res.sort((a, b) => a.snippet.title.localeCompare(b.snippet.title));

  let buf = [];
  buf.push(`|videoId|title|publishedAt|`);
  buf.push(`|-|-|-|`);
  for (let r of res) {
    let videoId = r.id.videoId;
    if (r.snippet) {
      // r.snippet 이 없는 경우도 존재
      let title = r.snippet.title;
      let publishedAt = r.snippet.publishedAt;
      buf.push(`|${videoId}|${title}|${publishedAt}|`);
    }
  }
  fs.writeFileSync(filePath, buf.join("\n"), "utf-8");
}
module.exports = { search };
