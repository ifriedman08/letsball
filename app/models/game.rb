class Game < ActiveRecord::Base

  validates :latitude, :longitude, :level, :sport, :time, presence: true

  belongs_to(
    :user
  )

end
