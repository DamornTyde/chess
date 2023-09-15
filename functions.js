"use strict"
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const canvasx = canvas.offsetLeft;
const canvasy = canvas.offsetTop;
const rookAsset = [];
const knightAsset = [];
const bishopAsset = [];
const queenAsset = [];
const kingAsset = [];
const pawnAsset = [];
const body = document.body;
const html = document.documentElement;

let players = [];
let grid;
let lastAction = 0;
let slct;
let msPlc;
let moveTile = [];
let castleMove = [];
let board;
let castleAsset;
let lock = false;
let moveHistory = [];

//autoplay
window.onload = function () {
    scaling();
    drawAssets();
    buildPlayers();
};

menu.appendChild(createButton("Reset", () => buildPlayers()));

//scaling
function scaling() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    grid = Math.min(vw - 60, vh - 70) / 8;
    canvas.width = grid * 8;
    canvas.height = canvas.width;
}

window.onresize = rescaling;

function rescaling() {
    scaling();
    drawAssets();
    players.forEach((item, i) => {
        item.pieces.forEach(item2 => {
            switch (item2.name) {
                case "king":
                    item2.asset = kingAsset[i];
                    break;
                case "queen":
                    item2.asset = queenAsset[i];
                    break;
                case "rook":
                    item2.asset = rookAsset[i];
                    break;
                case "knight":
                    item2.asset = knightAsset[i];
                    break;
                case "bishop":
                    item2.asset = bishopAsset[i];
                    break;
                case "pawn":
                    item2.asset = pawnAsset[i];
            }
        });
    });
    drawGame();
}

//draw assets
function scalePoint(i) {
    return i * (grid / 100);
}

function fillshape(tmpCtx, colour, outline, inFull) {
    tmpCtx.closePath();
    tmpCtx.strokeStyle = outline;
    tmpCtx.lineWidth = scalePoint(6);
    tmpCtx.lineCap = "round";
    tmpCtx.lineJoin = "round";
    tmpCtx.stroke();
    if (inFull) {
        tmpCtx.fillStyle = colour;
        tmpCtx.fill();
        tmpCtx.lineWidth = scalePoint(1);
    }
}

function drawAssets() {
    board = createCanvas(canvas.width, canvas.width);
    const brdCtx = board.getContext("2d");
    brdCtx.fillStyle = "#200";
    brdCtx.fillRect(0, 0, canvas.width, canvas.width);
    brdCtx.fillStyle = "#800";
    for (let x = 0; x < 8; x++) {
        for (let y = x % 2; y < 8; y += 2) {
            brdCtx.fillRect(x * grid, y * grid, grid, grid);
        }
    }
    rookAsset[0] = drawRook("#fff", "#000");
    rookAsset[1] = drawRook("#000", "#fff");
    knightAsset[0] = drawKnight("#fff", "#000");
    knightAsset[1] = drawKnight("#000", "#fff");
    bishopAsset[0] = drawBishop("#fff", "#000");
    bishopAsset[1] = drawBishop("#000", "#fff");
    queenAsset[0] = drawQueen("#fff", "#000");
    queenAsset[1] = drawQueen("#000", "#fff");
    kingAsset[0] = drawKing("#fff", "#000", true);
    kingAsset[1] = drawKing("#000", "#fff", true);
    pawnAsset[0] = drawPawn("#fff", "#000");
    pawnAsset[1] = drawPawn("#000", "#fff");
    castleAsset = drawKing(undefined, "rgba(255, 255, 255, .5)", false);
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
    fillshape(tmpCtx, colour, outline, true);
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(42), scalePoint(90));
    tmpCtx.quadraticCurveTo(scalePoint(50), scalePoint(50), scalePoint(58), scalePoint(90));
    tmpCtx.moveTo(scalePoint(38), scalePoint(90));
    tmpCtx.quadraticCurveTo(scalePoint(50), scalePoint(40), scalePoint(62), scalePoint(90));
    tmpCtx.moveTo(scalePoint(50), scalePoint(70));
    tmpCtx.lineTo(scalePoint(50), scalePoint(90));
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

