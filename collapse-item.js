class CollapseItem extends HTMLElement{
    constructor(){
        super()
        const shadow =this.attachShadow({mode:'open'});
        const tmpl = document.getElementById('collapse_item_tmpl')
        
        let cloneTemplate = tmpl.content.cloneNode(true)
        let style = document.createElement('style')
       this.isShow = true
       
        // :host代表影子的根元素
        style.textContent = `
            :host{
                width:100%;
            }
            .title{ 
                background:#f1f1f1;
                line-height:35px;
                height:35px;
            }
            .content{
                font-size:14px;
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(cloneTemplate)

        this.titleEle = shadow.querySelector('.title')
        this.titleEle.addEventListener('click', () => {
            // 如何将结果 传递给父亲 组件通信
            document.querySelector('x-collapse').dispatchEvent(new CustomEvent('changeName',{
                detail:{
                    name:this.getAttribute('name'),
                    isShow:this.isShow
                }
            }))
        })
    }
    static get observedAttributes() { //监控属性的变化
        return ['active', 'title', 'name']
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
        switch (key) {
            case 'active':
                this.activeList = JSON.parse(newVal)
                break;
            case 'title':
                this.titleEle.innerHTML = newVal
                break;
            case 'name':
                this.name = newVal
                break;
            default:
                break;
        }   

        let name = this.name
        if (this.activeList && name) {
            this.isShow = this.activeList.includes(name)
             this.shadowRoot.querySelector('.content').style.display = this.isShow?'block':'none'
         }
        console.log('属性变化时执行');

        
    }
}
export default CollapseItem