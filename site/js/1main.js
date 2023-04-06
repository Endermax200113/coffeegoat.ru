//Главный скрипт

var kv = {
	animationSec1: {
		addBlock: function(line, img) {
			line.append("<div class='block'><img src='" + img + "' alt=''></div>");
		},
		setLimit: function(line1, line2, line3) {
			kv.animationSec1.reserveImgs.limit[0] = line1;
			kv.animationSec1.reserveImgs.limit[1] = line2;
			kv.animationSec1.reserveImgs.limit[2] = line3;
		},
		getRandInt: function(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		},
		reserveImgs: {
			0: [],
			1: [],
			2: [],
			limit: {
				0: 0,
				1: 0,
				2: 0
			}
		}
	},
	menuSec3: {
		list: {
			0: {
				0: 0,
				1: 0,
				2: 0
			},
			1: {
				0: 0,
				1: 0,
				2: 0
			},
			2: {
				0: 0,
				1: 0,
				2: 0
			},
			3: {
				0: 0,
				1: 0,
				2: 0
			}
		},
		addDescription: function(line, block, li, pathImg, desc) {
			//Временно //
			pathImg = "/img/sec3-desc.png";
			desc = "Раф-кофе — популярный в России и странах бывшего СССР кофейный"
				+ " напиток появившийся в конце 1990-х годов. Готовится путём добавления"
				+ " нагретых паром сливок с небольшим количеством пены в одиночную порцию"
				+ " эспрессо. Основное отличие от латте — в использовании ванильного сахара"
				+ " и сливок вместо молока."
			//Временно //

			$(".sec3>.wrap>.blocks>.line").eq(line).find(".block").eq(block).find(".list>ul>li").eq(li).append(""
				+ "<div class='desc'>"
				+ "  <div class='pointer'></div>"
				+ "  "
				+ "  <div class='wrap'>"
				+ "    <div class='wrap'>"
				+ "      <img src='" + pathImg + "' alt=''>"
				+ "    </div>"
				+ "    "
				+ "    <article>" + desc + "</article>"
				+ "  </div>"
				+ "</div>"
			);
		},
		addItem: function(line, block, num, name, price, pathImg, desc) {
			$(".sec3>.wrap>.blocks>.line").eq(line).find(".block").eq(block).find(".list>ul").append(""
				+ "<li>"
				+ "  <span class='title'>" + name + "</span>"
				+ "  <span class='price'>" + price + " р</span>"
				+ "  "
				+ "  <div class='desc'>"
				+ "    <div class='pointer'></div>"
				+ "    "
				+ "    <div class='wrap'>"
				+ "      <div class='wrap'>"
				+ "        <img src='" + pathImg + "' alt=''>"
				+ "      </div>"
				+ "      "
				+ "      <article>" + desc + "</article>"
				+ "    </div>"
				+ "  </div>"
				+ "</li>"
			)

			$(".sec3>.wrap>.blocks>.line").eq(line).find(".block").eq(block).find(".list>ul>li").eq(num).on("mousemove", function(e) {
				$(".sec3>.wrap>.blocks>.line").eq(line).find(".block").eq(block).find(".list>ul>li").eq(num).find(".desc").addClass("show");
			});

			$(".sec3>.wrap>.blocks>.line").eq(line).find(".block").eq(block).find(".list>ul>li").eq(num).on("mouseleave", function(e) {
				$(".sec3>.wrap>.blocks>.line").eq(line).find(".block").eq(block).find(".list>ul>li").eq(num).find(".desc").removeClass("show");
			})
		}
	},
	commentsSec2: {
		addComment: function(block, name, rate, comment) {
			$(".sec2-main-coms-line-block").eq(block).find(".sec2-main-coms-line-block-com").append(""
				+ "<article class='sec2-main-coms-line-block-com-user'>"
				+ "  <div class='sec2-main-coms-line-block-com-user-who'>"
				+ "    <span class='sec2-main-coms-line-block-com-user-who-name'>" + name + "</span>"
				+ "    <span class='sec2-main-coms-line-block-com-user-who-rate'>" + rate + "<span>/</span>5</span>"
				+ "  </div>"
				+ "  "
				+ "  <p>" + comment + "</p>"
				+ "</article>"
			);

			kv.commentsSec2[block].rates.push(rate);
			let sumRate = 0;
			for (let i = 0; i < kv.commentsSec2[block].rates.length; i++) sumRate += kv.commentsSec2[block].rates[i];
			let avg = (sumRate / kv.commentsSec2[block].rates.length).toFixed(1);

			$(".sec2-main-coms-line-block").eq(block).find(".sec2-main-coms-line-block-title>span").html("" + avg + "/5");
		},

		0: {
			title: "2gis",
			rate: 0,
			rates: []
		},
		1: {
			title: "Google",
			rate: 0,
			rates: []
		},
		2: {
			title: "Яндекс",
			rate: 0,
			rates: []
		},
		3: {
			title: "Zoon",
			rate: 0,
			rates: []
		},
		length: 4
	}
};

