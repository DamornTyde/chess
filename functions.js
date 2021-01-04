"use strict"
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const canvasx = canvas.offsetLeft;
const canvasy = canvas.offsetTop;

var grid = 100;
var turn = 0;
var slct;
var msPlc;
var moveTile = [];
var captureTile = [];
var beginAnimation;
var xa;
var ya;
var capturePiece;
var noAni = true;

canvas.width = grid * 8;
canvas.height = canvas.width;
const backup1 = createCanvas(canvas.width, canvas.width);
const ctx2 = backup1.getContext("2d");
const backup2 = createCanvas(canvas.width, canvas.width);
const ctx3 = backup2.getContext("2d");

//draw board
const board = createCanvas(canvas.width, canvas.width);
const brdCtx = board.getContext("2d");

brdCtx.fillStyle = "#200";
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
    tmpCtx.closePath();
    tmpCtx.strokeStyle = outline;
    tmpCtx.lineWidth = scalePoint(6);
    tmpCtx.lineCap = "round";
    tmpCtx.lineJoin = "round";
    tmpCtx.stroke();
    tmpCtx.fillStyle = colour;
    tmpCtx.fill();
    tmpCtx.lineWidth = 1;
}

//rook
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
    fillshape(tmpCtx, colour, outline);
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

const blckRk = drawRook("#000", "#fff");
const whtRk = drawRook("#fff", "#000");

//knight
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
    fillshape(tmpCtx, colour, outline);
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

const blckknght = drawKnight("#000", "#fff");
const whtknght = drawKnight("#fff", "#000");

//bishop
function drawBishop(colour, outline) {
    const temp = createCanvas(grid, grid);
    const tmpCtx = temp.getContext("2d");
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(20), scalePoint(90));
    tmpCtx.lineTo(scalePoint(10), scalePoint(50));
    tmpCtx.quadraticCurveTo(scalePoint(20), scalePoint(20), scalePoint(50), scalePoint(10));
    tmpCtx.quadraticCurveTo(scalePoint(80), scalePoint(20), scalePoint(90), scalePoint(50));
    tmpCtx.lineTo(scalePoint(80), scalePoint(90));
    fillshape(tmpCtx, colour, outline);
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

const blckBshp = drawBishop("#000", "#fff");
const whtBshp = drawBishop("#fff", "#000");

//queen
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
    fillshape(tmpCtx, colour, outline);
    return temp;
}

const blckqn = drawQueen("#000", "#fff");
const whtqn = drawQueen("#fff", "#000");

//king
function drawKing(colour, outline) {
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
    fillshape(tmpCtx, colour, outline);
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(50), scalePoint(85));
    tmpCtx.lineTo(scalePoint(45), scalePoint(75));
    tmpCtx.lineTo(scalePoint(50), scalePoint(65));
    tmpCtx.lineTo(scalePoint(55), scalePoint(75));
    tmpCtx.fillStyle = outline;
    tmpCtx.fill();
    tmpCtx.beginPath();
    tmpCtx.moveTo(scalePoint(50), scalePoint(65));
    tmpCtx.lineTo(scalePoint(50), scalePoint(85));
    tmpCtx.moveTo(scalePoint(45), scalePoint(75));
    tmpCtx.lineTo(scalePoint(55), scalePoint(75));
    tmpCtx.strokeStyle = colour;
    tmpCtx.stroke();
    return temp;
}

const blckKng = drawKing("#000", "#fff");
const whtKng = drawKing("#fff", "#000");

//pawn
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
    fillshape(tmpCtx, colour, outline);
    return temp;
}

const blckPwn = drawPawn("#000", "#fff");
const whtPwn = drawPawn("#fff", "#000");

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
        ctx.drawImage(this.asset, mirror(this.pos.x) * grid, mirror(this.pos.y) * grid);
    }
}

class king extends piece {
    constructor(pos, asset) {
        super("king", pos, asset);
    }
    move() {
        royalCheck(this.pos.x, this.pos.y, 0, false);
    }
}

class queen extends piece {
    constructor(pos, asset) {
        super("queen", pos, asset);
    }
    move() {
        royalCheck(this.pos.x, this.pos.y, 0, true);
    }
}

class rook extends piece {
    constructor(pos, asset) {
        super("rook", pos, asset);
    }
    move() {
        for (var i = -1; i < 2; i += 2) {
            lineCheck(this.pos.x, this.pos.y, i, 0);
            lineCheck(this.pos.x, this.pos.y, 0, i);
        }
    }
}

class bishop extends piece {
    constructor(pos, asset) {
        super("bishop", pos, asset);
    }
    move() {
        for (var i = -1; i < 2; i += 2) {
            for (var i2 = -1; i2 < 2; i2 += 2) {
                lineCheck(this.pos.x, this.pos.y, i, i2);
            }
        }
    }
}