function drawKnight(colour, outline) {
    const temp = createCanvas(grid, grid);
    const tmpCtx = temp.getContext("2d");
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(46), scalePoint(27));
    tmpCtx.quadraticCurveTo(scalePoint(50), scalePoint(25), scalePoint(54), scalePoint(27));
    tmpCtx.lineTo(scalePoint(60), scalePoint(10));
    tmpCtx.bezierCurveTo(scalePoint(65), scalePoint(20), scalePoint(60), scalePoint(30), scalePoint(57), scalePoint(30));
    tmpCtx.lineTo(scalePoint(60), scalePoint(35));
    tmpCtx.quadraticCurveTo(scalePoint(64), scalePoint(38), scalePoint(60), scalePoint(45));
    tmpCtx.bezierCurveTo(scalePoint(62), scalePoint(52), scalePoint(54), scalePoint(65), scalePoint(58), scalePoint(75));
    tmpCtx.bezierCurveTo(scalePoint(60), scalePoint(80), scalePoint(60), scalePoint(81), scalePoint(56), scalePoint(87));
    tmpCtx.bezierCurveTo(scalePoint(55), scalePoint(92), scalePoint(54), scalePoint(90), scalePoint(50), scalePoint(90));
    tmpCtx.bezierCurveTo(scalePoint(46), scalePoint(90), scalePoint(45), scalePoint(92), scalePoint(44), scalePoint(87));
    tmpCtx.bezierCurveTo(scalePoint(40), scalePoint(81), scalePoint(40), scalePoint(80), scalePoint(42), scalePoint(75));
    tmpCtx.bezierCurveTo(scalePoint(46), scalePoint(65), scalePoint(38), scalePoint(52), scalePoint(40), scalePoint(45));
    tmpCtx.quadraticCurveTo(scalePoint(36), scalePoint(38), scalePoint(40), scalePoint(35));
    tmpCtx.lineTo(scalePoint(43), scalePoint(30));
    tmpCtx.bezierCurveTo(scalePoint(40), scalePoint(30), scalePoint(35), scalePoint(20), scalePoint(40), scalePoint(10));
    fillshape(tmpCtx, colour, outline, true);
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(55), scalePoint(86));
    tmpCtx.bezierCurveTo(scalePoint(53), scalePoint(80), scalePoint(58), scalePoint(77), scalePoint(57), scalePoint(76));
    tmpCtx.moveTo(scalePoint(45), scalePoint(86));
    tmpCtx.bezierCurveTo(scalePoint(47), scalePoint(80), scalePoint(42), scalePoint(77), scalePoint(43), scalePoint(76));
    tmpCtx.moveTo(scalePoint(59), scalePoint(36));
    tmpCtx.lineTo(scalePoint(58), scalePoint(39));
    tmpCtx.moveTo(scalePoint(41), scalePoint(36));
    tmpCtx.lineTo(scalePoint(42), scalePoint(39));
    tmpCtx.stroke();
    return temp;
}

function drawBishop(colour, outline) {
    const temp = createCanvas(grid, grid);
    const tmpCtx = temp.getContext("2d");
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(20), scalePoint(90));
    tmpCtx.lineTo(scalePoint(10), scalePoint(50));
    tmpCtx.quadraticCurveTo(scalePoint(20), scalePoint(20), scalePoint(50), scalePoint(10));
    tmpCtx.quadraticCurveTo(scalePoint(80), scalePoint(20), scalePoint(90), scalePoint(50));
    tmpCtx.lineTo(scalePoint(80), scalePoint(90));
    fillshape(tmpCtx, colour, outline, true);
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(45), scalePoint(85));
    tmpCtx.lineTo(scalePoint(50), scalePoint(50));
    tmpCtx.lineTo(scalePoint(15), scalePoint(50));
    tmpCtx.lineTo(scalePoint(20), scalePoint(40));
    tmpCtx.lineTo(scalePoint(50), scalePoint(50));
    tmpCtx.lineTo(scalePoint(45), scalePoint(20));
    tmpCtx.lineTo(scalePoint(55), scalePoint(20));
    tmpCtx.lineTo(scalePoint(50), scalePoint(50));
    tmpCtx.lineTo(scalePoint(80), scalePoint(40));
    tmpCtx.lineTo(scalePoint(85), scalePoint(50));
    tmpCtx.lineTo(scalePoint(50), scalePoint(50));
    tmpCtx.lineTo(scalePoint(55), scalePoint(85));
    tmpCtx.closePath();
    tmpCtx.fillStyle = outline;
    tmpCtx.fill();
    return temp;
}

