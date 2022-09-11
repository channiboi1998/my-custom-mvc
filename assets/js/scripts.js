$(document).ready(function() {
    
    $(document).on('change', '#search_form input', function() {
        $('#search_form').submit();
    });

    $(document).on('submit', '#search_form', function() {

        $.get($(this).attr('action'), $(this).serialize(), function(result) {

            /***
             * If you want to use Channiboi's profiler and your doing Ajax, you must include this on your script.
             */
            let profiler_section = document.getElementById("profiler-values");
            if (profiler_section) {
                profiler_section.textContent = JSON.stringify(result.profiler, undefined, 2);
            }

            if (result.players.length > 0) {

                let profiler_section = document.getElementById("profiler-values");
                if (profiler_section) {
                    profiler_section.textContent = JSON.stringify(result.profiler, undefined, 2);
                }

                let dom = '';
                for(let i=0; i<result.players.length; i++) {
                    dom += '<div class="col-3 player p-3 pt-0">';
                        dom += '<img src="'+result.players[i].profile_image+'" alt="player-placeholder" class="mb-3">';
                        dom += '<h6>'+result.players[i].name+'</h6>';
                    dom += '</div>';
                }
                $('div#player-list').html(dom);
            } else {
                $('div#player-list').html('Cant find user on the database');
            }
        });

        return false;
    });

});