//记分牌
class ScorePanel {
    score = 0
    level = 1
    scoreEle: HTMLElement
    levelEle: HTMLElement
    //最大等级 默认10
    maxLevel: number
    //升级分数间隔 默认10
    upScore: number
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    //加分
    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        if (this.score % this.upScore === 0) {
            console.log(2344);

            this.levelUp()
        }
    }
    //等级提升
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

export default ScorePanel