'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('gacha');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) { // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

window.onload = () =>　{
  const title = document.getElementById('title');
  const now = new Date();
  const hour = now.getHours();
  if (hour < 10) {
    title.innerText = "あさごはんガチャ";
    document.body.style.background = '#99FFFF';
  } else if(hour < 15) {
    title.innerText = "ひるごはんガチャ";
    document.body.style.background = '#FFCC99';
  } else {
    title.innerText = "ゆうはんガチャ";
    document.body.style.background = '#003366';
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) { // 名前が空の時は処理を終了する
    return;
  }

  const result = gacha(userName);

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  
  // レアリティ
  const header = document.createElement('h1');
  header.innerText = result.rarity;
  resultDivided.appendChild(header);

  // 本文
  const paragraph = document.createElement('p');
  paragraph.innerText = result.text;
  resultDivided.appendChild(paragraph);

  // 画像
  const image = document.createElement('img');
  image.setAttribute('src', "img/" + result.img);
  resultDivided.appendChild(image);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('今日何食べようガチャ')
    + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #今日何食べる';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const results = [
  { rarity: "🍀SSR🍀", text: "今日は絶好調！お寿司を食べましょう！", img: "sushi.jpeg" },
  { rarity: "✨SR✨", text: "今日はツイてる！しゃぶしゃぶを食べましょう！", img: "shabu.jpeg" },
  { rarity: "✨SR✨", text: "今日はツイてる！焼き肉を食べましょう！", img: "yakiniku.jpeg" },
  { rarity: "✨SR✨", text: "今日はツイてる！うな丼を食べましょう！", img: "unadon.jpeg" },
  { rarity: "☀️R☀️", text: "今日はちょっとラッキー。ラーメンを食べましょう。", img: "ramen.jpeg" },
  { rarity: "☀️R☀️", text: "今日はちょっとラッキー。定食屋に行きましょう。", img: "teishoku.jpeg" },
  { rarity: "☀️R☀️", text: "今日はちょっとラッキー。カレー屋さんに行きましょう。", img: "curry.jpeg" },
  { rarity: "☀️R☀️", text: "今日はちょっとラッキー。中華料理屋に行きましょう。", img: "china.jpeg" },
  { rarity: "☀️R☀️", text: "今日はちょっとラッキー。パスタ屋さんに行きましょう。", img: "pasta.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニでおにぎりを買いましょう。", img: "combini_onigiri.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニでカレーを買いましょう。", img: "combini_curry.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニでカップ麺を買いましょう。", img: "combini_cupnudle.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニでサラダを買いましょう。", img: "combini_salad.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニで丼ものを買いましょう。", img: "combini_don.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニでお弁当を買いましょう。", img: "combini_bento.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニで麺類を買いましょう。", img: "combini_men.jpeg" },
  { rarity: "🌱NR🌱", text: "今日は普通の日。コンビニでパンを買いましょう。", img: "combini_pan.png" },
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function gacha(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  const now = new Date();
  let sumOfCharCode = now.getDay() + now.getHours();
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % results.length;
  return results[index];;
}

// テストコード
console.assert(
  gacha('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  gacha('太郎') === gacha('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);