function drawQueen(colour, outline) {
    const temp = createCanvas(grid, grid);
    const tmpCtx = temp.getContext("2d");
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(35), scalePoint(90));
    tmpCtx.lineTo(scalePoint(10), scalePoint(25));
    tmpCtx.lineTo(scalePoint(35), scalePoint(70));
    tmpCtx.lineTo(scalePoint(30), scalePoint(15));
    tmpCtx.lineTo(scalePoint(44), scalePoint(65));
    tmpCtx.lineTo(scalePoint(50), scalePoint(10));
    tmpCtx.lineTo(scalePoint(56), scalePoint(65));
    tmpCtx.lineTo(scalePoint(70), scalePoint(15));
    tmpCtx.lineTo(scalePoint(65), scalePoint(70));
    tmpCtx.lineTo(scalePoint(90), scalePoint(25));
    tmpCtx.lineTo(scalePoint(65), scalePoint(90));
    fillshape(tmpCtx, colour, outline, true);
    return temp;
}

function drawKing(colour, outline, inFull) {
    const temp = createCanvas(grid, grid);
    const tmpCtx = temp.getContext("2d");
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(25), scalePoint(90));
    tmpCtx.quadraticCurveTo(scalePoint(25), scalePoint(65), scalePoint(10), scalePoint(30));
    tmpCtx.quadraticCurveTo(scalePoint(45), scalePoint(90), scalePoint(45), scalePoint(30));
    tmpCtx.lineTo(scalePoint(35), scalePoint(30));
    tmpCtx.lineTo(scalePoint(35), scalePoint(20));
    tmpCtx.lineTo(scalePoint(45), scalePoint(20));
    tmpCtx.lineTo(scalePoint(45), scalePoint(10));
    tmpCtx.lineTo(scalePoint(55), scalePoint(10));
    tmpCtx.lineTo(scalePoint(55), scalePoint(20));
    tmpCtx.lineTo(scalePoint(65), scalePoint(20));
    tmpCtx.lineTo(scalePoint(65), scalePoint(30));
    tmpCtx.lineTo(scalePoint(55), scalePoint(30));
    tmpCtx.quadraticCurveTo(scalePoint(55), scalePoint(90), scalePoint(90), scalePoint(30));
    tmpCtx.quadraticCurveTo(scalePoint(75), scalePoint(65), scalePoint(75), scalePoint(90));
    fillshape(tmpCtx, colour, outline, inFull);
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(50), scalePoint(85));
    tmpCtx.lineTo(scalePoint(45), scalePoint(75));
    tmpCtx.lineTo(scalePoint(50), scalePoint(65));
    tmpCtx.lineTo(scalePoint(55), scalePoint(75));
    tmpCtx.fillStyle = outline;
    tmpCtx.fill();
    if (inFull) {
        tmpCtx.beginPath();
        tmpCtx.moveTo(scalePoint(50), scalePoint(65));
        tmpCtx.lineTo(scalePoint(50), scalePoint(85));
        tmpCtx.moveTo(scalePoint(45), scalePoint(75));
        tmpCtx.lineTo(scalePoint(55), scalePoint(75));
        tmpCtx.strokeStyle = colour;
        tmpCtx.stroke();
        return temp;
    }
    const temp2 = createCanvas(grid, grid);
    const tmp2Ctx = temp2.getContext("2d");
    tmp2Ctx.drawImage(temp, grid * .25, grid * .25, grid * .5, grid * .5);
    return temp2;
}

function drawPawn(colour, outline) {
    const temp = createCanvas(grid, grid);
    const tmpCtx = temp.getContext("2d");
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(10), scalePoint(90));
    tmpCtx.quadraticCurveTo(scalePoint(45), scalePoint(80), scalePoint(45), scalePoint(40));
    tmpCtx.bezierCurveTo(scalePoint(40), scalePoint(40), scalePoint(40), scalePoint(35), scalePoint(45), scalePoint(35));
    tmpCtx.quadraticCurveTo(scalePoint(25), scalePoint(10), scalePoint(50), scalePoint(10));
    tmpCtx.quadraticCurveTo(scalePoint(75), scalePoint(10), scalePoint(55), scalePoint(35));
    tmpCtx.bezierCurveTo(scalePoint(60), scalePoint(35), scalePoint(60), scalePoint(40), scalePoint(55), scalePoint(40));
    tmpCtx.quadraticCurveTo(scalePoint(55), scalePoint(80), scalePoint(90), scalePoint(90));
    fillshape(tmpCtx, colour, outline, true);
    return temp;
}

//classes
class player {
    constructor(name) {
        this.name = name;
        this.pieces = [];
    }
}

