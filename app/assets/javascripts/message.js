$(document).on('turbolinks:load', function(){
      function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="message" data-id = ${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <image src = "${ message.image}" class ="lower-message__image">
          </div>`
        return html;
      } else {
        var html =
         `<div class="message" data-id = ${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
    $('#new_message').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(data){
          var html = buildHTML(data);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
          $('#new_message')[0].reset();
        })
        .fail(function(){
          alert('error');
        });
        return false;
    });

    $(function(){
      function buildMessageHTML(message){

        var image = (message.image.url)? `<div class="lower-message">
          <image src = "${ message.image.url}" class ="lower-message__image">
          </div>` : ``;

        var html = `
          <div class="message" data-id = ${message.id}>
            <div class = "upper-message">
              <div class = "upper-message__user-name">
              ${message.user_name}
              </div>
              <div class = "upper-message__date">
              ${message.created_at}
              </div>
            </div>
            <div class = "lower-message">
                <p class = "lower-message__content">
                ${message.content}
                </p>
            </div>
            ${image}`
            return html;
      }

    var updating = function(){
    var message_id = $('.message:last').data('id');
    current_url = location.href;
    if (current_url.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          url: 'api/messages',
          type: 'GET',
          data:{id:message_id},
          dataType: 'json',
          })
        .done(function(new_messages){
          if (new_messages.length !== 0) {
            new_messages.forEach(function(value){
            var html = buildMessageHTML(value);
            $(`.messages`).append(html)
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
            })
          }
          })
        .fail(function(){
              alert('error');
        })
      };
    };
      setInterval(updating, 5000);
    });
});
