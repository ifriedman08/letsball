class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :place_id, null: false
      t.integer :level, null: false
      t.string :sport, null: false
      t.integer :user_id, null: false
      t.boolean :byob, null: false, default: false
      t.boolean :show_number, null: false, default: false

      t.timestamps null: false
    end
  end
end