class piece {
    constructor(name, points, pos, asset) {
        this.name = name;
        this.points = points;
        this.pos = pos;
        this.asset = asset;
        this.start = true;
        this.history = [];
    }
    drawPiece() {
        ctx.drawImage(this.asset, this.pos.x * grid, this.pos.y * grid);
    }
    movePiece(newPos) {
        this.history.push(new movement(this.pos, newPos));
        this.pos = newPos;
    }
    moveCheck() {
        if (this.history.length > 1) {
            for (let i = this.history.length - 1; i > 0; i--) {
                const a = this.history[i - 1].from;
                if (!isCoor(this.history[i].to, a.x, a.y)) {
                    return false;
                }
                if (this.history.length - i == 4) {
                    return true;
                }
            }
        }
        return false;
    }
}

class king extends piece {
    constructor(pos, asset) {
        super("king", 0, pos, asset);
    }
    move(check) {
        let temp = flatten(royalCheck(this.pos.x, this.pos.y, 0, false));
        if (check) {
            const temp2 = getEnemyGrid();
            const temp3 = straightLiners(true);
            for (let i of temp3) {
                if (includesCoor(this.pos, i.move(false), true)) {
                    const temp4 = posCheck(this.pos, i.pos);
                    temp2.push(new coor(this.pos.x - temp4.x, this.pos.y - temp4.y));
                }
            }
            temp = coorFilter(temp, flatten(temp2), false);
            return coorFilter(temp, getPiecesPos(whosTurn(false)), false);
        }
        return temp;
    }
}

class queen extends piece {
    constructor(pos, asset) {
        super("queen", 9, pos, asset);
    }
    move(check) {
        let temp = flatten(royalCheck(this.pos.x, this.pos.y, 0, true));
        if (check) {
            temp = kingCheck(temp, this.pos);
            return coorFilter(temp, getPiecesPos(whosTurn(false)), false);
        }
        return temp;
    }
}

class rook extends piece {
    constructor(pos, asset) {
        super("rook", 5, pos, asset);
    }
    move(check) {
        let temp = [];
        for (let i = -1; i < 2; i += 2) {
            temp.push(lineCheck(this.pos.x, this.pos.y, i, 0));
            temp.push(lineCheck(this.pos.x, this.pos.y, 0, i));
        }
        temp = flatten(temp);
        if (check) {
            temp = kingCheck(temp, this.pos);
            return coorFilter(temp, getPiecesPos(whosTurn(false)), false);
        }
        return temp;
    }
}

class bishop extends piece {
    constructor(pos, asset) {
        super("bishop", 3, pos, asset);
    }
    move(check) {
        let temp = [];
        for (let i = -1; i < 2; i += 2) {
            for (let i2 = -1; i2 < 2; i2 += 2) {
                temp.push(lineCheck(this.pos.x, this.pos.y, i, i2));
            }
        }
        temp = flatten(temp);
        if (check) {
            temp = kingCheck(temp, this.pos);
            return coorFilter(temp, getPiecesPos(whosTurn(false)), false);
        }
        return temp;
    }
}

class knight extends piece {
    constructor(pos, asset) {
        super("knight", 3, pos, asset);
    }
    move(check) {
        let temp = [];
        for (let i = -1; i < 2; i += 2) {
            for (let i2 = -2; i2 < 3; i2 += 4) {
                if (coorCheck(this.pos.x + i, this.pos.y + i2)) {
                    temp.push(new coor(this.pos.x + i, this.pos.y + i2));
                }
                if (coorCheck(this.pos.x + i2, this.pos.y + i)) {
                    temp.push(new coor(this.pos.x + i2, this.pos.y + i));
                }
            }
        }
        if (check) {
            temp = kingCheck(temp, this.pos);
            return coorFilter(temp, getPiecesPos(whosTurn(false)), false);
        }
        return temp;
    }
}

