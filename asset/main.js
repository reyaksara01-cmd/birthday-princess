$(document).ready(function () {
    // Waktu
    const detik = 1000;
    const menit = detik * 60;
    const jam = menit * 60;
    const hari = jam * 24;

    const hari_ = $("#hari");
    const jam_ = $("#jam");
    const menit_ = $("#menit");
    const detik_ = $("#detik");

    let ultah = "Apr 12, 2022 00:00:00";
    let hitungMundur = new Date(ultah).getTime();

    let x = setInterval(function () {
        let sekarang = new Date().getTime();
        jarak = hitungMundur - sekarang;

        hari_.text(Math.floor(jarak / (hari)));
        jam_.text(Math.floor((jarak % (hari)) / (jam)));
        menit_.text(Math.floor((jarak % (jam)) / (menit)));
        detik_.text(Math.floor((jarak % (menit)) / detik));

        if (jarak < 0) {

            $("#container").addClass("tampil");
            $("#birthday").removeClass("tampil");

            $.playSound('asset/musik/masakk.mp3');
            $("#waktu").remove();
            $('head').append($('<link rel="stylesheet" />').attr('href', 'asset/style.css'));

            $('.start').click(function () {
                $('.stage1').fadeOut();
                fire_modal('asset/img/cake_modal.png', 'Lets Go buat kue ulang tahun bocil!', '...');
            });

            progress = 1;

            $('.modal_content button').click(function () {
                progress++;
                close_modal(progress);
            });

            function close_modal(callback) {
                modal.css('transform', 'translateY(-50%) scale(0)');
                setTimeout(function () {
                    $('.stage' + callback).fadeIn();
                }, 600);
            }

            function fire_modal(imgurl, title, content) {
                modal = $('.birthday_inner__modal');
                modal.find('h1').html(title);
                modal.find('img').attr('src', imgurl);
                modal.find('p').html(content);
                setTimeout(function () {
                    modal.css('transform', 'translateY(-50%) scale(1)');
                }, 1000);
            }

            mixing = false;
            mixtimes = 0;

            $('.mixer').click(function () {
                if (!mixing) {
                    mixing = true;
                    mixtimes++;
                    $('.mix_spoon img').addClass('move');
                    setTimeout(function () {
                        $('.mix_spoon img').removeClass('move');
                        mixing = false;
                    }, 1000);
                }
                if (mixtimes == 6) {
                    $('.stage2').fadeOut();
                    fire_modal('asset/img/mix_modal.png', 'Adonan sudah merata!', '...');
                }
            });

            $('.tin').draggable({ revert: true });
            // 🔥 SUPPORT HP (TAP MASUK OVEN)
$('.tin').on('click touchstart', function () {
    $('.stage3').fadeOut();
    fire_modal('asset/img/oven_modal.png', 'Berhasil dipanggang!', '...');
});

            $(".oven").droppable({
                drop: function () {
                    $('.stage3').fadeOut();
                    fire_modal('asset/img/oven_modal.png', 'Berhasil dipanggang!', '...');
                }
            });

            bases = 0;
            fillings = 0;

            $('.sponges .item_inner').click(function () {
                $('.sponges').addClass('inactive');
                $('.fillings').removeClass('inactive');
                t = $(this).attr('class').split(' ').pop();
                bases++;
                if (bases < 6) add_sponge(t);
            });

            $('.fillings .item_inner').click(function () {
                $('.fillings').addClass('inactive');
                $('.sponges').removeClass('inactive');
                f = $(this).attr('class').split(' ').pop();
                fillings++;
                if (fillings < 7) add_filling(f);
            });

            function add_sponge(t) {
                $('.cakemake').prepend(
                    '<div style="width:' + (200 - (bases * 20)) + 'px" class="sponge sponge-' + t + '"><div></div><div></div><div></div><div></div><div></div></div>'
                );
            }

            function add_filling(f) {
                $('.cakemake').prepend(
                    '<div style="width:' + (200 - (bases * 20)) + 'px" class="filling filling-' + f + '"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'
                );
            }

            function fin() {
                $('h1,h2,.options,.startagain,.add').fadeOut();

                setTimeout(function () {
                    $('.cakemake').fadeIn();
                }, 1000);

                add_candle();
            }

            // 🔥 FINAL FLOW
            function add_candle() {
                $('.cakemake').prepend('<div class="candle"><img src="asset/img/candle.png" /></div>');

                confetti.start();
                $.stopSound();

                setTimeout(function () {

                    $('.birthday').fadeOut(1000);

                    // 💖 LOVE
                    $('#love_scene')
                        .css('display', 'block')
                        .hide()
                        .fadeIn(2000);

                    setTimeout(function () {

                        $('#love_scene').fadeOut(1000);

                        // 📸 GALERI
                        $('#gallery_slide')
                            .css('display', 'flex')
                            .hide()
                            .fadeIn(2000);

                        // 🎵 MUSIC
                        var music = document.getElementById("bgmusic");
                        music.play().catch(() => console.log("Autoplay diblok"));

                    }, 5000);

                }, 2000);
            }

            $('.add').click(function () {
                fin();
            });

            $('.sa').click(function () {
                window.location.reload();
            });

            clearInterval(x);
        }
    }, 0);
});
document.addEventListener("click", function(){
    var music = document.getElementById("bgmusic");
    music.play().catch(()=>console.log("autoplay diblok"));
  });
