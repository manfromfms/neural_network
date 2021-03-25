var canv = document.getElementById('canv');
var ctx = canv.getContext('2d');

var nums = [2, 7, 7, 7, 2];
var nn = new Neural(nums, 0.075, true, 1);

var blueArr = [];
var redArr = [];

var layers = nums.length - 1;

canv.addEventListener('mouseup', (event) => {
    var check = document.getElementById('color').checked;
    if (check) {
        blueArr.push({
            'x': event.pageX - 8,
            'y': event.pageY - 8
        });
    } else {
        redArr.push({
            'x': event.pageX - 8,
            'y': event.pageY - 8
        });
    }
});

setInterval(function () {
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {

            nn.setValue(0, 0, x / 50);
            nn.setValue(0, 1, y / 50);

            nn.forWards();

            ctx.lineWidth = 0;

            ctx.fillStyle = 'rgb(' + (nn.getValue()[layers][0] * 200) + ', 0 , ' + (nn.getValue()[layers][1] * 200) + ')';
            ctx.fillRect(x * 10, y * 10, 10, 10);
        }
    }

    ctx.lineWidth = 1;

    for (let i = 0; i < blueArr.length; i++) {
        ctx.fillStyle = 'rgb(0,0,255)';
        ctx.fillRect(blueArr[i].x, blueArr[i].y, 3, 3);

        nn.setValue(0, 0, blueArr[i].x / 500);
        nn.setValue(0, 1, blueArr[i].y / 500);

        nn.forWards();

        nn.setError(layers, 0, 0 - nn.getValue()[layers][0]);
        nn.setError(layers, 1, 1 - nn.getValue()[layers][1]);

        nn.findError();
        nn.backWards();
    }

    for (let i = 0; i < redArr.length; i++) {
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillRect(redArr[i].x, redArr[i].y, 3, 3);

        nn.setValue(0, 0, redArr[i].x / 500);
        nn.setValue(0, 1, redArr[i].y / 500);

        nn.forWards();

        nn.setError(layers, 0, 1 - nn.getValue()[layers][0]);
        nn.setError(layers, 1, 0 - nn.getValue()[layers][1]);

        nn.findError();
        nn.backWards();
    }
}, 16);