class pawn extends piece {
    constructor(pos, asset, frwrd) {
        super("pawn", 1, pos, asset);
        this.frwrd = frwrd;
        this.enPassant = -1;
    }
    move(check) {
        let temp;
        if (check) {
            temp = [
                [],
                []
            ];
            let temp2 = getPiecesPos(-1);
            let temp3 = new coor(this.pos.x, this.pos.y + this.frwrd);
            if (includesCoor(temp3, temp2, false)) {
                temp[0].push(temp3);
                temp3 = new coor(this.pos.x, this.pos.y + this.frwrd * 2)
                if (this.start && includesCoor(temp3, temp2, false)) {
                    temp[0].push(temp3);
                }
            }
            temp2 = getPiecesPos(whosTurn(true));
            for (let i = -1; i < 2; i += 2) {
                temp3 = new coor(this.pos.x + i, this.pos.y + this.frwrd);
                if (includesCoor(temp3, temp2, true)) {
                    temp[1].push(temp3);
                } else {
                    const temp4 = players[whosTurn(true)].pieces.find(p => isCoor(p.pos, temp3.x, this.pos.y));
                    if (temp4 != undefined && temp4.name == "pawn" && temp4.enPassant == moveHistory.length) {
                        temp[1].push(temp3);
                    }
                }
            }
            for (let i = 0; i < temp.length; i++) {
                temp[i] = kingCheck(temp[i], this.pos);
            }
        } else {
            temp = [];
            for (let i = -1; i < 2; i += 2) {
                temp.push(new coor(this.pos.x + i, this.pos.y + this.frwrd));
            }
        }
        return temp;
    }
}

class coor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class move {
    constructor(name, from, to) {
        this.name = name;
        this.from = from;
        this.to = to;
        this.note = "";
    }
}

class movement {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}

//build game
function buildPlayers() {
    clearMoveSet();
    players = [];
    moveHistory = [];
    console.log("new game");
    const playerNames = ["White", "Black"];
    for (let i = 0; i < 2; i++) {
        const temp = new player(playerNames[i]);
        for (let i2 = 0; i2 < 2; i2++) {
            temp.pieces.push(new rook(new coor(0 + 7 * i2, 7 - 7 * i), rookAsset[i]));
            temp.pieces.push(new knight(new coor(1 + 5 * i2, 7 - 7 * i), knightAsset[i]));
            temp.pieces.push(new bishop(new coor(2 + 3 * i2, 7 - 7 * i), bishopAsset[i]));
        }
        temp.pieces.push(new queen(new coor(3, 7 - 7 * i), queenAsset[i]));
        temp.pieces.push(new king(new coor(4, 7 - 7 * i), kingAsset[i]));
        for (let x = 0; x < 8; x++) {
            temp.pieces.push(new pawn(new coor(x, 6 - 5 * i), pawnAsset[i], -1 + 2 * i));
        }
        players.push(temp);
    }
    drawGame();
}

//draw game
function drawGame() {
    ctx.drawImage(board, 0, 0);
    if (msPlc != undefined) {
        ctx.fillStyle = "rgba(255, 255, 0, .5)";
        ctx.fillRect(msPlc.x * grid, msPlc.y * grid, grid, grid);
    }
    if (slct != undefined) {
        ctx.fillRect(slct.pos.x * grid, slct.pos.y * grid, grid, grid);
    }
    players.forEach(item => {
        item.pieces.forEach(item2 => {
            item2.drawPiece();
        });
    });
    const temp = getPiecesPos(whosTurn(true));
    ctx.lineWidth = scalePoint(10);
    ctx.strokeStyle = "rgba(0, 255, 0, .7)";
    if (slct != undefined && slct.name != "pawn") {
        ctx.fillStyle = "rgba(0, 255, 0, .5)";
        moveTile.forEach(item => {
            drawOption(item, temp);
        });
        castleMove.forEach(item => {
            drawArc(item);
            ctx.drawImage(castleAsset, item.x * grid, item.y * grid);
        });
        ctx.fillStyle = "rgba(0, 255, 255, .1)";
        ctx.strokeStyle = "rgba(0, 255, 255, .1)";
        falseMoves(moveTile, temp, false);
    } else {
        moveTile.forEach((temp2, i) => {
            ctx.fillStyle = "rgba(0, 255, 0, .5)";
            ctx.strokeStyle = "rgba(0, 255, 0, .7)";
            temp2.forEach(item => {
                if (i == 0) {
                    drawArc(item);
                } else {
                    drawX(item);
                }
            });
            ctx.fillStyle = "rgba(0, 255, 255, 0.1)";
            ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
            if (i == 0) {
                const item = new coor(slct.pos.x, slct.pos.y + slct.frwrd);
                if (includesCoor(item, temp2, false) && includesCoor(item, getPiecesPos(whosTurn(-1)), false)) {
                    drawArc(item);
                }
            } else {
                falseMoves(temp2, temp, true);
            }
        });
    }
}

function drawArc(item) {
    ctx.beginPath();
    ctx.arc((item.x * grid) + (grid / 2), (item.y * grid) + (grid / 2), grid * .3, 0, 2 * Math.PI);
    ctx.fill();
}

