let cm = require("./util/common");
const fs = require("fs");

/**
 * 플레이 리스트 목록 영상 목록을 조회한다
 * 재생목록은 최대 200개의 동영상을 포함
 * @param {string} filePath 결과 파일 저장 위치
 */
async function search(filePath = "./output/items.txt") {
  let res = await cm.find(cm.YT_PLAYLISTITEMS, cm.paramPlaylistItems);
  res.sort((a, b) => a.snippet.position - b.snippet.position);
  let buf = [];
  for (let r of res) {
    let title = r.snippet.title;
    let publishedAt = r.snippet.publishedAt;
    let videoId = r.snippet.resourceId.videoId;
    let playlistId = r.snippet.playlistId;
    let url = `https://youtube.com/watch?v=${videoId}&list=${playlistId}`;
    buf.push(`[${title}](${url}) - ${publishedAt}`);
  }
  fs.writeFileSync(filePath, buf.join("\n"), "utf-8");
}

module.exports = { search };
