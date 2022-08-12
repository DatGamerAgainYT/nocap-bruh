const fs = require('fs')
const { registerFont, createCanvas, loadImage } = require('canvas');
const charlist = [
  'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E',
  'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i',
  'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N',
  'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r',
  'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W',
  'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '0', '1',
  '2', '3', '4', '5', '6', '7', '8', '9'
];
registerFont('node_modules/nocap-bruh/warp.ttf', { family: 'warp' });
const canvas = createCanvas(600, 200);
const ctx = canvas.getContext('2d');
	
function noise(limit, alpha) {
	if(!limit || limit > 255 || limit < 1) limit = 255;
	if(!alpha) alpha = .5;
		
    for (let i = 0; i < canvas.width; i++){
		for (j = 0; j < canvas.height; j++){
            r = Math.floor(Math.random() * limit);
            g = Math.floor(Math.random() * limit);
            b = Math.floor(Math.random() * limit);

			ctx.fillStyle = `rgba(${r}, ${b}, ${g}, ${alpha})`;
			ctx.fillRect(i, j, 1, 1);
        }
    }
}


exports.createCaptcha = function(format, callback) {
	if (!callback) return console.log('No callback was defined. Returning.');
	if (!format) format = 'image';
	
	let text = '';
	for (let i = 0; i < 5; i++){
		text += charlist[Math.floor(Math.random() * charlist.length)];
	}
	
	noise(255, 0.9);
	
    ctx.textAlign = "center";
    ctx.lineWidth = 3;
    ctx.font = '200px warp';
	
    for (let i = 0; i < text.length; i++){
		let tilt = Math.random() / 16;
		ctx.rotate(tilt);
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        ctx.fillText(text[i], 100 + i * 100 + Math.floor(Math.random() * 25), 2 * i + 180 - Math.floor(Math.random() * 5));
        ctx.strokeStyle = 'red';
		ctx.rotate(-tilt);
    }
	
	noise(50, 0.6);
	
	if (format.toLowerCase() === 'image' || format.toLowerCase() === 'buffer') {
		const out = fs.createWriteStream(__dirname + '/Captcha.png');
		const stream = canvas.createPNGStream();
		stream.pipe(out);
		out.on('finish', () =>  console.log('Captcha saved to: /Captcha.png'));
		const buffer = canvas.toBuffer("image/png");
		callback(buffer, text);
	}
	else if (format.toLowerCase() === 'base64'){
		callback(canvas.toDataURL(), text);
	}
	else {
		console.log('Format not recongnized.');
		console.log("Formats are: 'buffer', 'base64'.");
		console.log('\nYour code should look like this:\n');
		console.log("const noCap = require('nocap-bruh');\n");
		console.log("noCap.createCaptcha('buffer', function(image, text){");
		console.log("    // Do something with the buffer and text.");
		console.log("});");
	}
	
}