# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Account.destroy_all

emmy = Account.create(name: 'Emmy')

riley = emmy.characters.create(name: 'Riley Deerchaser', class_name: 'Barbarian', race: 'Goliath', max_hp: 115, current_hp: 115, str: 20, dex: 14, con: 16, int: 8, wis: 10, cha: 13, prof: 4, level: 10)
sylfare = emmy.characters.create(name: 'Sylfare Meriele', class_name: 'Bard', race: 'Half-Elf', max_hp: 63, current_hp: 54, str: 8, dex: 16, con: 13, int: 10, wis: 14, cha: 18, prof: 4, level: 10)

mga = riley.weapons.create(name: 'Massive Greataxe', die_number: 2, die_type: 12, bonus: 0, damage_type: 'Slashing', description: 'Even though this giant axe is anywhere from 10 to 15 ft. long, its weight and handle makes it usable only in a range of 5ft. It\'s made from one solid piece of grayish metal with no sheen, almost like stone, and the handle has room for three normal hands.', skill: 'str', prof: true)

vm = sylfare.spells.create(name: 'Vicious Mockery', attack: true, prof: true, components: 'V', casting_time: '1 Action', duration: 'Instantaneous', die_number: 2, die_type: 4, bonus: 0, damage_type: 'Pyschic', description: 'You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next Attack roll it makes before the end of its next turn. 

This spell\'s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).', skill: '')

pk = riley.items.create(name: 'Painter\'s Kit', description: 'A simple set of paints and brushes.')
cloak = sylfare.items.create(name: 'Cloak of Many Fashions', description: 'The color and appearance of this cloak can be changed at will.')
cloak = sylfare.items.create(name: 'Disguise Kit', description: 'A cloak, hat, and set of makeup.')

one = riley.encounters.create(encounter_type: 'Fight')

hit = one.actions.create(diff: -5, diff_type: 'Piercing', source: 'Knight\'s Broadsword')