function drawX(item) {
    ctx.beginPath();
    ctx.moveTo((item.x * grid) + (grid * .1), (item.y * grid) + (grid * .1));
    ctx.lineTo((item.x * grid) + (grid * .9), (item.y * grid) + (grid * .9));
    ctx.moveTo((item.x * grid) + (grid * .1), (item.y * grid) + (grid * .9));
    ctx.lineTo((item.x * grid) + (grid * .9), (item.y * grid) + (grid * .1));
    ctx.stroke();
}

function falseMoves(temp2, temp, opp) {
    coorFilter(coorFilter(slct.move(false), temp2, false), getPiecesPos(whosTurn(opp)), opp).forEach(item => {
        drawOption(item, temp);
    });
}

function drawOption(item, temp) {
    if (includesCoor(item, temp, false)) {
        drawArc(item);
    } else {
        drawX(item);
    }
}

//input
document.getElementById("game").addEventListener("click", function (e) {
    const temp = new coor(Math.floor((e.clientX - canvasx) / grid), Math.floor((e.clientY - canvasy) / grid));
    if (includesCoor(temp, getPiecesPos(whosTurn(false)), true) && !lock) {
        castleMove = [];
        slct = players[whosTurn(false)].pieces.find(x => isCoor(x.pos, temp.x, temp.y));
        moveTile = slct.move(true);
        if (slct.name == "king" && slct.start) {
            for (let i = -1; i < 2; i += 2) {
                const temp2 = lineCheck(slct.pos.x, slct.pos.y, i, 0);
                const temp3 = temp2.at(-1);
                const temp4 = players[whosTurn(false)].pieces.find(x => isCoor(x.pos, temp3.x, temp3.y));
                if (temp4 != undefined && temp4.name == "rook" && temp4.start && coorFilter([slct.pos, temp2.at(0), temp2.at(1)], getEnemyGrid(), false).length == 3) {
                    castleMove.push(temp2.at(1));
                }
            }
        }
    } else if (includesCoor(temp, flatten(moveTile), true)) {
        moveHistory.push(new move(slct.name, slct.pos, temp));
        if (slct.name == "pawn") {
            lastAction = moveHistory.length -1;
            if (moveTile[0].length == 2 && isCoor(moveTile[0][1], temp.x, temp.y)) {
                slct.enPassant = moveHistory.length;
            } else if (includesCoor(temp, moveTile[1], true) && includesCoor(temp, getPiecesPos(whosTurn(false)), false)) {
                const temp3 = players[whosTurn(false)].pieces.findIndex(x => isCoor(x.pos, temp.x, temp.y - slct.frwrd));
                players[whosTurn(false)].pieces.splice(temp3, 1);
                moveHistory.at(-1).note = "-pawn";
            }
        }
        if (includesCoor(temp, getPiecesPos(whosTurn(false)), true)) {
            lastAction = moveHistory.length -1;
            const temp2 = players[whosTurn(false)].pieces.findIndex(x => isCoor(x.pos, temp.x, temp.y));
            moveHistory.at(-1).note = `-${players[whosTurn(false)].pieces[temp2].name}`;
            players[whosTurn(false)].pieces.splice(temp2, 1);
        }
        if (slct.name == "pawn" && (temp.y == 0 || temp.y == 7)) {
            const temp4 = players[whosTurn(true)].pieces.findIndex(x => isCoor(x.pos, slct.pos.x, slct.pos.y));
            players[whosTurn(true)].pieces.splice(temp4, 1);
            promoteInfo(temp.x, temp.y);
            return;
        }
        slct.movePiece(temp);
        const exclude = ["pawn", "king"];
        if (!exclude.includes(slct.name) && slct.moveCheck()) {
            players[whosTurn(false)].pieces.filter(x => !exclude.includes(x.name)).forEach(item => {
                if (item.moveCheck()) {
                    alert("Draw because the game is going nowhere");
                    lock = true;
                }
            });
        }
        if (slct.start) {
            slct.start = false;
        }
        endTurn();
    } else if (includesCoor(temp, castleMove, true)) {
        const temp2 = subCheck(slct.pos.x, temp.x);
        const temp3 = lineCheck(temp.x, temp.y, temp2, 0).at(-1);
        const temp4 = players[whosTurn(false)].pieces.find(x => isCoor(x.pos, temp3.x, temp3.y));
        moveHistory.push(new move(slct.name, slct.pos, temp));
        moveHistory.at(-1).note = "castle";
        slct.start = false;
        slct.movePiece(temp);
        temp4.movePiece(new coor(temp.x - temp2, temp.y));
        endTurn();
    } else {
        clearMoveSet();
    }
    drawGame();
});

