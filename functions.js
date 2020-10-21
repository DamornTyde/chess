const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const grid = 100;

canvas.width = grid * 8;
canvas.height = canvas.width;

//draw board
const board = createCanvas(canvas.width, canvas.width);
const brdCtx = board.getContext("2d");

brdCtx.fillStyle = "#100";
brdCtx.fillRect(0, 0, canvas.width, canvas.width);
brdCtx.fillStyle = "#800";
for (var x = 0; x < 8; x++) {
    for (var y = x % 2; y < 8; y += 2) {
        brdCtx.fillRect(x * grid, y * grid, grid, grid);
    }
}

//draw pieces
function scalePoint(i) {
    return i * (grid / 100);
}

function fillshape(tmpCtx, colour, outline) {
    tmpCtx.strokeStyle = outline;
    tmpCtx.lineWidth = scalePoint(6);
    tmpCtx.lineCap = "round";
    tmpCtx.lineJoin = "round";
    tmpCtx.stroke();
    tmpCtx.fillStyle = colour;
    tmpCtx.fill();
    tmpCtx.lineWidth = 2;
}

function drawRook(colour, outline) {
    const temp = createCanvas(grid, grid);
    const tmpCtx = temp.getContext("2d");
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(30), scalePoint(10));
    tmpCtx.lineTo(scalePoint(30), scalePoint(25));
    tmpCtx.lineTo(scalePoint(34), scalePoint(25));
    tmpCtx.lineTo(scalePoint(34), scalePoint(80));
    tmpCtx.lineTo(scalePoint(30), scalePoint(80));
    tmpCtx.lineTo(scalePoint(30), scalePoint(90));
    tmpCtx.lineTo(scalePoint(70), scalePoint(90));
    tmpCtx.lineTo(scalePoint(70), scalePoint(80));
    tmpCtx.lineTo(scalePoint(66), scalePoint(80));
    tmpCtx.lineTo(scalePoint(66), scalePoint(25));
    tmpCtx.lineTo(scalePoint(70), scalePoint(25));
    tmpCtx.lineTo(scalePoint(70), scalePoint(10));
    tmpCtx.lineTo(scalePoint(62), scalePoint(10));
    tmpCtx.lineTo(scalePoint(62), scalePoint(15));
    tmpCtx.lineTo(scalePoint(54), scalePoint(15));
    tmpCtx.lineTo(scalePoint(54), scalePoint(10));
    tmpCtx.lineTo(scalePoint(46), scalePoint(10));
    tmpCtx.lineTo(scalePoint(46), scalePoint(15));
    tmpCtx.lineTo(scalePoint(38), scalePoint(15));
    tmpCtx.lineTo(scalePoint(38), scalePoint(10));
    tmpCtx.closePath();
    fillshape(tmpCtx, colour, outline);
    tmpCtx.moveTo(scalePoint(42), scalePoint(90));
    tmpCtx.quadraticCurveTo(scalePoint(50), scalePoint(50), scalePoint(58), scalePoint(90));
    tmpCtx.stroke();
    tmpCtx.moveTo(scalePoint(38), scalePoint(90));
    tmpCtx.quadraticCurveTo(scalePoint(50), scalePoint(40), scalePoint(62), scalePoint(90));
    tmpCtx.stroke();
    tmpCtx.moveTo(scalePoint(50), scalePoint(70));
    tmpCtx.lineTo(scalePoint(50), scalePoint(90));
    tmpCtx.stroke();
    tmpCtx.moveTo(scalePoint(40.5), scalePoint(80));
    tmpCtx.lineTo(scalePoint(34), scalePoint(80));
    tmpCtx.lineTo(scalePoint(34), scalePoint(15));
    tmpCtx.lineTo(scalePoint(46), scalePoint(15));
    tmpCtx.lineTo(scalePoint(46), scalePoint(25));
    tmpCtx.lineTo(scalePoint(54), scalePoint(25));
    tmpCtx.lineTo(scalePoint(54), scalePoint(15));
    tmpCtx.lineTo(scalePoint(66), scalePoint(15));
    tmpCtx.lineTo(scalePoint(66), scalePoint(80));
    tmpCtx.lineTo(scalePoint(59.5), scalePoint(80));
    tmpCtx.stroke();
    return temp;
}

const blckRk = drawRook("#000", "#fff");
const whtRk = drawRook("#fff", "#000");

//classes
class player {
    constructor(name) {
        this.name = name;
        this.pieces = [];
    }
}

class piece {
    constructor(name, pos, asset) {
        this.name = name;
        this.pos = pos;
        this.asset = asset;
    }
    drawPiece() {
        ctx.drawImage(this.asset, this.pos.x * grid, this.pos.y * grid);
    }
}

class king extends piece {
    constructor(pos, asset) {
        super("king", pos, asset);
    }
}

class queen extends piece {
    constructor(pos, asset) {
        super("queen", pos, asset);
    }
}

class rook extends piece {
    constructor(pos, asset) {
        super("rook", pos, asset);
    }
}

class bishop extends piece {
    constructor(pos, asset) {
        super("bishop", pos, asset);
    }
}

class knight extends piece {
    constructor(pos, asset) {
        super("knight", pos, asset);
    }
}

class pawn extends piece {
    constructor(pos, asset) {
        super("pawn", pos, asset);
        this.start = pos;
    }
}

class coor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//build game
const players = [new player("White"), new player("Black")];

//white player
players[0].pieces.push(new rook(new coor(0, 7), whtRk));
players[0].pieces.push(new rook(new coor(7, 7), whtRk));

//black player
players[1].pieces.push(new rook(new coor(0, 0), blckRk));
players[1].pieces.push(new rook(new coor(7, 0), blckRk));

drawGame();

//misc functions
function drawGame() {
    ctx.drawImage(board, 0, 0);
    players.forEach(function (item) {
        item.pieces.forEach(function (item2) {
            item2.drawPiece();
        });
    });
}

function createCanvas(w, h) {
    const temp = document.createElement("canvas");
	temp.width = w;
    temp.height = h;
	return temp;
}