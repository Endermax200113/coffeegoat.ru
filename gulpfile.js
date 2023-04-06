/*
	Перед использованием gulp'a отключить в браузере кеширование файлов

	Окно разработчика (просмотр кода элемента) -> Вкладка Network -> Поставить галочку Disable cache
*/

var gulp 			= require("gulp"),
	sass 			= require("gulp-sass"),
	browserSync 	= require("browser-sync"),
	concat 			= require("gulp-concat"),
	autoprefixer 	= require("gulp-autoprefixer"),
	del 			= require("del"),
	rename 			= require("gulp-rename"),
	fs 				= require("fs"),
	map 			= require("map-stream"),
	fontforge 		= require("fontforge"),
	convertFont 	= require("gulp-ttf2woff2"),
	minCss			= require("gulp-clean-css"),
	minJs			= require("gulp-uglify");

var donePath = {
	css: "done/css",
	js: "done/js",
	img: "done/img",
	files: "done/",
	fonts: "done/fonts",
	video: "done/video",
	html: "done/"
};

gulp.task("browser", done => {
	// console.log("Делаем вид, как будто открывается окно браузера...");

	browserSync({
		server: {
			baseDir: "done"
		},
		notify: false
	});

	done();
});

function reloadBrowser() {
	browserSync.reload();
}

gulp.task("styles", done => {
	gulp.src("site/sass/main.sass")
		.pipe(sass({
			outputStyles: "expanded",
			includePaths: [__dirname + "/node_modules"]
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.pipe(concat("styles.css")
			.on("error", err => {
				console.error(err);
				done();
			})
		)
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ["last 50 versions"]
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.pipe(minCss()
			.on("error", err => {
				console.error(err);
				done();
			})
		)
		.on("error", err => {
			console.error(err);
		})
		.pipe(gulp.dest(donePath.css))
		.pipe(browserSync.stream());

	done();
});

gulp.task("scripts", done => {
	gulp.src("site/js/**/*.js")
		.pipe(concat("scripts.js")
			.on("error", err => {
				console.error(err);
				done();
			}))
		.pipe(minJs())
		.on("error", err => {
			console.error(err);
		})
		.pipe(gulp.dest(donePath.js))
		.pipe(browserSync.stream());

	done();
});

gulp.task("html", done => {
	gulp.src("done/**/*.html")
		.pipe(map(file => {
			let pathSite = "site\\";
			let pathDone = "done\\";

			fs.access(pathSite + file.relative, async err => {
				if (err) await del([pathDone + file.relative]);
			});
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.on("error", err => {
			console.error(err);
		});

	gulp.src("site/**/*.html")
		.pipe(gulp.dest(donePath.html))
		.pipe(browserSync.stream());

	done();
});

gulp.task("files", done => {
	var remove = false;

	gulp.src(["done/**/*.*", "!done/{js,css,img,fonts}/**/*.*", "!done/**/*.{js,css,html}"])
		.pipe(map(file => {
			let pathSite = "site\\";
			let pathDone = "done\\";

			fs.access(pathSite + file.relative, async err => {
				if (err) await del([pathDone + file.relative]);
			});
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.on("error", err => {
			console.error(err);
		});

	gulp.src(["site/**/*.*", "!site/**/*.{sass,js,html,png,jpg,webp,jp2,raw,jpeg,ttf,svg,gif}"])
		.pipe(gulp.dest(donePath.files))
		.pipe(browserSync.stream());

	done();
});

gulp.task("images", done => {
	gulp.src("done/img/**/*")
		.pipe(map(file => {
			let pathImg = "site\\img\\";
			let pathDoneImg = "done\\img\\";

			fs.access(pathImg + file.relative, async err => {
				if (err) await del([pathDoneImg + file.relative]);
			});
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.on("error", err => {
			console.error(err);
		});

	gulp.src("site/img/**/*.jpeg")
		.pipe(rename(path => {
			rename();

			async function rename() {
				let fullPath = "";
				let beforeExt = path.extname;

				if (path.dirname != ".") fullPath = "site\\img\\" + path.dirname + "\\"+ path.basename + beforeExt;
				else fullPath = "site\\img\\" + path.basename + beforeExt;
				path.extname = path.extname.replace("jpeg", "jpg");

				if (beforeExt == ".jpeg") await del([fullPath]);
			}

			return;
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.on("error", err => {
			console.error(err);
		})
		.pipe(gulp.dest("site/img"))
		.pipe(gulp.dest(donePath.img));

	gulp.src("site/img/**/*.{png,jpg,webp,jp2,raw,svg,gif}")
		.pipe(gulp.dest(donePath.img))
		.pipe(browserSync.stream());

	reloadBrowser();
	done();
});

gulp.task("video", done => {
	gulp.src("done/video/**/*")
		.pipe(map(file => {
			let pathVid = "site\\video\\";
			let pathDoneVid = "done\\video\\";

			fs.access(pathVid + file.relative, async err => {
				if (err) await del([pathDoneVid + file.relative]);
			});
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.on("error", err => {
			console.error(err);
		});

	gulp.src("site/video/**/*.{avi,wmv,mov,mkv,3gp,mp4,mpeg,mpg,webm,mov}")
		.pipe(gulp.dest(donePath.video))
		.pipe(browserSync.stream());

	reloadBrowser();
	done();
});

gulp.task("fonts", done => {
	gulp.src("done/fonts/**/*")
		.pipe(map(file => {
			let pathTTF = "site\\fonts\\";
			let pathWOFF = "done\\fonts\\";
			let fileTTF = file.relative.replace(file.extname, "") + ".ttf";
			let type = "";

			if (file.relative.endsWith(".woff2")) type = pathTTF + fileTTF;
			else type = pathTTF + file.relative;

			fs.access(type, async err => {
				if (err) await del([pathWOFF + file.relative]);
			});
		}).on("error", err => {
			console.error(err);
			done();
		}))
		.on("error", err => {
			console.error(err);
		});

	gulp.src("site/fonts/**/*.ttf")
		.pipe(convertFont()
			.on("error", err => {
				console.error(err);
				done();
			}))
		.on("error", err => {
			console.error(err);
		})
		.pipe(gulp.dest(donePath.fonts))
		.pipe(browserSync.stream());

	done();
});

gulp.task("watch", () => {
	gulp.watch("site/sass/**/*.sass", gulp.parallel("styles"));
	gulp.watch("site/js/**/*.js", gulp.parallel("scripts"));
	gulp.watch("site/**/*.html", gulp.parallel("html"));
	gulp.watch(["site/**/*.*", "!site/**/*.{sass,js,html,png,jpg,webp,raw,jpeg,jp2,ttf,svg,gif,avi,wmv,mov,mkv,3gp,mp4,mpeg,mpg,webm,mov}"], gulp.parallel("files"));
	gulp.watch("site/img/*", gulp.parallel("images"));
	gulp.watch("site/video/*", gulp.parallel("video"));
	gulp.watch("site/fonts/**.ttf", gulp.parallel("fonts"));
});

gulp.task("default", gulp.parallel("images", "video", "styles", "scripts", "browser", "watch"));