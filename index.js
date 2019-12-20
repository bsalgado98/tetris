
var currentTetromino, currentTetrominos;
var unitDimension = 40;
var gameArea;
var unoccupiedCellColor = 100;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(200);
    gameArea = new GameArea()
    var tetrominos = [
        new I(4, 1, '#fcba03'),
        new O(4, 1, '#fc0f03'),
        new T(4, 1, '#f0fc03'),
        new S(4, 1, '#03fc20'),
        new Z(4, 1, '#03fceb'),
        new L(4, 1, '#0303fc'),
        new J(4, 1, '#8403fc')
    ];
    currentTetrominos = [];
    currentTetrominos.push(tetrominos[Math.floor(Math.random()*tetrominos.length)]);
    currentTetromino = currentTetrominos[currentTetrominos.length - 1];
    setInterval(
        (function(self) {
            return function() {
                if(!self.currentTetromino.moveDown()) {
                    console.log('timeout function')
                    currentTetrominos.push(tetrominos[Math.floor(Math.random()*tetrominos.length)]);
                    currentTetromino = currentTetrominos[currentTetrominos.length - 1];
                }
            }
        })(this)
        , 500)
}

function draw() {
    background(200);
    fill(100);

    gameArea.display();

    currentTetrominos.map((tetromino) => {
        tetromino.display();
    })
}

function keyPressed() {
    switch(key) {
        case 'a':
            currentTetromino.moveLeft();
            break;
        case 'd':
            currentTetromino.moveRight();
            break;
        case 's':
            currentTetromino.moveDown();
            break;
        case 'z':
            currentTetromino.rotate();
            break;
    }
}

class Tetromino {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.willCollideBottom = false;
        this.units = {};
    }
    unitIsInTetromino(x, y) {
        for(var unit of Object.values(this.units)) {
            if(x == unit.x && y == unit.y) {
                return true;
            }
        }
        return false;
    }
    moveLeft() {
        this.willCollideSide = false;
        for(var unit of Object.values(this.units)) {
            if(gameArea.cellIsOccupied(unit.x - 1, unit.y)) {
                this.willCollideSide = true;
                return false;
            }
        }
        if(!this.willCollideSide) {
            for(var unit of Object.values(this.units)) {
                gameArea.deoccupyCell(unit.x, unit.y);
                unit.x--;
            }
        }
        return true;
    }
    moveRight() {
        this.willCollideSide = false;
        for(var unit of Object.values(this.units)) {
            if(gameArea.cellIsOccupied(unit.x + 1, unit.y)) {
                this.willCollideSide = true;
                return false;
            }
        }
        if(!this.willCollideSide) {
            for(var unit of Object.values(this.units)) {
                gameArea.deoccupyCell(unit.x, unit.y);
                unit.x++;
            }
        }
        return true;
    }
    moveDown() {
        for(var unit of Object.values(this.units)) {
            if(gameArea.cellIsOccupied(unit.x, unit.y + 1)) {
                console.log('down false')
                this.willCollideBottom = true;
                return false;
            }
        }
        if(!this.willCollideBottom) {
            for(var unit of Object.values(this.units)) {
                gameArea.deoccupyCell(unit.x, unit.y);
                unit.y++;
            }
        }
        return true;
    }
    display() {
        for(var unit of Object.values(this.units)) {
            gameArea.occupyCell(unit.x, unit.y, this.color);
        }
    }
}

class L extends Tetromino{
    constructor(x, y, color) {
        super(x, y, color);
        this.units = {
            unit1: {
                x: this.x,
                y: this.y
            },
            unit2: {
                x: this.x,
                y: this.y - 1
            },
            unit3: {
                x: this.x + 1,
                y: this.y - 1
            },
            unit4: {
                x: this.x + 2,
                y: this.y -1
            }
        };
    }
}

class O extends Tetromino{
    constructor(x, y, color) {
        super(x, y, color);
        this.units = {
            unit1: {
                x: this.x,
                y: this.y
            },
            unit2: {
                x: this.x + 1,
                y: this.y
            },
            unit3: {
                x: this.x + 1,
                y: this.y + 1
            },
            unit4: {
                x: this.x,
                y: this.y + 1
            }
        }
    }
}

