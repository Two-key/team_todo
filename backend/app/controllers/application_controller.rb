class ApplicationController < ActionController::API
  include ActionController::Cookies
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  #allow_browser versions: :modern

  def create_token(user_id)
    payload = {user_id: user_id, exp: (DateTime.current + 14.days).to_i}
    secret_key = Rails.application.credentials.secret_key_base
    token = JWT.encode(payload, secret_key)
    return token
  end

  def test
    render json: { message: 'This is a test message from Rails' }
  end

  def authenticate
    token = cookies.encrypted[:auth_token]
    
    if token.nil?
      render_unauthorized
    else
      secret_key = Rails.application.credentials.secret_key_base

      begin
        decoded_token = JWT.decode(token, secret_key)
        @current_user = User.find(decoded_token[0]["user_id"])
      rescue ActiveRecord::RecordNotFound
        render_unauthorized
      rescue JWT::ExpiredSignature
        # Cookieも削除
        cookies.delete(:auth_token) if cookies[:auth_token].present?
        render json: { errors: 'ExpiredSignature' }, status: :unauthorized
      rescue JWT::DecodeError
        # Cookieも削除
        cookies.delete(:auth_token) if cookies[:auth_token].present?
        render_unauthorized
      end
    end
  end

  def current_user
    @current_user
  end

  def render_unauthorized
    render json: { errors: 'Unauthorized' }, status: :unauthorized
  end

end
