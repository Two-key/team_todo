module Api
    class AuthenticationController < ApplicationController
        before_action :authenticate_user!, only: [:check]

    def login
        @user = User.find_by_email(params[:user][:email])
        if @user&.authenticate(params[:user][:password])
            token = create_token(@user.id)
            cookies.encrypted[:auth_token] = {
            value: token,
            httponly: true,
            secure: Rails.env.production?,
            expires: 14.days.from_now,
            same_site: :lax
        }
        render json: { user: { email: @user.email, name: @user.name } }
        else
        render json: { error: '認証失敗' }, status: :unauthorized
        end
    end

    def logout
        cookies.delete(:auth_token)
        render json: { message: "ログアウトしました" }, status: :ok
    end

    def check
        render json: { message: "認証済みです", user: current_user.as_json(only: [:id, :email, :name]) }
    end

    private

    def authenticate_user!
        token = cookies.encrypted[:auth_token]
        if token.blank?
        render json: { error: "未認証です" }, status: :unauthorized
        return
        end

        begin
            payload = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
            @current_user = User.find_by(id: payload["user_id"])
            if @current_user.nil?
            render json: { error: "ユーザーが見つかりません" }, status: :unauthorized
            return
        end
        rescue JWT::DecodeError
            render json: { error: "無効なトークンです" }, status: :unauthorized
            return
        end
    end

    def current_user
        @current_user
    end
    end
end