json.extract!(@slam, :time, :sport, :level, :id, :latitude, :longitude)

json.user do
  json.extract!(slam.user, :id, :email)
end
