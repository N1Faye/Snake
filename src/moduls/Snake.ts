//蛇
class Snake {
    //蛇
    element: HTMLElement
    //蛇头 snake第一个div
    head: HTMLElement
    //蛇身 HTMLCollection 实时更新
    bodies: HTMLCollection

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div')!
        this.bodies = this.element.getElementsByTagName('div')
    }
    //获取蛇头位置
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    //设置蛇头坐标
    /**
     * 0 水平
     * 1 垂直
     */
    set X(value: number) {
        this.checkXY(0, this.X, value)
    }
    set Y(value: number) {
        this.checkXY(1, this.Y, value)
    }
    //验证坐标
    checkXY(type: number, XorY: number, value: number) {
        if (XorY === value) {
            return
        }
        //验证是否撞墙
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了，Game Over！')
        }
        if (this.bodies[1] && ((type === 0 && (this.bodies[1] as HTMLElement).offsetLeft === value) || (type === 1 && (this.bodies[1] as HTMLElement).offsetTop === value))) {
            if (value > XorY) {
                value = XorY - 10
            } else {
                value = XorY + 10
            }
        }
        this.moveBody()
        //水平
        if (type === 0) {
            this.head.style.left = value + 'px'

        }
        //垂直
        else if (type === 1) {
            this.head.style.top = value + 'px'
        }
        this.checkHeadBody()
    }
    //增加蛇身
    addBody() {
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }
    //清除蛇身
    clearBody() {
        this.X = 0
        this.Y = 0
        // this.element.removeChild()
        for (let i = this.bodies.length - 1; i >= 1; i--) {
            this.element.removeChild(this.element.lastChild!)
        }
    }


    //蛇身移动
    moveBody() {
        //从后往前改 
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    //判断是否自撞
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            //判断蛇身种是否有坐标和蛇头一致的
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞到自己，Game Over！')

            }
        }
    }
}
export default Snake
