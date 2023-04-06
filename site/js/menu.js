//Меню

let menuShow = false;
let lastClickedMenu = new Date();

$(document).on("click", ".h-panel-menu", function(e) {
	let date = new Date();
	let time1 = date.getTime();
	let time2 = lastClickedMenu.getTime();
	let totalTime = time1 - time2;

	if (totalTime > 300) {
		lastClickedMenu = date;

		if (!menuShow) {
			$(".h-panel-menu").addClass("show");
			setTimeout(function() {
				$(".h-panel-menu>nav>ul").css("display", "flex");
			}, 10);

			menuShow = true;
		} else {
			$(".h-panel-menu").removeClass("show");
			setTimeout(function() {
				$(".h-panel-menu>nav>ul").css("display", "none");
			}, 300);

			menuShow = false;
		}
	}
});