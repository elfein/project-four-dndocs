# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_06_232522) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "actions", force: :cascade do |t|
    t.bigint "encounter_id"
    t.integer "diff"
    t.string "diff_type"
    t.string "source"
    t.integer "diff_2"
    t.string "diff_2_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["encounter_id"], name: "index_actions_on_encounter_id"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "class_name"
    t.string "race"
    t.integer "level"
    t.integer "max_hp"
    t.integer "current_hp"
    t.integer "str"
    t.integer "con"
    t.integer "dex"
    t.integer "cha"
    t.integer "wis"
    t.integer "int"
    t.integer "prof"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_characters_on_account_id"
  end

  create_table "encounters", force: :cascade do |t|
    t.bigint "character_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encounter_type"
    t.index ["character_id"], name: "index_encounters_on_character_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "character_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_items_on_character_id"
  end

  create_table "spells", force: :cascade do |t|
    t.boolean "attack"
    t.boolean "prof"
    t.string "components"
    t.string "casting_time"
    t.string "duration"
    t.bigint "character_id"
    t.string "name"
    t.integer "die_number"
    t.integer "die_type"
    t.integer "bonus"
    t.string "damage_type"
    t.string "description"
    t.integer "die_number_2"
    t.integer "die_type_2"
    t.string "damage_type_2"
    t.string "skill"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_spells_on_character_id"
  end

  create_table "weapons", force: :cascade do |t|
    t.bigint "character_id"
    t.string "name"
    t.integer "die_number"
    t.integer "die_type"
    t.integer "bonus"
    t.string "damage_type"
    t.string "description"
    t.string "skill"
    t.boolean "prof"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_weapons_on_character_id"
  end

  add_foreign_key "actions", "encounters"
  add_foreign_key "characters", "accounts"
  add_foreign_key "encounters", "characters"
  add_foreign_key "items", "characters"
  add_foreign_key "spells", "characters"
  add_foreign_key "weapons", "characters"
end