class knight extends piece {
    constructor(pos, asset) {
        super("knight", pos, asset);
    }
    move() {
        for (var i = -1; i < 2; i += 2) {
            for (var i2 = -2; i2 < 3; i2 += 4) {
                tileCheck(this.pos.x + i, this.pos.y + i2);
                tileCheck(this.pos.x + i2, this.pos.y + i);
            }
        }
    }
}

class pawn extends piece {
    constructor(pos, asset, frwrd) {
        super("pawn", pos, asset);
        this.frwrd = frwrd;
    }
    move() {
        if (freeTile(this.pos.x, this.pos.y + this.frwrd) && (this.pos.y - this.frwrd == 0 || this.pos.y - this.frwrd == 7)) {
            freeTile(this.pos.x, this.pos.y + (this.frwrd * 2));
        }
        for (var i = -1; i < 2; i += 2) {
            if (players[(turn + 1) % 2].pieces.findIndex(item => findCoor(item.pos, this.pos.x + i, this.pos.y + this.frwrd)) > -1) {
                captureTile.push(new coor(this.pos.x + i, this.pos.y + this.frwrd));
            }
        }
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

function placePawns(p, c, a, f) {
    for (x = 0; x < 8; x++) {
        players[p].pieces.push(new pawn(new coor(x, c), a, f));
    }
}

//white player
players[0].pieces.push(new rook(new coor(0, 7), whtRk));
players[0].pieces.push(new rook(new coor(7, 7), whtRk));
players[0].pieces.push(new knight(new coor(1, 7), whtknght));
players[0].pieces.push(new knight(new coor(6, 7), whtknght));
players[0].pieces.push(new bishop(new coor(2, 7), whtBshp));
players[0].pieces.push(new bishop(new coor(5, 7), whtBshp));
players[0].pieces.push(new queen(new coor(3, 7), whtqn));
players[0].pieces.push(new king(new coor(4, 7), whtKng));
placePawns(0, 6, whtPwn, -1);

//black player
players[1].pieces.push(new rook(new coor(0, 0), blckRk));
players[1].pieces.push(new rook(new coor(7, 0), blckRk));
players[1].pieces.push(new knight(new coor(1, 0), blckknght));
players[1].pieces.push(new knight(new coor(6, 0), blckknght));
players[1].pieces.push(new bishop(new coor(2, 0), blckBshp));
players[1].pieces.push(new bishop(new coor(5, 0), blckBshp));
players[1].pieces.push(new queen(new coor(3, 0), blckqn));
players[1].pieces.push(new king(new coor(4, 0), blckKng));
placePawns(1, 1, blckPwn, 1);

drawGame();

//misc functions
function drawGame() {
    ctx.drawImage(board, 0, 0);
    if (msPlc != undefined) {
        ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
        ctx.fillRect(mirror(msPlc.x) * grid, mirror(msPlc.y) * grid, grid, grid);
    }
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    if (slct != undefined) {
        ctx.fillRect(mirror(slct.pos.x) * grid, mirror(slct.pos.y) * grid, grid, grid);
    }
    moveTile.forEach(function (item) {
        ctx.beginPath();
        ctx.arc((mirror(item.x) * grid) + (grid / 2), (mirror(item.y) * grid) + (grid / 2), grid * 0.25, 0, 2 * Math.PI);
        ctx.fill();
    })
    players.forEach(function (item) {
        item.pieces.forEach(function (item2) {
            item2.drawPiece();
        });
    });
    ctx.beginPath();
    captureTile.forEach(function (item) {
        ctx.moveTo((mirror(item.x) * grid) + (grid * 0.1), (mirror(item.y) * grid) + (grid * 0.1));
        ctx.lineTo((mirror(item.x) * grid) + (grid * 0.9), (mirror(item.y) * grid) + (grid * 0.9));
        ctx.moveTo((mirror(item.x) * grid) + (grid * 0.1), (mirror(item.y) * grid) + (grid * 0.9));
        ctx.lineTo((mirror(item.x) * grid) + (grid * 0.9), (mirror(item.y) * grid) + (grid * 0.1));
    });
    ctx.strokeStyle = "rgba(0, 255, 0, 0.7)";
    ctx.lineWidth = scalePoint(10);
    ctx.stroke();
}

function createCanvas(w, h) {
    const temp = document.createElement("canvas");
    temp.width = w;
    temp.height = h;
    return temp;
}

function findCoor(c, x, y) {
    return c.x == x && c.y == y;
}

function mirror(i) {
    if (turn % 2 == 0) {
        return i;
    }
    return 7 - i;
}

//input
document.querySelector("body").addEventListener("click", function (e) {
    if (noAni) {
        const y = mirror(Math.floor((e.clientY - canvasy) / grid));
        const x = mirror(Math.floor((e.clientX - canvasx) / grid));
        if (slct != undefined && players[turn % 2].pieces.findIndex(i => findCoor(i.pos, x, y)) == -1) {
            if (moveTile.findIndex(i => findCoor(i, x, y)) > -1 || captureTile.findIndex(i => findCoor(i, x, y)) > -1) {
                noAni = false;
                msPlc = undefined;
                const capture = players[(turn + 1) % 2].pieces.findIndex(i => findCoor(i.pos, x, y));
                if (capture > -1) {
                    capturePiece = players[(turn + 1) % 2].pieces.splice(capture, 1)[0];
                } else {
                    capturePiece = undefined;
                }
                ctx.drawImage(board, 0, 0);
                players.forEach(function (item) {
                    item.pieces.forEach(function (item2) {
                        if (!findCoor(item2.pos, slct.pos.x, slct.pos.y)) {
                            item2.drawPiece();
                        }
                    });
                });
                ctx2.drawImage(canvas, 0, 0);
                slct.drawPiece();
                beginAnimation = new Date();
                xa = x;
                ya = y;
                window.requestAnimationFrame(movePiece);
                clearMoveSet();
                return;
            }
        }
        clearMoveSet();
        slct = players[turn % 2].pieces.find(i => findCoor(i.pos, x, y));
        if (slct != undefined) {
            slct.move();
        }
        drawGame();
    }
});

document.querySelector("body").addEventListener("mousemove", function (e) {
    if (noAni) {
        const y = mirror(Math.floor((e.clientY - canvasy) / grid));
        const x = mirror(Math.floor((e.clientX - canvasx) / grid));
        if (players[turn % 2].pieces.findIndex(i => findCoor(i.pos, x, y)) > -1 || moveTile.findIndex(i => findCoor(i, x, y)) > -1 || captureTile.findIndex(i => findCoor(i, x, y)) > -1) {
            msPlc = new coor(x, y);
        } else {
            msPlc = undefined;
        }
        drawGame();
    }
});

function clearMoveSet() {
    moveTile = [];
    captureTile = [];
}

//move checks
function freeTile(x, y) {
    if (y < 8 && y > -1 && noPiece(x, y)) {
        moveTile.push(new coor(x, y));
        return true;
    }
    return false;
}

function noPiece(x, y) {
    for (var p in players) {
        if (players[p].pieces.findIndex(i => findCoor(i.pos, x, y)) > -1) {
            return false;
        }
    }
    return true;
}

function tileCheck(x, y) {
    if (x < 8 && x > -1 && y < 8 && y > -1 && players[turn % 2].pieces.findIndex(i => findCoor(i.pos, x, y)) == -1) {
        if (players[(turn + 1) % 2].pieces.findIndex(i => findCoor(i.pos, x, y)) == -1) {
            moveTile.push(new coor(x, y));
            return true;
        } else {
            captureTile.push(new coor(x, y));
        }
    }
    return false;
}

function lineCheck(x, y, xM, yM) {
    var temp = true;
    for (var i = 1; temp; i++) {
        temp = tileCheck(x + (xM * i), y + (yM * i));
    }
}

function royalCheck(x, y, r, p) {
    for (var i = -1; i < 2; i += 2) {
        royalExend(x, y, r, i, p);
        if (r == 0) {
            royalExend(x, y, i, r, p);
            royalCheck(x, y, i, p);
        }
    }
}

function royalExend(x, y, xM, yM, p) {
    if (p) {
        lineCheck(x, y, xM, yM);
    } else {
        tileCheck(x + xM, y + yM);
    }
}

//animations
function movePiece() {
    ctx.drawImage(backup1, 0, 0);
    const now = new Date - beginAnimation;
    if (now < 500) {
        if (capturePiece != undefined) {
            ctx.save();
            ctx.globalAlpha = (500 - now) / 500;
            capturePiece.drawPiece();
            ctx.restore();
        }
        const xm = ((mirror(xa) * grid) - (mirror(slct.pos.x) * grid)) / 500;
        const ym = ((mirror(ya) * grid) - (mirror(slct.pos.y) * grid)) / 500;
        ctx.drawImage(slct.asset, (mirror(slct.pos.x) * grid) + (xm * now), (mirror(slct.pos.y) * grid) + (ym * now));
        window.requestAnimationFrame(movePiece);
    } else {
        slct.pos = new coor(xa, ya);
        slct = undefined;
        drawGame();
        ctx2.drawImage(canvas, 0 ,0);
        turn++;
        drawGame();
        ctx3.drawImage(canvas, 0, 0);
        ctx.drawImage(backup1, 0, 0);
        beginAnimation = new Date();
        window.requestAnimationFrame(mirrorBoard);
    }
}

function mirrorBoard() {
    const now = new Date - beginAnimation;
    if (now < 500) {
        ctx.save();
        ctx.drawImage(backup1, 0, 0);
        ctx.globalAlpha = now / 500;
        ctx.drawImage(backup2, 0, 0);
        ctx.restore();
        window.requestAnimationFrame(mirrorBoard);
    } else {
        ctx.drawImage(backup2, 0, 0);
        noAni = true;
    }
}