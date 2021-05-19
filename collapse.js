class Collapse extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' });
        const tmpl = document.getElementById('collapse_tmpl')

        let cloneTemplate = tmpl.content.cloneNode(true)
        let style = document.createElement('style')
        // :host代表影子的根元素
        style.textContent = `
            :host{ 
                display:flex;
                border: 3px solid #ebebeb;
                border-radius:5px;
                width:100%;
            }
            .x-collapse{
                width:100%;
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(cloneTemplate)
        let slot = shadow.querySelector('slot')   //监控slot变化 
        slot.addEventListener('slotchange', (e) => {
            this.slotList = e.target.assignedElements()
            this.render()
        })
    }
    static get observedAttributes() { //监控属性的变化
        return ['active']
    }
    // connectedCallback() {
    //     console.log('插入到dom时执行的回调');
    // }
    // disconnectedCallback() {
    //     console.log('移出时执行的回调');
    // }
    // adoptedCallback() {
    //     console.log('组件移动到iframe中执行');
    // }
    attributeChangedCallback(key, oldVal, newVal) {
        if (key == 'active') {
            this.activeList = JSON.parse(newVal)
            this.render()
        }   
        console.log('属性变化时执行');
    }
    render(){
        if (this.slotList && this.activeList) {
            Array.from(this.slotList).forEach(child => {
                child.setAttribute('active', JSON.stringify(this.activeList))
            })
        }
    }
}
export default Collapse