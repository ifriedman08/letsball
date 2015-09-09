# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Game.create!(
  latitude: 37.869283,
  longitude: -122.270066,
  time: Time.new(2015, 10, 31, 2, 2, 2),
  level: 2,
  sport: 'Basketball',
  user_id: 1,
  byob: true,
  show_number: false
  )

Game.create!(
  latitude: 37.823827,
  longitude: -122.260458,
  time: Time.new(2015, 11, 21, 2, 30, 2),
  level: 2,
  sport: 'Kickball',
  user_id: 1,
  byob: false,
  show_number: false
  )

Game.create!(
  latitude: 37.759654,
  longitude: -122.427149,
  time: Time.new(2016, 1, 5, 8, 30, 2),
  level: 2,
  sport: 'Soccer',
  user_id: 1,
  byob: false,
  show_number: false
  )
