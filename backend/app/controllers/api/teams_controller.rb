module Api
    class TeamsController < ApplicationController
        before_action :set_team, only: [:show, :update, :destroy]

        def index
            @teams = Team.all
            render json: @teams
        end

        def show
            render json: @team
        end

        def create
            @team = Team.new(team_params)
            if @team.save
            render json: @team, status: :created
            else
            render json: @team.errors, status: :unprocessable_entity
            end
        end

        def update
            if @team.update(team_params)
            render json: @team
            else
            render json: @team.errors, status: :unprocessable_entity
            end
        end

        def destroy
            @team.destroy
            head :no_content
        end

        private

        def set_team
            @team = Team.find(params[:id])
        end

        def team_params
            params.require(:team).permit(:name, :owner_id)
        end
    end 
end