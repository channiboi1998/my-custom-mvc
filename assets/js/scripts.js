$(document).ready(function() {
    
    $('form.login-form').on('submit', function() {
        
        $.post($(this).attr('action'), $(this).serialize(), function(result) {
            
            console.log(result);

            if (result.status == 422) {
                let notifications = '';
                let notification_color = 'danger';
            
                notifications += '<div class="alert alert-'+notification_color+' rounded-0 mb-0" role="alert">';
    
                for (i in result.message) {
                    notifications += '<p>'+result.message[i]+'</p>';
                }
                
                notifications += '</div>';
                $('#notification').html(notifications);
            
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);

            } else {
                window.location = '/students/profile';
            }
            
        });

        return false;
    });

    $('form.register-form').on('submit', function() {

        $.post($(this).attr('action'), $(this).serialize(), function(result) {
            
            let notifications = '';
            let status = result.status;
            let notification_color = 'success';

            if (status === 422) {
                notification_color = 'danger';
            } else {
                $('form.register-form input.field').each(function() {
                    $(this).val('');
                });
            }

            notifications += '<div class="alert alert-'+notification_color+' rounded-0 mb-0" role="alert">';

            for (i in result.message) {
                notifications += '<p>'+result.message[i]+'</p>';
            }
            
            notifications += '</div>';
            $('#notification').html(notifications);
        
            $("html, body").animate({
                scrollTop: 0
            }, 1000);

        });

        return false;

    });

});