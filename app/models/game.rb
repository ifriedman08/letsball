class Game < ActiveRecord::Base

  validates :latitude, :longitude, :place_name, :level, :sport, :time, presence: true

  belongs_to(
    :user
  )

end
