/*  GenuineJS Copyright
 *  
 *  GenuineJS is a light-weight particle library made by Rohan Kanhaisingh.
 *  Please, do not abuse my work. I spent alot of time in it and I really enjoy making this!
 *  
 *  
 *  Enjoy GenuineJS,
 *  
 *  Rohan Kanhaisingh, GenuineJS
*/

/*
 * Whats new in 1.3.3
 * 
 *  - I fixed resizing on fullsize attribute. 
 *  - I fixed errors on missing properties.
 *  - Movespeed properties now works without any bugs.
*/

// GenuineJS 1.3.3

var canvas = document.getElementById("canvas-genuinejs");
if (canvas !== null) {

}
if (canvas.getAttribute("fullsize") == 'true') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
    }, true);
}

var ctx = canvas.getContext("2d");

var ctx_genuine_ar = [];
var ctx_genuine_trail = [];
var ctx_genuine_con = [];
var ctx_genuine_expl = [];
var m = {
    x: undefined,
    y: undefined
}
var moveX;
var moveY;

canvas.mouseDown = {
    BtnRight: false,
    BtnMid: false,
    BtnLeft: false
};

var keyPressed = undefined;

canvas.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    return false;
});
canvas.onmousedown = function (event) {
    if (event.which == 1) {
        canvas.mouseDown.BtnLeft = true;
    }
    if (event.which == 2) {
        canvas.mouseDown.BtnMid = true;
    }
    if (event.which == 3) {
        canvas.mouseDown.BtnRight = true;
    }
    keyPressed = event.which;
}

canvas.onmouseup = function () {
    canvas.mouseDown = {
        BtnRight: false,
        BtnMid: false,
        BtnLeft: false
    }
    keyPressed = undefined;
    m.x = undefined;
    m.y = undefined;
}

canvas.ontouchstart = function (event) {
    keyPressed = 'touch';
    m.x = event.touches[0].clientX;
    m.y = event.touches[0].clientY;
}

canvas.ontouchmove = function (event) {
    keyPressed = 'touch';
    m.x = event.touches[0].clientX;
    m.y = event.touches[0].clientY;
}

canvas.ontouchend = function () {
    canvas.mouseDown = {
        BtnRight: false,
        BtnMid: false,
        BtnLeft: false
    }
    keyPressed = undefined;
    m.x = undefined;
    m.y = undefined;
}

canvas.ontouchcancel = function () {
    canvas.mouseDown = {
        BtnRight: false,
        BtnMid: false,
        BtnLeft: false
    }
    keyPressed = undefined;
    m.x = undefined;
    m.y = undefined;
}

canvas.addEventListener("mousemove", function (event) {
    if (typeof $ !== 'undefined') {
        var docX = $(document).width();
        var docY = $(document).height();
        moveX = (event.pageX - docX / 2) / (docX / 2) * -1;
        moveY = (event.pageY - docY / 2) / (docY / 2) * -1;
    }
    m.x = event.offsetX;
    m.y = event.offsetY;
    // g.Selector(".debug-mouseposition").innerHTML = "MousePosition: (x: " + m.x + ", y: " + m.y + ")";
});

canvas.addEventListener("mouseout", function (event) {
    m.x = undefined;
    m.y = undefined;
    keyPressed = undefined;
});

