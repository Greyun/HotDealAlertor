const slack = require('./slack/index');
const crawl = require('./crawl/index');
const sync = require('./sync/index');
const parser = require('./util/dom-parser');
const log = require('./util/logger');
const __sync = './sync/';


log.debug('Alertor started');
// 1. 수집 리스트 가져옴
const hosts = crawl.getHosts();

hosts.forEach((host) => {
  log.debug(`let's get it ${host} data!`);
  // 2. 수집 페이지 last_url 가져옴
  sync.get(__sync+host, function(err, data) {
    if (err) log.error(err);
    let last_url = data;

    // 3. 수집
    let req = crawl.req(host, function(html) {
      let root = parser.parse(html);
      let el = root.querySelectorAll(crawl.getRule(host));
      var list = [];

      // 공지 제거 동적 반영 필요
      var hasNotice = host === 'bbs.ruliweb.com';
      for (var i = hasNotice ? 3 : 0; i < el.length; i++) {
        var href = el[i].attributes.href;
        var text = el[i].rawText.trim();
        if(href === last_url) break;
        list.push({href, text});
      }

      // 신규 포스트가 있는 경우
      if(list.length > 0) {
        for (var i = list.length - 1; i >= 0 ; i--) {
          log.debug(list[i].text, list[i].href);
        }
        hasUpdatedList(host, list);
        sync.set(__sync+host, list[0].href, function(err) {
          if (err) log.error(err);
          log.debug(`${list[0].href} is last content url`);
        })
      } else {
        log.debug('list not updated');
      }
      log.debug('Alertor finished');
    });
  });
});

var hasUpdatedList = function(host, list) {
  list.forEach((v, i) => {
    var message = `New post on ${host}\n${v.text}\n${v.href}`;
    slack.send(message);
  });
}
