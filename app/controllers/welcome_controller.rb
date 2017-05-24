class WelcomeController < ApplicationController
  # the skip_before_action command allows us to circumvent the before_action
  # established in the ApplicationController so that visitors can see the
  # index page without being signed in.
  skip_before_action :authenticate_user!, only: [:index]
  def index
  end
end
