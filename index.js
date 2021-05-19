import Collapse from "./collapse.js";
import CollapseItem from "./collapse-item.js";


window.customElements.define('x-collapse', Collapse)
window.customElements.define('x-collapse-item', CollapseItem)


// 谁知组件的默认展开

let defaultActive = ['1', '2']

document.querySelector('x-collapse').setAttribute('active',JSON.stringify(defaultActive))

// 每个item需要获取到defaultActive 和自己的name属性比较，如果在里面显示，不在就隐藏
document.querySelector('x-collapse').addEventListener('changeName',(e) => {
    let { isShow, name } = e.detail;
    if (isShow) {
      let index =  defaultActive.indexOf(name)
      defaultActive.splice(index,1)
    }else{
        defaultActive.push(name)
    }
    document.querySelector('x-collapse').setAttribute('active',JSON.stringify(defaultActive))
})