function endTurn() {
    if (moveHistory.length - lastAction == 50) {
        alert("Draw because the game is boring");
        lock = true;
    }
    if (noPawn()) {
        const temp = [];
        players.forEach(i => {
            let points = 0;
            i.pieces.forEach(item => {
                points += item.points;
            });
            temp.push(points);
        });
        if (Math.max(...temp) < 6) {
            alert("Draw: Checkmate aint possible");
            lock = true;
        }
    }
    clearMoveSet();
    const temp = [];
    players[whosTurn(false)].pieces.forEach(item => {
        temp.push(item.move(true));
    });
    if (kingThreat().length == 0) {
        if (flatten(temp).length == 0) {
            createGameInfo(`Stalemate (${players[whosTurn(false)].name} can't move)`);
        }
    } else {
        if (flatten(temp).length == 0) {
            createGameInfo(`Checkmate (${players[whosTurn(true)].name} won)`);
        } else {
            createGameInfo(`Check`);
        }
    }
    const temp2 = moveHistory.at(-1);
    console.log(`${temp2.name} ${JSON.stringify(temp2.from)} ${JSON.stringify(temp2.to)} ${temp2.note}`);
}

function promotePawn(x, y) {
    let temp;
    switch (document.getElementById("infoSelect").value) {
        case "Queen":
            temp = new queen(new coor(x, y), queenAsset[whosTurn(true)]);
            break;
        case "Knight":
            temp = new knight(new coor(x, y), knightAsset[whosTurn(true)]);
            break;
        case "Rook":
            temp = new rook(new coor(x, y), rookAsset[whosTurn(true)]);
            break;
        case "Bishop":
            temp = new bishop(new coor(x, y), bishopAsset[whosTurn(true)]);
    }
    moveHistory.at(-1).note += `+${temp.name}`;
    temp.start = false;
    players[whosTurn(true)].pieces.push(temp);
    document.getElementById("dark").remove();
    endTurn();
    drawGame();
}

document.getElementById("game").addEventListener("mousemove", function (e) {
    const item = new coor(Math.floor((e.clientX - canvasx) / grid), Math.floor((e.clientY - canvasy) / grid));
    if (includesCoor(item, getPiecesPos(whosTurn(false)), true) || includesCoor(item, flatten(moveTile), true) || includesCoor(item, castleMove, true)) {
        msPlc = item;
    } else {
        msPlc = undefined;
    }
    drawGame();
});

function clearMoveSet() {
    slct = undefined;
    msPlc = undefined;
    moveTile = [];
    castleMove = [];
}

//move checks
function whosTurn(opp) {
    return (moveHistory.length + (opp ? 1 : 0)) % 2;
}

function coorCheck(x, y) {
    return rangeCheck(x) && rangeCheck(y);
}

function rangeCheck(i) {
    return i > -1 && i < 8;
}

function lineCheck(x, y, xM, yM) {
    const temp = [];
    const temp2 = getPiecesPos(-1);
    for (let i = 1; i == 1 || includesCoor(temp.at(-1), temp2, false); i++) {
        const temp3 = new coor(x + xM * i, y + yM * i);
        if (coorCheck(temp3.x, temp3.y)) {
            temp.push(temp3);
        } else {
            return temp;
        }
    }
    return temp;
}

function royalCheck(x, y, r, p) {
    const temp = [];
    for (let i = -1; i < 2; i += 2) {
        temp.push(royalExend(x, y, r, i, p));
        if (r == 0) {
            temp.push(royalExend(x, y, i, r, p));
            temp.push(royalCheck(x, y, i, p));
        }
    }
    return temp;
}

function royalExend(x, y, xM, yM, p) {
    if (p) {
        return lineCheck(x, y, xM, yM);
    } else {
        if (coorCheck(x + xM, y + yM)) {
            return new coor(x + xM, y + yM);
        } else {
            return [];
        }
    }
}

function coorFilter(temp, temp2, incl) {
    return temp.filter(i => includesCoor(i, temp2, incl));
}

function includesCoor(item, temp, incl) {
    const test = temp.findIndex(i => isCoor(item, i.x, i.y));
    return incl ? test > -1 : test == -1;
}

