$(document).ready(function() {
  var show_error, stripeResponseHandler, submitHandler;

  submitHandler = function(event) {
    var $form = $(event.target);
    $form.find("input[type=submit]").prop("disabled", true);

    if (Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler);
    } else {
      show_error("Failed to load CC processing functionality. Please reload this page.")
    }
  };

  $('.cc_form').on('submit', submitHandler);

  stripeResponseHandler = function(status, result) {
    var token, $form;
    console.log(result);
    $form = $('.cc_form');

    if (result.error) {
      console.log(result.error.message);
      show_error(result.error.message);
      $form.find("input[type=submit]").prop("disabled", false);

    } else {
      token = result.id;
      $form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
      $("[data-stripe=number]").remove();
      $("[data-stripe=cvv]").remove();
      $("[data-stripe=exp-year]").remove();
      $("[data-stripe=exp-month]").remove();
      $("[data-stripe=label]").remove();
      // $form could potentially represent many DOM elements, so this calls
      // for form submission on just the first one?
      $form.get(0).submit();
    }
    return false;
  };

  show_error = function (message) {
    if($("#flash-messages").size() < 1) {
      $('div.container.main div:first').prepend("<div id='flash-messages'></div>")
    }
    $("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><div id="flash_alert">' + message + '</div></div>');
    $('.alert').delay(5000).fadeOut(3000);
    return false;
  };

})
