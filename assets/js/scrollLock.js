/**
 * 画面スクロールを抑制するクラス
 */
export class ScrollLock {
  constructor(document) {
    this.scrollTop = 0;
    this.isLocked = false;
    this.scrollingElement =
      document.scrollingElement || document.documentElement || document.body;
  }

  /**
   * @return {boolean} スクロールロック成否
   */
  lock() {
    // iOSsafariに対して背景のscrollを防止するためのworkaround
    // @see http://qiita.com/gonshi_com/items/5a86fc415dcccfb04e2a
    const html = document.documentElement;
    const { body } = document;

    // 多重ロック防止
    if (body.style.position === 'fixed' || this.isLocked) {
      return false;
    }

    // スクロール量取得
    this.scrollTop = this.scrollingElement.scrollTop;

    html.style.overflow = 'hidden';
    html.style.width = '100%';
    html.style.top = `${-this.scrollTop}px`;
    body.style.overflow = 'hidden';
    body.style.width = '100%';
    body.style.top = `${-this.scrollTop}px`;
    body.style.position = 'fixed';

    // 描画が省略され背景が真っ白になる問題を解消するため
    html.style.height = '10000%';
    body.style.height = '10000%';

    this.isLocked = true;
    return true;
  }

  /**
   * @return {boolean} スクロールアンロック成否
   */
  unlock() {
    if (!this.isLocked) {
      return false;
    }

    const html = document.documentElement;
    const { body } = document;

    html.style.width = '';
    html.style.overflow = '';
    html.style.top = '';
    body.style.width = '';
    body.style.overflow = '';
    body.style.top = '';
    body.style.position = '';

    // fixedを解除すると座標が0に戻るので戻す
    window.scrollTo(0, this.scrollTop);

    html.style.height = '';
    body.style.height = '';

    this.isLocked = false;
    return true;
  }
}

/**
 * ファクトリー関数
 * グローバルに document オブジェクトが無い環境 (Node.js) で暗黙的にインスタンスを生成するとエラーになるので、ファクトリー関数を挟む
 * @return スクロール抑制クラスインスタンス
 */
export function createScrollLock(document) {
  return new ScrollLock(document);
}
