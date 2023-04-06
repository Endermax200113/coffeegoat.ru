//Анимация на 1 секции

function animateBlocksSec1() {
	let bH = parseFloat($(".sec1-blocks-line").css("height"));
	let dW = docWidth;
	let dH = docHeight;
	let tS = dW / bH;
	let tE = parseInt(tS) < tS ? parseInt(tS) + 1 : parseInt(tS);
	let speedLine = [];
	let animating = false;
	let lastResized = new Date();
	let speeds = [];

	preparate();
	setListenerResize();
	for (let i = 0; i < 3; i++) animate(i);

	function setListenerResize() {
		let setedCheck = false;

		$(window).on("resize", function(e) {
			let total = docHeight - dH;
			$("#test").html("" + (total) + " " + (total > -120) + " " + (total < 120));

			if (dW == docWidth && total > -120 && total < 120) {
				return;
			}

			lastResized = new Date();
			bH = parseFloat($(".sec1-blocks-line").css("height"));
			dW = docWidth;
			dH = docHeight;
			tS = dW / bH;
			tE = parseInt(tS) < tS ? parseInt(tS) + 1 : parseInt(tS);

			$(".sec1-blocks-line").each(function(i1, el1) {
				let count = 0;

				$(".sec1-blocks-line").eq(i1).find(".block").each(function(i2, el2) {
					if (count <= tE) count++;
					else $(".sec1-blocks-line").eq(i1).find(".block").eq(i2).remove();
				});

				while (count <= tE) {
					count++;
					addRandBlock(i1);
				}
			});

			if (animating) {
				$(".sec1-blocks-line").each(function(i, el) {
					$(".sec1-blocks-line").eq(i).find(".block").eq(0).stop();
					$(".sec1-blocks-line").eq(i).find(".block").eq(0).animate({
						"margin-left": "0vh"
					}, 500);
				});

				animating = false;
			}

			checkAnimate();
		});

		function checkAnimate() {
			if (!setedCheck) {
				setedCheck = true;

				setTimeout(function() {
					setedCheck = false;

					let date = new Date();
					let time1 = date.getTime();
					let time2 = lastResized.getTime();
					let totalTime = time1 - time2;

					if (totalTime < 3000) {
						checkAnimate();
						return;
					}

					for (let i = 0; i < 3; i++) animate(i);
					animating = true;
				}, 5000);
			}
		}
	}

	function preparate() {
		if (isURLHost("localhost:3000")) kv.animationSec1.setLimit(5, 7, 4);

		for (let i = 0; i < 3; i++) {
			let folder = "/img/sec1/line" + (i + 1) + "/";

			for (let j = 0; j < kv.animationSec1.reserveImgs.limit[i]; j++) {
				let img = folder + (j + 1) + ".jpg";

				kv.animationSec1.reserveImgs[i].push(img);
			}
		}
		
		for (let i = 0; speeds.length < 3; i++) {
			let lSSe = kv.animationSec1.getRandInt(4, 8);
			if (i == 0) speeds.push(lSSe);
			else if (i == 1) {
				if (speeds[i - 1] == lSSe) lSSe--;
				speeds.push(lSSe);
			} else if (i == 2) {
				if (speeds[i - 1] == lSSe) lSSe += 2;
				else if (speeds[i - 2] == lSSe) lSSe += 3;
				speeds.push(lSSe);
			}
		}

		$(".sec1-blocks-line").each(function(i1, el1) {
			let count = 0;
			speedLine[i1] = speeds[i1];

			$(".sec1-blocks-line").eq(i1).find(".block").each(function(i2, el2) {
				if (count <= tE) count++;
				else $(".sec1-blocks-line").eq(i1).find(".block").eq(i2).remove();
			});

			do {
				count++;
				addRandBlock(i1);
			} while (count <= tE);
		});
	}

	function animate(line) {
		$(".sec1-blocks-line").eq(line).find(".block").eq(0).animate({
			"margin-left": "-33.3333vh"
		}, speedLine[line] * 1000, "linear", function() {
			$(".sec1-blocks-line").eq(line).find(".block").eq(0).remove();
			addRandBlock(line);
			animate(line);
		});

		animating = true;
	}

	function addRandBlock(line) {
		let num = kv.animationSec1.getRandInt(0, kv.animationSec1.reserveImgs[line].length);
		let link = kv.animationSec1.reserveImgs[line][num];

		kv.animationSec1.addBlock($(".sec1-blocks-line").eq(line), link);
	}
}

