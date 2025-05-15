class Task < ApplicationRecord
    validates :title, presence: true
    validates :body, presence: true
    validates :status, presence: true
    validates :team_id, presence: true
    validates :assignee_id, presence: true
end
