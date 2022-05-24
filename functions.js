"use strict"
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const canvasx = canvas.offsetLeft;
const canvasy = canvas.offsetTop;
const aniLength = 750;
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
let turn = 0;
let slct;
let msPlc;
let moveTile = [];
let captureTile = [];
let enPassantTile = [];
let beginAnimation;
let xa;
let ya;
let capturePiece;
let noRotate = true;
let noAni = true;
let promotion;
let backup1;
let ctx2;
let backup2;
let ctx3;
let board;

//autoplay
window.onload = function() {
    scaling();
    drawAssets();
    buildPlayers();
};

menu.appendChild(createButton("Reset", () => buildPlayers()));
menu.appendChild(createSwitch("Board rotation", "rotation", () => rotation()));

//scaling
function scaling() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const test = Math.min(vw - 60, vh - 80);
    grid = test / 8;
    canvas.width = grid * 8;
    canvas.height = canvas.width;
}

window.onresize = rescaling;

function rescaling() {
    scaling();
    drawAssets();
    players.forEach(function (item, i) {
        item.pieces.forEach(function (item2) {
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

function fillshape(tmpCtx, colour, outline) {
    tmpCtx.closePath();
    tmpCtx.strokeStyle = outline;
    tmpCtx.lineWidth = scalePoint(6);
    tmpCtx.lineCap = "round";
    tmpCtx.lineJoin = "round";
    tmpCtx.stroke();
    tmpCtx.fillStyle = colour;
    tmpCtx.fill();
    tmpCtx.lineWidth = scalePoint(1);
}

function drawAssets() {
    backup1 = createCanvas(canvas.width, canvas.width);
    ctx2 = backup1.getContext("2d");
    backup2 = createCanvas(canvas.width, canvas.width);
    ctx3 = backup2.getContext("2d");
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
    kingAsset[0] = drawKing("#fff", "#000");
    kingAsset[1] = drawKing("#000", "#fff");
    pawnAsset[0] = drawPawn("#fff", "#000");
    pawnAsset[1] = drawPawn("#000", "#fff");
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
        for (let i = -1; i < 2; i += 2) {
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
        for (let i = -1; i < 2; i += 2) {
            for (let i2 = -1; i2 < 2; i2 += 2) {
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
        for (let i = -1; i < 2; i += 2) {
            for (let i2 = -2; i2 < 3; i2 += 4) {
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
        this.enPassant = -1;
    }
    move() {
        if (freeTile(this.pos.x, this.pos.y + this.frwrd) && (this.pos.y - this.frwrd == 0 || this.pos.y - this.frwrd == 7)) {
            freeTile(this.pos.x, this.pos.y + (this.frwrd * 2));
        }
        for (let i = -1; i < 2; i += 2) {
            if (players[(turn + 1) % 2].pieces.findIndex(item => findCoor(item.pos, this.pos.x + i, this.pos.y + this.frwrd)) > -1) {
                captureTile.push(new coor(this.pos.x + i, this.pos.y + this.frwrd));
            }
            let temp = players[(turn + 1) % 2].pieces.find(item => findCoor(item.pos, this.pos.x + i, this.pos.y));
            if (temp != undefined && temp.name == "pawn" && temp.enPassant == turn) {
                enPassantTile.push(new coor(this.pos.x + i, this.pos.y + this.frwrd));
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
function buildPlayers() {
    players = [];
    turn = 0;
    while (players.length < 2) {
        const temp2 = players.length;
        const temp = new player(temp2 == 0 ? "White" : "Black");
        temp.pieces.push(new rook(new coor(0, 7 - 7 * temp2), rookAsset[temp2]));
        temp.pieces.push(new rook(new coor(7, 7 - 7 * temp2), rookAsset[temp2]));
        temp.pieces.push(new knight(new coor(1, 7 - 7 * temp2), knightAsset[temp2]));
        temp.pieces.push(new knight(new coor(6, 7 - 7 * temp2), knightAsset[temp2]));
        temp.pieces.push(new bishop(new coor(2, 7 - 7 * temp2), bishopAsset[temp2]));
        temp.pieces.push(new bishop(new coor(5, 7 - 7 * temp2), bishopAsset[temp2]));
        temp.pieces.push(new queen(new coor(3, 7 - 7 * temp2), queenAsset[temp2]));
        temp.pieces.push(new king(new coor(4, 7 - 7 * temp2), kingAsset[temp2]));
        for (let x = 0; x < 8; x++) {
            temp.pieces.push(new pawn(new coor(x, 6 - 5 * temp2), pawnAsset[temp2], -1 + 2 * temp2));
        }
        players.push(temp);
    }
    drawGame();
}

//draw game
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
    captureTile.forEach(drawX);
    enPassantTile.forEach(drawX);
    ctx.strokeStyle = "rgba(0, 255, 0, 0.7)";
    ctx.lineWidth = scalePoint(10);
    ctx.stroke();
}

function drawX(item) {
    ctx.moveTo((mirror(item.x) * grid) + (grid * 0.1), (mirror(item.y) * grid) + (grid * 0.1));
    ctx.lineTo((mirror(item.x) * grid) + (grid * 0.9), (mirror(item.y) * grid) + (grid * 0.9));
    ctx.moveTo((mirror(item.x) * grid) + (grid * 0.1), (mirror(item.y) * grid) + (grid * 0.9));
    ctx.lineTo((mirror(item.x) * grid) + (grid * 0.9), (mirror(item.y) * grid) + (grid * 0.1));
}

//misc functions

function findCoor(c, x, y) {
    return c.x == x && c.y == y;
}

function mirror(i) {
    if (noRotate || turn % 2 == 0) {
        return i;
    }
    return 7 - i;
}

function rotation() {
    noRotate = !document.getElementById("rotation").checked;
    drawGame();
}

//input
document.querySelector("body").addEventListener("click", function (e) {
    if (noAni) {
        const y = mirror(Math.floor((e.clientY - canvasy) / grid));
        const x = mirror(Math.floor((e.clientX - canvasx) / grid));
        if (slct != undefined && players[turn % 2].pieces.findIndex(i => findCoor(i.pos, x, y)) == -1) {
            if (moveTile.findIndex(i => findCoor(i, x, y)) > -1 || captureTile.findIndex(i => findCoor(i, x, y)) > -1 || enPassantTile.findIndex(i => findCoor(i, x, y)) > -1) {
                noAni = false;
                msPlc = undefined;
                let capture;
                if (enPassantTile.findIndex(i => findCoor(i, x, y)) > -1) {
                    capture = players[(turn + 1) % 2].pieces.findIndex(i => findCoor(i.pos, x, y - slct.frwrd));
                } else {
                    capture = players[(turn + 1) % 2].pieces.findIndex(i => findCoor(i.pos, x, y));
                }
                if (capture > -1) {
                    capturePiece = players[(turn + 1) % 2].pieces.splice(capture, 1)[0];
                } else {
                    capturePiece = undefined;
                    if (slct.name == "pawn" && moveTile.findIndex(c => findCoor(c, x, y)) == 1) {
                        slct.enPassant = turn + 1;
                    }
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
                if (capturePiece != undefined) {
                    capturePiece.drawPiece();
                }
                if (slct.name == "pawn" && (y == 0 || y == 7)) {
                    promoteInfo(x, y);
                } else {
                    postAnimation(x, y);
                }
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

function postAnimation(x, y) {
    beginAnimation = new Date();
    xa = x;
    ya = y;
    window.requestAnimationFrame(movePiece);
    clearMoveSet();
}

function promotePawn(x, y) {
    const select = document.getElementById("infoSelect").value;
    switch (select) {
        case "Queen":
            promotion = new queen(new coor(x, y), queenAsset[turn % 2]);
            break;
        case "Knight":
            promotion = new knight(new coor(x, y), knightAsset[turn % 2]);
            break;
        case "Rook":
            promotion = new rook(new coor(x, y), rookAsset[turn % 2]);
            break;
        case "Bishop":
            promotion = new bishop(new coor(x, y), bishopAsset[turn % 2]);
    }
    document.getElementById("dark").remove();
    postAnimation(x, y);
}

document.querySelector("body").addEventListener("mousemove", function (e) {
    if (noAni) {
        const y = mirror(Math.floor((e.clientY - canvasy) / grid));
        const x = mirror(Math.floor((e.clientX - canvasx) / grid));
        if (players[turn % 2].pieces.findIndex(i => findCoor(i.pos, x, y)) > -1 || moveTile.findIndex(i => findCoor(i, x, y)) > -1 || captureTile.findIndex(i => findCoor(i, x, y)) > -1 || enPassantTile.findIndex(i => findCoor(i, x, y)) > -1) {
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
    enPassantTile = [];
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
    for (let p in players) {
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
    let temp = true;
    for (let i = 1; temp; i++) {
        temp = tileCheck(x + (xM * i), y + (yM * i));
    }
}

function royalCheck(x, y, r, p) {
    for (let i = -1; i < 2; i += 2) {
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
    if (now < aniLength) {
        const appearing = now / aniLength;
        if (capturePiece != undefined) {
            ctx.globalAlpha = 1 - appearing;
            capturePiece.drawPiece();
        }
        const xm = ((mirror(xa) * grid) - (mirror(slct.pos.x) * grid)) / aniLength;
        const ym = ((mirror(ya) * grid) - (mirror(slct.pos.y) * grid)) / aniLength;
        if (promotion == undefined) {
            ctx.globalAlpha = 1;
        } else if (capturePiece == undefined) {
            ctx.globalAlpha = 1 - appearing;
        }
        ctx.drawImage(slct.asset, movement(slct.pos.x, xm, now), movement(slct.pos.y, ym, now));
        if (promotion != undefined) {
            ctx.globalAlpha = appearing;
            ctx.drawImage(promotion.asset, movement(slct.pos.x, xm, now), movement(slct.pos.y, ym, now));
        }
        window.requestAnimationFrame(movePiece);
    } else {
        if (promotion == undefined) {
            slct.pos = new coor(xa, ya);
        } else {
            const temp = players[turn % 2].pieces.findIndex(i => findCoor(slct.pos, i.pos.x, i.pos.y));
            players[turn % 2].pieces.splice(temp, 1);
            players[turn % 2].pieces.push(promotion);
            promotion = undefined;
        }
        slct = undefined;
        drawGame();
        turn++;
        if (noRotate) {
            noAni = true;
        } else {
            ctx2.drawImage(canvas, 0, 0);
            drawGame();
            ctx3.drawImage(canvas, 0, 0);
            ctx.drawImage(backup1, 0, 0);
            beginAnimation = new Date();
            window.requestAnimationFrame(mirrorBoard);
        }
    }
}

function movement(l, m, t) {
    return mirror(l) * grid + m * t;
}

function mirrorBoard() {
    const now = new Date - beginAnimation;
    if (now < aniLength) {
        ctx.save();
        ctx.drawImage(backup2, 0, 0);
        ctx.globalAlpha = (aniLength - now) / aniLength;
        ctx.drawImage(backup1, 0, 0);
        ctx.restore();
        window.requestAnimationFrame(mirrorBoard);
    } else {
        ctx.drawImage(backup2, 0, 0);
        noAni = true;
    }
}

//templating
function createInfo(content, onClicked) {
    const info = document.createElement("div");
    info.setAttribute("id", "info");
    info.appendChild(content);
    info.appendChild(createButton("Cancel", () => document.getElementById("dark").remove()));
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
    const promotionOptions = ["Queen", "Knight", "Rook", "Bishop"];
    const temp = document.createElement("select");
    temp.setAttribute("id", "infoSelect");
    promotionOptions.forEach(function (item) {
        temp.appendChild(new Option(item));
    });
    const temp2 = document.createElement("div");
    temp2.appendChild(temp);
    document.body.appendChild(createInfo(temp2, () => promotePawn(x, y)));
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

function createSwitch(text, id, onClicked) {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(text + ":"));
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", id);
    if (onClicked != undefined) {
        input.addEventListener("change", onClicked);
    }
    const span = document.createElement("span");
    span.setAttribute("class", "slider");
    const label = document.createElement("label");
    label.setAttribute("class", "switch");
    label.appendChild(input);
    label.appendChild(span);
    const div = document.createElement("div");
    div.setAttribute("class", "switchDiv");
    div.appendChild(p);
    div.appendChild(label);
    return div;
}