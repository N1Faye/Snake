
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'
//游戏控制器
class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    //蛇移动方向
    direction: string = ''
    lastKey: string = ''
    speed: number = 1
    //加速定时器
    timer: NodeJS.Timer | null = null
    //游戏是否结束
    isLive: boolean = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    //初始化游戏
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this)) //bind 绑定this
        this.run()
        document.addEventListener('keyup', this.keyupHandler.bind(this)) //bind 绑定this


    }
    //按下键盘响应函数
    keydownHandler(event: KeyboardEvent) {
        event.preventDefault()
        this.direction = event.key
        if (this.lastKey === event.key) {
            this.speed = 10
        }
        this.lastKey = event.key
    }
    //松开键盘响应
    keyupHandler(event: KeyboardEvent) {
        this.speed = 1
        this.lastKey = ''

    }

    //蛇移动
    run() {
        //计算坐标
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.direction) {
            case 'ArrowUp':
                Y -= 10
                break
            case 'ArrowDown':
                Y += 10
                break
            case 'ArrowLeft':
                X -= 10
                break
            case 'ArrowRight':
                X += 10
                break
        }
        this.checkEat(X, Y)
        //修改坐标
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error: any) {
            alert(error.message)
            this.isLive = false
            this.direction = ''
            this.snake.clearBody()

        }

        //开启定时器
        setTimeout(
            this.run.bind(this)
            ,
            530 - (this.scorePanel.level) * 30 * this.speed)
    }
    //判断是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}

export default GameControl