import getStyle from './getStyle'

/**
 * 获取元素相对祖先元素左上角的距离
 * @param ele
 * @param ancestor
 * @returns {{}}
 */
export default (ele, ancestor) => {
  var left = 0
  var top = 0
  while ((ele.offsetParent || getStyle(ele, 'position') === 'fixed') && ele !== ancestor) {
    left += ele.offsetLeft
    top += ele.offsetTop
    if (getStyle(ele, 'position') === 'fixed') {
      break
    }
    ele = ele.offsetParent
  }
  return {
    left: left,
    top: top
  }
}