class S extends Tetromino{
    constructor(x, y, color) {
        super(x, y, color);
        this.units = {
            unit1: {
                x: this.x,
                y: this.y
            },
            unit2: {
                x: this.x + 1,
                y: this.y
            },
            unit3: {
                x: this.x + 1,
                y: this.y - 1
            },
            unit4: {
                x: this.x + 2,
                y: this.y - 1
            }
        }
    }
}

class J extends Tetromino{
    constructor(x, y, color) {
        super(x, y, color);
        this.units = {
            unit1: {
                x: this.x,
                y: this.y
            },
            unit2: {
                x: this.x + 1,
                y: this.y
            },
            unit3: {
                x: this.x + 2,
                y: this.y
            },
            unit4: {
                x: this.x + 2,
                y: this.y - 1
            }
        }
    }
}

class T extends Tetromino{
    constructor(x, y, color) {
        super(x, y, color);
        this.units = {
            unit1: {
                x: this.x,
                y: this.y
            },
            unit2: {
                x: this.x + 1,
                y: this.y
            },
            unit3: {
                x: this.x + 2,
                y: this.y
            },
            unit4: {
                x: this.x + 1,
                y: this.y - 1
            }
        };
    }
}

class I extends Tetromino{
    constructor(x, y, color) {
        super(x, y, color);
        this.units = {
            unit1: {
                x: this.x,
                y: this.y
            },
            unit2: {
                x: this.x + 1,
                y: this.y
            },
            unit3: {
                x: this.x + 2,
                y: this.y
            },
            unit4: {
                x: this.x + 3,
                y: this.y
            }
        };
    }
}

class Z extends Tetromino{
    constructor(x, y, color) {
        super(x, y, color);
        this.units = {
            unit1: {
                x: this.x,
                y: this.y
            },
            unit2: {
                x: this.x + 1,
                y: this.y
            },
            unit3: {
                x: this.x + 1,
                y: this.y + 1
            },
            unit4: {
                x: this.x + 2,
                y: this.y + 1
            }
        };
    }
    rotate() {
        for(unit of this.units) {
            gameArea.deoccupyCell(unit.x, unit.y);
        }
    }
}

class Cell {
    constructor(x, y, i, j) {
        this.x = x;
        this.y = y;
        this.i = i;
        this.j = j
        this.color = unoccupiedCellColor;
    }
    occupyCell(color) {
        this.color = color;
    }
    deoccupyCell() {
        this.color = unoccupiedCellColor;
    }
    cellIsOccupied() {
        let occupied = true;
        if(currentTetromino.unitIsInTetromino(this.i, this.j)) {
            occupied = false;
        }
        else if(this.color == unoccupiedCellColor) {
            occupied = false;
        }
        else {
            occupied = true;
        }
        return occupied;
    }
    display() {
        strokeWeight(4);
        fill(this.color);
        rect(this.x, this.y, unitDimension, unitDimension)
    }
}

class GameArea {
    constructor() {
        this.gameAreaX = window.innerWidth/2;
        this.gameAreaY = window.innerHeight/2-200;
        this.gameAreaW = unitDimension*10;
        this.gameAreaH = unitDimension*16;
        this.cells = [];
        for(let i = 0; i < 10; i++) {
            this.cells.push(new Array());
            for(let j = 0; j < 16; j++) {
                this.cells[i].push(new Cell(this.gameAreaX + (i*unitDimension), this.gameAreaY + (j*unitDimension), i, j));
            }
        }
    }
    occupyCell(x, y, color) {
        this.cells[x][y].occupyCell(color);
    }
    deoccupyCell(x, y) {
        this.cells[x][y].deoccupyCell();
    }
    cellIsOccupied(x, y) {
        if(x >= 10 || x < 0 || y >= 16 || y < 0) {
            return true;
        }
        return this.cells[x][y].cellIsOccupied();
    }
    display() {
        rect(this.gameAreaX, this.gameAreaY, this.gameAreaW, this.gameAreaH);
        for(let i = 0; i < 10; i++) {
            this.cells.push(new Array());
            for(let j = 0; j < 16; j++) {
                this.cells[i][j].display();
            }
        }
    }
}