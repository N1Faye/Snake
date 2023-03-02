//食物
class Food {
    element: HTMLElement
    constructor() {
        this.element = document.getElementById('food')!
    }
    //获取食物位置
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
    //随机生成食物位置
    change() {
        //食物位置 [0,290] 数值为10的整数
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}
export default Food