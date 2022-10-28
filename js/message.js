/*
 * @Author: Faith
 * @Date: 2022-10-24 18:27
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-24 19:58
 * @Description:
 */

function messageBox(message) {
  const dom = document.createElement('div')
  dom.className = 'message'
  dom.innerHTML = `
      <i>
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path>
        </svg>
      </i>
      <p>${message}</p>`
  dom.style.top = '16px'
  document.body.appendChild(dom)
  // dom.style.opacity = 0
  setTimeout(() => {
    dom.remove()
  }, 3000)
}