function isCoor(c, x, y) {
    return c.x == x && c.y == y;
}

function flatten(temp) {
    const temp2 = [];
    temp.forEach(function deeper(item) {
        if (Array.isArray(item)) {
            item.forEach(deeper);
        } else {
            temp2.push(item);
        }
    });
    return temp2;
}

function getPiecesPos(x) {
    const temp = [];
    if (x == -1) {
        players.forEach(i => {
            i.pieces.forEach(item => {
                temp.push(item.pos);
            });
        });
    } else {
        players[x].pieces.forEach(i => {
            temp.push(i.pos);
        });
    }
    return temp;
}

function straightLiners(opp) {
    return players[whosTurn(opp)].pieces.filter(x => ["queen", "rook", "bishop"].includes(x.name));
}

function posCheck(a, b) {
    return new coor(subCheck(a.x, b.x), subCheck(a.y, b.y));
}

function subCheck(a, b) {
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    }
    return 0;
}

function kingCheck(temp, p) {
    const temp2 = players[whosTurn(false)].pieces.find(x => x.name == "king").pos;
    const temp3 = straightLinersCheck(temp, p, temp2);
    const temp4 = kingThreat();
    if (temp4.length > 1) {
        return [];
    }
    if (temp4.length == 1) {
        const temp5 = [];
        straightLiners(true).forEach(item => {
            temp5.push(item.pos);
        });
        if (includesCoor(temp4[0], temp5, true)) {
            const temp6 = posCheck(temp2, temp4[0]);
            return coorFilter(temp3, lineCheck(temp2.x, temp2.y, temp6.x, temp6.y), true);
        }
        return coorFilter(temp4, temp3, true);
    }
    return temp3;
}

function kingThreat() {
    const temp = players[whosTurn(false)].pieces.find(x => x.name == "king").pos;
    const temp2 = [];
    players[whosTurn(true)].pieces.forEach(item => {
        if (includesCoor(temp, item.move(false), true)) {
            temp2.push(item.pos);
        }
    });
    return temp2;
}

function straightLinersCheck(temp, p, k) {
    straightLiners(true).forEach(item => {
        if (includesCoor(p, item.move(false), true)) {
            const temp2 = posCheck(p, item.pos);
            const temp3 = lineCheck(p.x, p.y, -temp2.x, -temp2.y);
            if (temp3.length > 0 && isCoor(temp3.at(-1), k.x, k.y)) {
                temp3.push(lineCheck(p.x, p.y, temp2.x, temp2.y));
                return coorFilter(temp, flatten(temp3), true);
            }
        }
    });
    return temp;
}

function getEnemyGrid() {
    const temp = [];
    players[whosTurn(true)].pieces.forEach(item => {
        temp.push(item.move(false));
    });
    return flatten(temp);
}

function noPawn() {
    players.forEach(i => {
        i.pieces.forEach(item => {
            if (item.name == "pawn") {
                return false;
            }
        });
    });
    return true;
}

//templating
function createInfo(content, onClicked) {
    const info = document.createElement("div");
    info.setAttribute("id", "info");
    info.appendChild(content);
    info.appendChild(createButton("Ok", onClicked));
    const mid = document.createElement("div");
    mid.setAttribute("id", "mid");
    mid.appendChild(info);
    const dark = document.createElement("div");
    dark.setAttribute("id", "dark");
    dark.appendChild(mid);
    return dark;
}

function promoteInfo(x, y) {
    const temp = document.createElement("select");
    temp.setAttribute("id", "infoSelect");
    ["Queen", "Knight", "Rook", "Bishop"].forEach(item => {
        temp.appendChild(new Option(item));
    });
    const temp2 = document.createElement("div");
    temp2.appendChild(document.createTextNode(`Promote pawn to:`));
    temp2.appendChild(temp);
    body.appendChild(createInfo(temp2, () => promotePawn(x, y)));
}

function createButton(text, onClicked) {
    const button = document.createElement("button");
    button.appendChild(document.createTextNode(text));
    button.addEventListener("click", onClicked);
    return button;
}

function createCanvas(w, h) {
    const temp = document.createElement("canvas");
    temp.width = w;
    temp.height = h;
    return temp;
}

function createGameInfo(content) {
    const temp = document.createElement("div");
    temp.appendChild(document.createTextNode(content));
    body.appendChild(createInfo(temp, () => document.getElementById("dark").remove()));
}