$(document).ready(() => {
	console.log("© КакВариант 2020-" + new Date().getFullYear());

	setLazyLoad();
	animateBlocksSec1();
	setBottomBlockSec1();
	setCallHeader();
	fillInComsSec2();
	fillInMenuSec3();
	fixBugToDescSec3();
	setAnimationToTitle();

	function setLazyLoad() {
		[].forEach.call(document.querySelectorAll("img[data-src"), function(img) {
			img.setAttribute("src", img.getAttribute("data-src"));

			img.onload = function() {
				img.removeAttribute("data-src");
			};
		});
	}

	function setAnimationToTitle() {
		setTimeout(function() {
			$(".h>.h-block>address").addClass("animate__animated");
			$(".h>.h-block>p").addClass("animate__animated");
		}, 1000);

		let showingSec1 = false;
		let showingSec2 = false;
		let showingSec3 = false;
		let showingSec4 = false;
		let showingFooter = false;
		let preparatedFooter = false;
		let txtFooter = [
			$(".f>blockquote>p").eq(0).html(),
			$(".f>blockquote>p").eq(1).html(),
			$(".f>blockquote>p").eq(2).html(),
			$(".f>blockquote>p").eq(3).html(),
		];

		$(window).on("scroll", setAnimateTitleSec1);
		$(window).on("scroll", setAnimateTitleSec2);
		$(window).on("scroll", setAnimateTitleSec3);
		$(window).on("scroll", setAnimateTitleSec4);
		$(window).on("scroll", setAnimateTextFooter);

		setAnimateTitleSec1();
		setAnimateTitleSec2();
		setAnimateTitleSec3();
		setAnimateTitleSec4();
		setAnimateTextFooter();

		function setAnimateTextFooter() {
			let hF = docHeight;
			let sTF = $(window).scrollTop();
			let sBF = docHeight + sTF;
			let pYF, pHF, pTF, pBF, showF, i;

			if (deviceSmall || deviceMobile) i = 0;
			else if (deviceTablet) i = 1;
			else if (deviceLaptop) i = 2;
			else i = 3;

			pYF = $(".f>blockquote>p").eq(i).offset().top;
			pHF = $(".f>blockquote>p").eq(i).height();
			tTF = pYF + pHF - sTF - (pHF / 2);
			tBF = sBF - pYF - (pHF / 2);
			showF = false;

			if (!preparatedFooter) preparate();

			function preparate() {
				preparatedFooter = true;
				let p = $(".f>blockquote>p");

				p.each(function(i1, el1) {
					let newTxt = "";
					let strArr = p.get(i1).innerHTML.split("<br>");
					
					for (let i2 = 0; i2 < strArr.length; i2++) {
						let str = strArr[i2];
						str = str.trim();

						if (str != "") {
							newTxt += "<div>";

							for (let i3 = 0; i3 < str.length; i3++) {
								newTxt += "<span>" + str[i3] + "</span>";
							}

							newTxt += "</div>";
						} else newTxt += "<br>";
					}

					el1.innerHTML = newTxt;
				});
			}

			if (tTF > 0 && tBF > 0 && !showingFooter) {
				showF = true;
				showingFooter = true;
				let time = 0;
				ended = false;
				let wW = docWidth;

				animateText();

				function animateText() {
					let p = $(".f>blockquote>p").eq(i);

					p.find("div").each(function(i1, el1) {
						p.find("div").eq(i1).find("span").each(function(i2, el2) {
							setTimeout(function() {
								animateLetter(i1, i2);
							}, time);

							time += 50;
						});
					});

					$(window).on("resize", function() {
						if (docWidth != wW) end(true);
					});

					function end(forcibly) {
						if (!forcibly) {
							setTimeout(end0, 2500);
						} else end0();

						function end0() {
							if (!ended) {
								$(".f>blockquote>p").eq(0).html(txtFooter[0]);
								$(".f>blockquote>p").eq(1).html(txtFooter[1]);
								$(".f>blockquote>p").eq(2).html(txtFooter[2]);
								$(".f>blockquote>p").eq(3).html(txtFooter[3]);
								ended = true;
							}
						}
					}

					function animateLetter(str1, let1) {
						if (p.find("div").eq(str1).length != 0) {
							if (p.find("div").eq(str1).find("span").eq(let1).length != 0) {
								p.find("div").eq(str1).find("span").eq(let1).addClass("animate__fadeIn");
								p.find("div").eq(str1).find("span").eq(let1).addClass("animate__animated");

								setTimeout(function() {									
									if (p.find("div").eq(str1).length == str1 - 1 && p.find("div").eq(str1).find("span").eq(let1).length == let1 - 1)
										end(false);
								}, 900);
							}
						}
					}
				}
			}
		}

		function setAnimateTitleSec4() {
			let h4 = docHeight;
			let sT4 = $(window).scrollTop();
			let sB4 = docHeight + sT4;
			let pY4 = $(".sec4>.wrap>h1").offset().top;
			let pH4 = $(".sec4>.wrap>h1").height();
			let tT4 = pY4 + pH4 - sT4 - (pH4 / 2);
			let tB4 = sB4 - pY4 - (pH4 / 2);
			let show4 = false;

			if (tT4 > 0 && tB4 > 0 && !showingSec4) {
				show4 = true;
				showingSec4 = true;

				$(".sec4>.wrap>h1").addClass("animate__fadeInUp");

				setTimeout(function() {
					$(".sec4>.wrap>h1").addClass("animate__animated");
					$(window).off("scroll", setAnimateTitleSec4);
				}, 50);
			}
		}

		function setAnimateTitleSec3() {
			let h3 = docHeight;
			let sT3 = $(window).scrollTop();
			let sB3 = docHeight + sT3;
			let pY3 = $(".sec3>.wrap>h1").offset().top;
			let pH3 = $(".sec3>.wrap>h1").height();
			let tT3 = pY3 + pH3 - sT3 - (pH3 / 2);
			let tB3 = sB3 - pY3 - (pH3 / 2);
			let show3 = false;

			if (tT3 > 0 && tB3 > 0 && !showingSec3) {
				show3 = true;
				showingSec3 = true;

				$(".sec3>.wrap>h1").addClass("animate__fadeInUp");

				setTimeout(function() {
					$(".sec3>.wrap>h1").addClass("animate__animated");
					$(window).off("scroll", setAnimateTitleSec3);
				}, 50);
			}
		}

		function setAnimateTitleSec2() {
			let h2 = docHeight;
			let sT2 = $(window).scrollTop();
			let sB2 = docHeight + sT2;
			let pY2 = $(".sec2>.sec2-main>strong").offset().top;
			let pH2 = $(".sec2>.sec2-main>strong").height();
			let tT2 = pY2 + pH2 - sT2 - (pH2 / 2);
			let tB2 = sB2 - pY2 - (pH2 / 2);
			let show2 = false;

			if (tT2 > 0 && tB2 > 0 && !showingSec2) {
				show2 = true;
				showingSec2 = true;

				$(".sec2>.sec2-main>strong").addClass("animate__fadeInUp");

				setTimeout(function() {
					$(".sec2>.sec2-main>strong").addClass("animate__animated");
					$(window).off("scroll", setAnimateTitleSec2);
				}, 50);
			}
		}

		function setAnimateTitleSec1() {
			let h1 = docHeight;
			let sT1 = $(window).scrollTop();
			let sB1 = docHeight + sT1;
			let pY1 = $(".sec1>.wrap>p").offset().top;
			let pH1 = $(".sec1>.wrap>p").height();
			let tT1 = pY1 + pH1 - sT1 - (pH1 / 2);
			let tB1 = sB1 - pY1 - (pH1 / 2);
			let show1 = false;

			if (tT1 > 0 && tB1 > 0 && !showingSec1) {
				show1 = true;
				showingSec1 = true;

				$(".sec1>.wrap>p").addClass("animate__fadeInUp");

				setTimeout(function() {
					$(".sec1>.wrap>p").addClass("animate__animated");
					$(window).off("scroll", setAnimateTitleSec1);
				}, 50);
			}
		}
	}

	function fixBugToDescSec3() {
		$(".sec3>.wrap>.blocks>.line>.block>.list>ul>li").each(function(i, el) {
			let h = $(".sec3>.wrap>.blocks>.line>.block>.list>ul>li").eq(i).height();
			let dop = 35.36 / 2;
			let total = h + dop;

			$(".sec3>.wrap>.blocks>.line>.block>.list>ul>li>.desc").eq(i).css("bottom", "" + total + "px");
		});
	}

	function setCallHeader() {
		$(".h>.modal-window.mob-show.tablet-show").css("z-index", "-10");
		$(".h>.modal-window.laptop-show.desktop-show").css("z-index", "-10");

		$(".h>.wrap>button").on("click", function(e) {
			$(".h>.modal-window.mob-show.tablet-show").css("z-index", "100");
			$(".h>.modal-window.laptop-show.desktop-show").css("z-index", "100");

			$(".h>.modal-window.mob-show.tablet-show").addClass("show");
			$(".h>.modal-window.laptop-show.desktop-show").addClass("show");
			
			let bT = parseFloat($(window).scrollTop());
			let wH = docHeight;
			let total = bT + wH;

			$("body").css("max-height", "" + total + "px");
			$("body").addClass("block-scroll");
		});

		$(".h>.modal-window.mob-show.tablet-show>.empty>button").on("click", close);
		$(".h>.modal-window.laptop-show.desktop-show>.window>.close").on("click", close);

		function close() {
			$(".h>.modal-window.mob-show.tablet-show").removeClass("show");
			$(".h>.modal-window.laptop-show.desktop-show").removeClass("show");
			$("body").removeClass("block-scroll");
			$("body").css("max-height", "inherit");

			setTimeout(function() {
				$(".h>.modal-window.mob-show.tablet-show").css("z-index", "-10");
				$(".h>.modal-window.laptop-show.desktop-show").css("z-index", "-10");
			}, 300);
		}
	}

	function fillInComsSec2() {
		for (let i = 0; i < kv.commentsSec2.length; i++) {
			for (let j = 0; j < kv.commentsSec2[i].rates.length; j++) {
				if (j == 0) {
					$(".sec2-main-coms-line-block").eq(i).find(".sec2-main-coms-line-block-com>article").eq(j).addClass("show");
					transferTo(i, j, j + 1);
				}
			}
		}

		function transferTo(block, prev, now) {
			setTimeout(function() {
				if (kv.commentsSec2[block].rates[now] === undefined) return;

				$(".sec2-main-coms-line-block").eq(block).find(".sec2-main-coms-line-block-com>article").eq(prev).removeClass("show");
				$(".sec2-main-coms-line-block").eq(block).find(".sec2-main-coms-line-block-com>article").eq(now).addClass("show");

				if (now + 1 >= $(".sec2-main-coms-line-block").eq(block).find(".sec2-main-coms-line-block-com>article").length) 
					transferTo(block, now, 0);
				else transferTo(block, now, now + 1);
			}, 10000);
		}
	}

	function setBottomBlockSec1() {
		let hH = parseFloat($(".h").css("height"));
		let s1H = parseFloat($(".sec1").css("height"));
		let total = hH + s1H;

		$(window).on("scroll", function(e) {
			if ($(window).scrollTop() > total + 100) {
				$(".sec1-blocks").css("display", "none");
			} else {
				$(".sec1-blocks").css("display", "flex");
			}
		});

		$(window).on("scroll", function(e) {
			hH = parseFloat($(".h").css("height"));
			s1H = parseFloat($(".sec1").css("height"));
			total = hH + s1H;
		});
	}
});