class Pop {
    constructor(x, y, obj) {
        this.x;
        this.y;
        this.object = obj;
        this.radius = obj['Radius'];
        this.id = Math.floor(Math.random() * 2000);
        this.color;
        this.Image = {
            IsActive: false,
            Source: undefined,
        }
        this.ImageSprite;
        this.lastPosition = {
            x: undefined,
            y: undefined
        }
        this.Connect = {
            IsActive: false,
            Radius: undefined,
            Color: undefined,
            Width: undefined
        };
        this.Gravity = {
            IsActive: false,
            Bounce: false,
            Force: undefined
        }
        if (typeof obj['Spawn'] !== 'undefined') {
            if (typeof x !== 'object' && typeof y !== 'object') {
                var a = obj['Spawn'];
                if (a == 'random') {
                    this.x = Math.floor(Math.random() * canvas.width);
                    this.y = Math.floor(Math.random() * canvas.height);
                }
                if (a == 'center') {
                    this.x = canvas.width / 2 - this.radius;
                    this.y = canvas.height / 2 - this.radius;
                }
            }
        }
        if (typeof obj['Spawn'] == 'undefined') {
            this.x = Math.floor(Math.random() * canvas.width);
            this.y = Math.floor(Math.random() * canvas.height);
        }
        if (x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        }
        this.gravityAmp = 5;
        this.magneticEffect = obj['MagneticEffect'];
        this.happiness = 0;
        this.mateSpeed = 0.10;
        this.bounceToOthers = obj['BounceToOthers'];
        this.moveSpeedX = obj['MoveSpeed'];
        this.moveSpeedY = obj['MoveSpeed'];
        this.default = {
            Radius: obj['Radius'],
            MoveSpeed: obj['MoveSpeed'],
            Color: obj['Color']
        }
        this.SuperDefaultMovespeed = obj['MoveSpeed'];
        this.moveSelector = Math.floor(Math.random() * 3);
        this.Trail = {
            IsActive: false,
            Radius: undefined,
            Color: undefined,
            Length: undefined
        }
        this.Effects = obj['Effects'];
        this.MouseEvent = obj['MouseEvent'];
        this.HitCorners = {
            IsActive: false,
            Destroy: false,
            Explode: {
                IsActive: false,
                Force: undefined,
                Speed: undefined,
                Color: undefined
            }
        }
        this.MouseEventProperties = {
            MouseRadius: 0,
            Events: {
                Hover: {
                    IsActive: false,
                    Radius: undefined,
                    Color: undefined,
                    MoveSpeed: undefined,
                    PopSpeed: undefined,
                    MoveToMouseDirection: {
                        IsActive: false,
                        Speed: undefined
                    },
                    PushFromMouseDirection: {
                        IsActive: false,
                        Speed: undefined
                    },
                    Connect: {
                        IsActive: false,
                        Width: undefined,
                        Color: undefined
                    }
                },
                MouseDown: {
                    Button: undefined,
                    IsActive: false,
                    Radius: undefined,
                    Color: undefined,
                    MoveSpeed: undefined,
                    PopSpeed: undefined,
                    MoveToMouseDirection: {
                        IsActive: false,
                        Speed: undefined
                    },
                    PushFromMouseDirection: {
                        IsActive: false,
                        Speed: undefined
                    },
                    Connect: {
                        IsActive: false,
                        Width: undefined,
                        Color: 'transparent'
                    },
                    Summon: {
                        IsActive: false,
                        UseDefaultProperties: false,
                        UseMousePosition: false,
                        Amount: undefined
                    }
                }
            }
        };

        if (obj['Color'] !== 'random') {
            this.color = obj['Color'];
        } else {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            this.color = 'rgb(' + r + ' , ' + g + ' , ' + b + ')';
        }
        if (typeof obj['Effects'] !== 'undefined') {
            if (typeof obj['Effects']['Connect'] !== 'undefined') {
                for (var a in obj['Effects']['Connect']) {
                    this.Connect[a] = obj['Effects']['Connect'][a];
                }
            }
            if (typeof obj['Effects']['Trail'] !== 'undefined') {
                for (var a in obj['Effects']['Trail']) {
                    this.Trail[a] = obj['Effects']['Trail'][a];
                }
            }
            if (typeof obj['Effects']['Gravity'] !== 'undefined') {
                for (var a in obj['Effects']['Gravity']) {
                    this.Gravity[a] = obj['Effects']['Gravity'][a];
                }
            }
            if (typeof obj['Effects']['HitCorners'] !== 'undefined') {
                for (var a in obj['Effects']['HitCorners']) {
                    this.HitCorners[a] = obj['Effects']['HitCorners'][a];
                }
            }
        }
        if (typeof obj['Image'] !== "undefined") {
            for (a in obj['Image']) {
                this.Image[a] = obj['Image'][a];
            }

            this.ImageSprite = document.createElement("img");
            this.ImageSprite.src = this.Image.Source;
        }
        if (typeof obj['MouseEvent'] !== 'undefined') {
            for (var a in this.MouseEvent) {
                if (a == 'Settings') {
                    this.MouseEventProperties.MouseRadius = this.MouseEvent[a]['Radius'];
                }
                if (a == 'Hover') {
                    for (var b in this.MouseEvent['Hover']) {
                        this.MouseEventProperties.Events.Hover[b] = this.MouseEvent['Hover'][b];
                    }
                }
                if (a == 'MouseDown') {
                    for (var b in this.MouseEvent['MouseDown']) {
                        this.MouseEventProperties.Events.MouseDown[b] = this.MouseEvent['MouseDown'][b];
                    }
                }
            }
        } else {
            this.MouseEventProperties = undefined;
            this.MouseEvent = undefined;
        }

        if (this.moveSelector == 0) {
            this.moveSpeedX = -this.default.MoveSpeed;
            this.moveSpeedY = this.default.MoveSpeed;
        }
        else if (this.moveSelector == 1) {
            this.moveSpeedX = -this.default.MoveSpeed;
            this.moveSpeedY = -this.default.MoveSpeed;
        }
        if (this.moveSelector == 2) {
            this.moveSpeedX = this.default.MoveSpeed;
            this.moveSpeedY = this.default.MoveSpeed;
        }
        else if (this.moveSelector == 3) {
            this.moveSpeedX = this.default.MoveSpeed;
            this.moveSpeedY = -this.default.MoveSpeed;
        }
    }
    draw() {
        ctx.beginPath();
        if (this.Image.IsActive == false || typeof this.Image == "undefined") {
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if (this.Image.IsActive == true) {
            ctx.drawImage(this.ImageSprite, this.x, this.y, this.radius, this.radius);
        }
        ctx.closePath();

        if (typeof this.MouseEventProperties !== "undefined") {
            if (typeof this.MouseEventProperties.Events !== "undefined") {
                if (typeof this.MouseEventProperties.Events.Hover !== 'undefined') {
                    if (this.MouseEventProperties.Events.Hover.IsActive == true) {
                        if (typeof this.MouseEventProperties.Events.Hover.Connect !== 'undefined') {
                            if (this.MouseEventProperties.Events.Hover.Connect.IsActive == true) {
                                if (this.x > m.x - this.MouseEventProperties.MouseRadius && this.x < m.x + this.MouseEventProperties.MouseRadius && this.y > m.y - this.MouseEventProperties.MouseRadius && this.y < m.y + this.MouseEventProperties.MouseRadius) {
                                    ctx.beginPath();
                                    ctx.moveTo(m.x, m.y);
                                    ctx.lineCap = 'round';
                                    ctx.lineTo(this.x, this.y);
                                    ctx.lineWidth = this.MouseEventProperties.Events.Hover.Connect.Width;
                                    ctx.strokeStyle = this.MouseEventProperties.Events.Hover.Connect.Color;
                                    ctx.stroke();
                                }
                            }
                        }
                    }
                }
                if (typeof this.MouseEventProperties.Events.MouseDown.Connect !== 'undefined') {
                    if (this.MouseEventProperties.Events.MouseDown.Connect.IsActive == true) {
                        if (this.x > m.x - this.MouseEventProperties.MouseRadius && this.x < m.x + this.MouseEventProperties.MouseRadius && this.y > m.y - this.MouseEventProperties.MouseRadius && this.y < m.y + this.MouseEventProperties.MouseRadius) {
                            if (keyPressed == this.MouseEvent.MouseDown.Button) {
                                ctx.beginPath();
                                ctx.moveTo(m.x, m.y);
                                ctx.lineCap = 'round';
                                ctx.lineTo(this.x, this.y);
                                ctx.lineWidth = this.MouseEventProperties.Events.MouseDown.Connect.Width
                                if (this.MouseEventProperties.Events.MouseDown.Connect.Color == 'random') {
                                    if (typeof Colors == 'object') {
                                        ctx.strokeStyle = Colors.RANDOM();
                                    }
                                }
                                else {
                                    ctx.strokeStyle = this.MouseEventProperties.Events.MouseDown.Connect.Color;
                                }
                                ctx.stroke();
                            }
                        }
                    }
                }
                if (typeof this.MouseEventProperties.Events.MouseDown.Summon !== 'undefined') {
                    if (this.MouseEventProperties.Events.MouseDown.Summon.IsActive == true) {
                        if (keyPressed == this.MouseEvent.MouseDown.Button) {
                            keyPressed = undefined;
                            for (var i = 0; i < this.MouseEventProperties.Events.MouseDown.Summon.Amount; i++) {
                                if (this.MouseEventProperties.Events.MouseDown.Summon.UseMousePosition == true) {
                                    if (this.MouseEventProperties.Events.MouseDown.Summon.UseDefaultProperties == true) {
                                        ctx_genuine_ar.push(new Pop(m.x, m.y, this.object));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        for (var i = 0; i < ctx_genuine_ar.length; i++) {
            if (typeof this.Connect !== 'undefined') {
                if (this.Connect.IsActive == true) {
                    if ((ctx_genuine_ar[i].x > this.x - this.Connect.Radius && ctx_genuine_ar[i].x < this.x + this.Connect.Radius) && (ctx_genuine_ar[i].y > this.y - this.Connect.Radius && ctx_genuine_ar[i].y < this.y + this.Connect.Radius)) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineCap = 'round';
                        ctx.lineTo(ctx_genuine_ar[i].x, ctx_genuine_ar[i].y);
                        ctx.lineWidth = this.Connect.Width;
                        ctx.strokeStyle = this.Connect.Color;
                        ctx.stroke();
                    }
                }
            }
        }
        for (var i = 0; i < ctx_genuine_ar.length; i++) {
            if (ctx_genuine_ar[i].id !== this.id) {
                if ((ctx_genuine_ar[i].x > this.x - this.radius - 1&& ctx_genuine_ar[i].x < this.x + this.radius + 1) && (ctx_genuine_ar[i].y > this.y - this.radius - 1 && ctx_genuine_ar[i].y < this.y + this.radius + 1)) {
                    if (this.bounceToOthers == true) {
                        var w = Math.floor(Math.random() * 4);
                        if (w == 0) {
                            this.moveSpeedX -= (this.default.MoveSpeed / 5);
                            this.moveSpeedY -= (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedX -= (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedY -= (this.default.MoveSpeed / 5);
                        }
                        else if (w == 1) {
                            this.moveSpeedX += (this.default.MoveSpeed / 5);
                            this.moveSpeedY += (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedX += (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedY += (this.default.MoveSpeed / 5);
                        }
                        if (w == 2) {
                            this.moveSpeedX -= (this.default.MoveSpeed / 5);
                            this.moveSpeedY += (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedX += (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedY -= (this.default.MoveSpeed / 5);
                        }
                        else if (w == 3) {
                            this.moveSpeedX += (this.default.MoveSpeed / 5);
                            this.moveSpeedY -= (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedX -= (this.default.MoveSpeed / 5);
                            ctx_genuine_ar[i].moveSpeedY += (this.default.MoveSpeed / 5);
                        }
                    }
                }
            }
        }
    }
    update() {
        if (typeof this.MouseEventProperties !== 'undefined') {
            if (typeof this.MouseEvent['MouseDown'] !== 'undefined') {
                if ((m.x > this.x - (this.radius + this.MouseEventProperties.MouseRadius) && m.x < this.x + (this.radius + this.MouseEventProperties.MouseRadius)) && (m.y > this.y - (this.radius + this.MouseEventProperties.MouseRadius) && m.y < this.y + (this.radius + this.MouseEventProperties.MouseRadius))) {
                    if (keyPressed == this.MouseEvent.MouseDown.Button || keyPressed == 'touch') {
                        if (this.MouseEventProperties.Events.MouseDown.IsActive == true) {
                            // Radius
                            if (this.MouseEventProperties.Events.MouseDown.Radius !== undefined) {
                                if (this.MouseEventProperties.Events.MouseDown.Radius < this.radius) {
                                    this.radius -= 0.5;
                                    if (this.radius < this.MouseEventProperties.Events.MouseDown.Radius) {
                                       this.radius = 0;
                                    }
                                } else {
                                    if (this.MouseEventProperties.Events.MouseDown.PopSpeed !== undefined) {
                                        this.radius += this.MouseEventProperties.Events.MouseDown.PopSpeed;
                                        if (this.radius > this.MouseEventProperties.Events.MouseDown.Radius) {
                                            this.radius = this.MouseEventProperties.Events.MouseDown.Radius;
                                        }
                                    } else {
                                        this.radius += 0.5;
                                        if (this.radius > this.MouseEventProperties.Events.MouseDown.Radius) {
                                            this.radius = this.MouseEventProperties.Events.MouseDown.Radius;
                                        }
                                    }
                                }
                            }
                            // Color
                            if (this.MouseEventProperties.Events.MouseDown.Color !== undefined) {
                                this.color = this.MouseEventProperties.Events.MouseDown.Color;
                            }
                            // Movespeed
                            if (this.MouseEventProperties.Events.MouseDown.MoveSpeed !== undefined) {
                                this.default.MoveSpeed = this.MouseEventProperties.Events.MouseDown.MoveSpeed;
                            }
                            // MoveToMouseDirection
                            if (typeof this.MouseEventProperties.Events.MouseDown.MoveToMouseDirection !== 'undefined') {
                                if (this.MouseEventProperties.Events.MouseDown.MoveToMouseDirection.IsActive == true) {
                                    if (this.x > m.x) {
                                        this.moveSpeedX -= 0.3;
                                    }
                                    if (this.x < m.x) {
                                        this.moveSpeedX += 0.3;
                                    }
                                    if (this.y > m.y) {
                                        this.moveSpeedY -= 0.3;
                                        if (this.gravityAmp < 3) {
                                            this.gravityAmp += 0.1;
                                        }
                                    }
                                    if (this.y < m.y) {
                                        this.moveSpeedY += 0.3;
                                        if (this.gravityAmp < 3) {
                                            this.gravityAmp += 0.1;
                                        }
                                    }
                                    if (this.y > m.y - 5 && this.y < m.y + 5) {
                                        this.y = m.y;
                                    }
                                    if (this.x > m.x - 5 && this.x < m.x + 5) {
                                        this.x = m.x;
                                    }
                                }
                            }
                            // PushFromMouseDirection
                            if (typeof this.MouseEventProperties.Events.MouseDown.PushFromMouseDirection !== 'undefined') {
                                if (this.MouseEventProperties.Events.MouseDown.PushFromMouseDirection.IsActive == true) {
                                    // this.moveSpeedX -= moveX;
                                    // this.moveSpeedY += moveY;
                                    if (this.x > m.x) {
                                        this.moveSpeedX += 0.3;
                                    }
                                    if (this.x < m.x) {
                                        this.moveSpeedX -= 0.3;
                                    }
                                    if (this.y > m.y) {
                                        this.moveSpeedY += 0.3;
                                    }
                                    if (this.y < m.y) {
                                        this.moveSpeedY -= 0.3;
                                    }
                                }
                            }
                        }
                    } else {
                        if (this.MouseEventProperties.Events.MouseDown.IsActive == true) {
                            this.default.MoveSpeed = this.SuperDefaultMovespeed;
                            this.color = this.default.Color;
                            if (this.MouseEventProperties.Events.Hover.PopSpeed == undefined) {
                                this.radius -= 0.5;
                            }
                            if (this.MouseEventProperties.Events.Hover.PopSpeed !== undefined) {
                                this.radius -= this.MouseEventProperties.Events.Hover.PopSpeed;
                            }
                            if (this.radius < this.default.Radius) {
                                this.radius = this.default.Radius;
                            }
                        }
                    }
                }
            }
            if (typeof this.MouseEvent['Hover'] !== 'undefined') {
                if ((m.x > this.x - (this.radius + this.MouseEventProperties.MouseRadius) && m.x < this.x + (this.radius + this.MouseEventProperties.MouseRadius)) && (m.y > this.y - (this.radius + this.MouseEventProperties.MouseRadius) && m.y < this.y + (this.radius + this.MouseEventProperties.MouseRadius))) {
                    if (this.MouseEventProperties.Events.Hover.IsActive == true) {
                        // Radius
                        if (this.MouseEventProperties.Events.Hover.Radius !== undefined) {
                            if (this.MouseEventProperties.Events.Hover.Radius < this.radius) {
                                this.radius -= 0.5;
                                if (this.radius < this.MouseEventProperties.Events.Hover.Radius) {
                                    this.radius = 0;
                                }
                            } else {
                                if (this.MouseEventProperties.Events.Hover.PopSpeed !== undefined) {
                                    this.radius += this.MouseEventProperties.Events.Hover.PopSpeed;
                                    if (this.radius > this.MouseEventProperties.Events.Hover.Radius) {
                                        this.radius = this.MouseEventProperties.Events.Hover.Radius;
                                    }
                                } else {
                                    this.radius += 0.5;
                                    if (this.radius > this.MouseEventProperties.Events.Hover.Radius) {
                                        this.radius = this.MouseEventProperties.Events.Hover.Radius;
                                    }
                                }
                            }
                        }
                        // Color
                        if (this.MouseEventProperties.Events.Hover.Color !== undefined) {
                            this.color = this.MouseEventProperties.Events.Hover.Color;
                        }
                        // Movespeed
                        if (this.MouseEventProperties.Events.Hover.MoveSpeed !== undefined) {
                            this.default.MoveSpeed = this.MouseEventProperties.Events.Hover.MoveSpeed;
                        }
                        // MoveToMouseDirection
                        if (typeof this.MouseEventProperties.Events.Hover.MoveToMouseDirection !== 'undefined') {
                            if (this.MouseEventProperties.Events.Hover.MoveToMouseDirection.IsActive == true) {
                                if (this.x > m.x) {
                                    this.moveSpeedX -= 0.3;
                                }
                                if (this.x < m.x) {
                                    this.moveSpeedX += 0.3;
                                }
                                if (this.y > m.y) {
                                    this.moveSpeedY -= 0.3;
                                    if (this.gravityAmp < 3) {
                                        this.gravityAmp += 0.1;
                                    }
                                }
                                if (this.y < m.y) {
                                    this.moveSpeedY += 0.3;
                                    if (this.gravityAmp < 3) {
                                        this.gravityAmp += 0.1;
                                    }
                                }
                                if (this.y > m.y - 5 && this.y < m.y + 5) {
                                    this.y = m.y;
                                }
                                if (this.x > m.x - 5 && this.x < m.x + 5) {
                                    this.x = m.x;
                                }
                            }
                        }
                        // PushFromMouseDirection
                        if (typeof this.MouseEventProperties.Events.Hover.PushFromMouseDirection !== 'undefined') {
                            if (this.MouseEventProperties.Events.Hover.PushFromMouseDirection.IsActive == true) {
                                // this.moveSpeedX -= moveX;
                                // this.moveSpeedY += moveY;
								if (this.x > m.x) {
                                    this.moveSpeedX += 0.3;
                                }
                                if (this.x < m.x) {
                                    this.moveSpeedX -= 0.3;
                                }
                                if (this.y > m.y) {
                                    this.moveSpeedY += 0.3;
                                }
                                if (this.y < m.y) {
                                    this.moveSpeedY -= 0.3;
                                }
                            }
                        }
                    }
                } else {
                    if (this.MouseEventProperties.Events.Hover.IsActive == true) {
                        this.default.MoveSpeed = this.SuperDefaultMovespeed;
                        this.color = this.default.Color;
                        if (this.MouseEventProperties.Events.Hover.PopSpeed == undefined) {
                            this.radius -= 0.5;
                        } 
                        if (this.MouseEventProperties.Events.Hover.PopSpeed !== undefined) {
                            this.radius -= this.MouseEventProperties.Events.Hover.PopSpeed;
                        }
                        if (this.radius < this.default.Radius) {
                            this.radius = this.default.Radius;
                        }
                    }
                }
            }
        }
        if (typeof this.Effects !== 'undefined') {
            if (this.Effects['RandomMove'] == true) {
                this.x += this.moveSpeedX;
                this.y += this.moveSpeedY;

                // ctx_genuine_con.push(new Connect(this.x, this.y));
                if (this.x > canvas.width - this.radius) {
                    this.moveSpeedX = -this.default.MoveSpeed;
                    if (typeof this.Effects.HitCorners !== 'undefined') {
                        if (this.Effects.HitCorners.IsActive == true) {
                            if (this.Effects.HitCorners.Destroy == true) {
                                for (var i = 0; i < ctx_genuine_ar.length; i++) {
                                    if (ctx_genuine_ar[i].id == this.id) {
                                        ctx_genuine_ar.splice(i, 1);
                                    }
                                }
                            }
                            if (this.Effects.HitCorners.Explode.IsActive == true) {
                                for (var i = 0; i < 11; i++) {
                                    ctx_genuine_expl.push(new Explode(this.x, this.y, this.HitCorners.Explode.Force, this.HitCorners.Explode.Speed, this.HitCorners.Explode.Color));
                                }
                            }
                        }
                    }
                }
                if (this.y > canvas.height - this.radius) {
                    this.moveSpeedY = -this.default.MoveSpeed;
                    if (this.Gravity.IsActive == false) {
                        this.y = canvas.height - this.radius;
                    }
                    if (typeof this.Effects.HitCorners !== 'undefined') {
                        if (this.Effects.HitCorners.IsActive == true) {
                            if (this.Effects.HitCorners.Destroy == true) {
                                for (var i = 0; i < ctx_genuine_ar.length; i++) {
                                    if (ctx_genuine_ar[i].id == this.id) {
                                        ctx_genuine_ar.splice(i, 1);
                                    }
                                }
                            }
                            if (this.Effects.HitCorners.Explode.IsActive == true) {
                                for (var i = 0; i < 11; i++) {
                                    ctx_genuine_expl.push(new Explode(this.x, this.y, this.HitCorners.Explode.Force, this.HitCorners.Explode.Speed, this.HitCorners.Explode.Color));
                                }
                            }
                        }
                    }
                }
                if (this.x == 0 + this.radius || this.x < 1 + this.radius) {
                    this.moveSpeedX = this.default.MoveSpeed;
                    if (typeof this.Effects.HitCorners !== 'undefined') {
                        if (this.Effects.HitCorners.IsActive == true) {
                            if (this.Effects.HitCorners.Destroy == true) {
                                for (var i = 0; i < ctx_genuine_ar.length; i++) {
                                    if (ctx_genuine_ar[i].id == this.id) {
                                        ctx_genuine_ar.splice(i, 1);
                                    }
                                }
                            }
                            if (this.Effects.HitCorners.Explode.IsActive == true) {
                                for (var i = 0; i < 11; i++) {
                                    ctx_genuine_expl.push(new Explode(this.x, this.y, this.HitCorners.Explode.Force, this.HitCorners.Explode.Speed, this.HitCorners.Explode.Color));
                                }
                            }
                        }
                    }
                }
                if (this.y == 0 + this.radius || this.y < 1 + this.radius) {
                    this.moveSpeedY = this.default.MoveSpeed;
                    if (typeof this.Effects.HitCorners !== 'undefined') {
                        if (this.Effects.HitCorners.IsActive == true) {
                            if (this.Effects.HitCorners.Destroy == true) {
                                for (var i = 0; i < ctx_genuine_ar.length; i++) {
                                    if (ctx_genuine_ar[i].id == this.id) {
                                        ctx_genuine_ar.splice(i, 1);
                                    }
                                }
                            }
                            if (this.Effects.HitCorners.Explode.IsActive == true) {
                                for (var i = 0; i < 11; i++) {
                                    ctx_genuine_expl.push(new Explode(this.x, this.y, this.HitCorners.Explode.Force, this.HitCorners.Explode.Speed, this.HitCorners.Explode.Color));
                                }
                            }
                        }
                    }
                }
                if (typeof this.magneticEffect !== 'undefined') {
                    if (this.magneticEffect == true) {
                        for (var i = 0; i < ctx_genuine_ar.length; i++) {
                            if (ctx_genuine_ar[i].id !== this.id) {
                                if (ctx_genuine_ar[i].x > this.x - (canvas.width + canvas.height) / 2 && ctx_genuine_ar[i].x < this.x + (canvas.width + canvas.height) / 2 && ctx_genuine_ar[i].y > this.y - (canvas.width + canvas.height) / 2 && ctx_genuine_ar[i].y < this.y + (canvas.width + canvas.height) / 2) {
                                    if (this.x > ctx_genuine_ar[i].x) {
                                        this.moveSpeedX -= this.default.MoveSpeed / 25;
                                    }
                                    if (this.x < ctx_genuine_ar[i].x) {
                                        this.moveSpeedX += this.default.MoveSpeed / 25;
                                    }
                                    if (this.y > ctx_genuine_ar[i].y) {
                                        this.moveSpeedY -= this.default.MoveSpeed / 25;
                                    }
                                    if (this.y < ctx_genuine_ar[i].y) {
                                        this.moveSpeedY += this.default.MoveSpeed / 25;
                                    }
                                } 
                            }
                        }
                    }
                }
            }
            if (this.Effects['IsRain'] == true) {
                this.y += this.moveSpeedY;
                if (this.y > canvas.height - this.radius) {
                    this.y = 0;
                }
                if (this.y < 0) {
                    this.y = canvas.height - this.radius;
                }
            }
            if (this.Effects.Trail.IsActive == true) {
                if (this.Image.IsActive == false || typeof this.Image == "undefined") {
                    ctx_genuine_trail.push(new Trail(this.x, this.y, this.Trail.Radius, this.Trail.Length, this.Trail.Color));
                } else {
                    ctx_genuine_trail.push(new Trail(this.x + this.radius / 2, this.y + this.radius / 2, this.Trail.Radius, this.Trail.Length, this.Trail.Color));
                }
            }
            if (this.Gravity.IsActive == true) {
                this.y += this.moveSpeedY;
                this.x += this.moveSpeedX;
                if (this.x < 0 + this.radius) {
                    this.moveSpeedX = this.default.MoveSpeed;
                    if (typeof this.Effects.HitCorners !== 'undefined') {
                        if (this.Effects.HitCorners.IsActive == true) {
                            if (this.Effects.HitCorners.Explode.IsActive == true) {
                                for (var i = 0; i < 11; i++) {
                                    ctx_genuine_expl.push(new Explode(this.x, this.y, this.HitCorners.Explode.Force, this.HitCorners.Explode.Speed, this.HitCorners.Explode.Color));
                                }
                            }
                        }
                    }
                }
                else if (this.x > canvas.width - this.radius) {
                    this.moveSpeedX = -this.default.MoveSpeed;
                    if (typeof this.Effects.HitCorners !== 'undefined') {
                        if (this.Effects.HitCorners.IsActive == true) {
                            if (this.Effects.HitCorners.Explode.IsActive == true) {
                                for (var i = 0; i < 11; i++) {
                                    ctx_genuine_expl.push(new Explode(this.x, this.y, this.HitCorners.Explode.Force, this.HitCorners.Explode.Speed, this.HitCorners.Explode.Color));
                                }
                            }
                        }
                    }
                }

                if (this.y > canvas.height - this.radius) {
                    // this.y = canvas.height - this.radius;
                    if (this.Gravity.Bounce == true) {
                        if (this.gravityAmp > 0 && this.y < canvas.height + this.radius) {
                            this.gravityAmp -= 0.1;
                            this.moveSpeedY -= this.gravityAmp;
                        } else {
                            this.gravityAmp = 0;
                            this.y = canvas.height - this.radius;
                        }
                    } else {
                        this.moveSpeedY -= 0;
                        this.y = canvas.height - this.radius;
                    }
                }
                else if (this.y < canvas.height - this.radius) {
                    this.moveSpeedY += this.Gravity.Force;
                }
            }
        }

        this.draw();
    }
}

class Explode {
    constructor(x, y, force, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = force;
        this.color = color;
        this.speed = speed;
        this.moveY;
        this.moveX;

        if (this.x > canvas.width - 10) {
            this.moveY = -Math.random() * (1 - -4.1) + 1;
            this.moveX = Math.random() * (5 - 0.01) + 5;
        }
        if (this.x < 0 + 10) {
            this.moveY = -Math.random() * (1 - -4.1) + 1;
            this.moveX = -Math.random() * (-5 - 0.01) + -5;
        }
        if (this.y < 0 + 10) {
            this.moveY = -Math.random() * (1 - 4.1) + 1;
            this.moveX = Math.random() * (2 - -2.01) + -2;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
    update() {
        if (this.radius > 0.1) {
            // this.moveX += 0.01;
            this.moveY += 0.3;
            this.radius -= this.speed;
            this.x -= this.moveX;
            this.y += this.moveY;
        } else {
            delete this;
            ctx_genuine_expl.shift();
        }
        this.draw();
    }
}

class Connect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        for (var i = 0; i < ctx_genuine_ar.length; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(ctx_genuine_ar[i].x, ctx_genuine_ar[i].y);
            ctx.strokeStyle = '#1d1d1d';
            ctx.stroke();
            ctx.closePath();
        }
    }
    update() {

        this.draw();
    }
}

class Trail {
    constructor(x, y, radius, length, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.length = length;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.radius > 0 + this.length) {
            this.radius -= this.length;
        } else {
            ctx_genuine_trail.shift();
            delete this;
        }
        this.draw();
    }
}

var anim;

function update() {
    anim = window.requestAnimationFrame(update);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < ctx_genuine_ar.length; i++) {
        ctx_genuine_ar[i].update();
    }
    for (var i = 0; i < ctx_genuine_trail.length; i++) {
        ctx_genuine_trail[i].update();
    }
    for (var i = 0; i < ctx_genuine_con.length; i++) {
        ctx_genuine_con[i].update();
    }
    for (var i = 0; i < ctx_genuine_expl.length; i++) {
        ctx_genuine_expl[i].update();
    }
}

(function (a) {
    var a = a || window;
    a.Genuine = function (Obj) {
        var b, Obj;
        b = {
            Start: function (Amount){
                var Amount;
                for (var i = 0; i < Amount; i++) {
                    var random = {
                        x: Math.floor(Math.random() * canvas.width),
                        y: Math.floor(Math.random() * canvas.height)
                    };
                    ctx_genuine_ar.push(new Pop(undefined, undefined, Obj));
                }
                update();
            },
            Stop: function () {
                window.cancelAnimationFrame(anim);
                ctx_genuine_ar = [];
                ctx_genuine_trail = [];
                ctx_genuine_expl = [];
                ctx_genuine_con = [];
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            },
            Save: function (filename) {
                var filename;
                var a = new Blob([JSON.stringify(Obj)], { type: 'text/json' });
                var c = document.createElement("a");
                c.download = filename;
                c.href = window.URL.createObjectURL(a);
                c.onclick = function () {
                    this.remove();
                    delete this;
                }
                c.click();
            },
            Load: function (file, callback) {
                var file, callback;
                var a = new XMLHttpRequest();
                a.onreadystatechange = function () {
                    if (a.readyState == 4) {
                        if (a.status == 200) {
                            // Clear everything
                            window.cancelAnimationFrame(anim);
                            ctx_genuine_ar = [];
                            ctx_genuine_trail = [];
                            ctx_genuine_expl = [];
                            ctx_genuine_con = [];
                            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

                            var b = JSON.parse(a.responseText);
                            if (typeof b['Amount'] !== 'undefined') {
                                for (var i = 0; i < b['Amount']; i++) {
                                    var random = {
                                        x: Math.floor(Math.random() * canvas.width),
                                        y: Math.floor(Math.random() * canvas.height)
                                    };
                                    ctx_genuine_ar.push(new Pop(undefined, undefined, b));
                                }
                            } else {
                                var c = prompt("How many particles do you want to summon?");
                                for (var i = 0; i < parseFloat(c); i++) {
                                    var random = {
                                        x: Math.floor(Math.random() * canvas.width),
                                        y: Math.floor(Math.random() * canvas.height)
                                    };
                                    ctx_genuine_ar.push(new Pop(random.x, random.y, b));
                                }
                            }
                            update();
                        }
                    }
                };
                a.open("GET", file);
                a.send();
            }
        }
        return b;
    }
})(window);


function rgbconvert(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        all: 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')'
    } : null;
}