module Api
    class TasksController < ApplicationController
        before_action :set_task, only: [:show, :update, :destroy]

        def index
            @tasks = Task.all
            # @task = Task.where(assignee_id:1) こんな感じで書いていく
            render json: @tasks
        end

        def show
            render json: @task
        end

        def create
            @task = Task.new(task_params)
            if @task.save
            render json: @task, status: :created
            else
            render json: @task.errors, status: :unprocessable_entity
            end
        end

        def update
            if @task.update(task_params)
            render json: @task
            else
            render json: @task.errors, status: :unprocessable_entity
            end
        end

        def destroy
            @task.destroy
            head :no_content
        end

        private

        def set_task
            @task = Task.find(params[:id])
        end

        def task_params
            params.require(:task).permit(:title, :body, :status, :assignee_id, :team_id)
        end
    end 
end