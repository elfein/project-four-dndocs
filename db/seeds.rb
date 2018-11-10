# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Account.destroy_all

emmy = Account.create(name: 'Emmy')
stephen = Account.create(name: 'Stephen')

riley = emmy.characters.create(name: 'Riley Deerchaser', class_name: 'Barbarian', race: 'Goliath', max_hp: 105, current_hp: 115, str: 20, dex: 14, con: 16, int: 8, wis: 10, cha: 13, prof: 4, level: 10)
sylfare = emmy.characters.create(name: 'Sylfare Meriele', class_name: 'Bard', race: 'Half-Elf', max_hp: 63, current_hp: 54, str: 8, dex: 16, con: 13, int: 10, wis: 14, cha: 18, prof: 4, level: 10)
silas = stephen.characters.create(name: 'Silas Naïlo', class_name: 'Druid', race: 'Half-Elf', max_hp: 63, current_hp: 63, str: 10, dex: 14, con: 10, int: 15, wis: 16, cha: 12, prof: 4, level: 10)

mga = riley.weapons.create(name: 'Massive Greataxe', die_number: 2, die_type: 12, bonus: 0, damage_type: 'Slashing', description: 'Even though this giant axe is anywhere from 10 to 15 ft. long, its weight and handle makes it usable only in a range of 5ft. It\'s made from one solid piece of grayish metal with no sheen, almost like stone, and the handle has room for three normal hands.', skill: 'str', prof: true)
javelin = riley.weapons.create(name: 'Javelins', die_number: 1, die_type: 8, bonus: 0, damage_type: 'Piercing', description: 'Ranged weapon (80ft/120ft).', skill: 'str', prof: true)
shortsword = sylfare.weapons.create(name: 'Silvered Shortsword', die_number: 1, die_type: 8, damage_type: 'Piercing', description: 'Finesse Weapon; made of silver, it can inflict harm on a number of fiends.', skill: 'dex', prof: true)

vm = sylfare.spells.create(name: 'Vicious Mockery', attack: true, prof: true, components: 'V', casting_time: '1 Action', duration: 'Instantaneous', die_number: 2, die_type: 4, bonus: 0, damage_type: 'Pyschic', description: 'You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next Attack roll it makes before the end of its next turn. 

This spell\'s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).', skill: '')
thunder = sylfare.spells.create(name: 'Thunderwave', attack: true, prof: true, components: 'V,S', casting_time: '1 Action', duration: 'Instantaneous', die_number: 2, die_type: 8, bonus: 0, damage_type: 'Thunder', description: 'A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn\'t pushed.')
mi = sylfare.spells.create(name: 'Minor Illusion', attack: false, prof: true, components: 'V,S,M', casting_time: '1 Action', duration: '10 minutes', description: 'A visual illusion appears in an area the caster can see. A creature can roll an investigation check against the caster\'s spell save DC to determine the integrity of the illusion.')

pk = riley.items.create(name: 'Painter\'s Kit', description: 'A simple set of paints and brushes.')
whet = riley.items.create(name: 'Whetstone', description: 'A tool for sharpening metal weapons.')
cloak = sylfare.items.create(name: 'Cloak of Many Fashions', description: 'The color and appearance of this cloak can be changed at will.')
cloak = sylfare.items.create(name: 'Disguise Kit', description: 'A cloak, hat, and set of makeup.')

one = riley.encounters.create(encounter_type: 'Fight')
two = riley.encounters.create(encounter_type: 'Fight')

three = sylfare.encounters.create(encounter_type: 'Fight')

hitOne = one.hpactions.create(diff: -5, diff_type: 'Piercing', source: 'Knight\'s Lance')
hitTwo = one.hpactions.create(diff: -15, diff_type: 'Piercing', source: 'Knight\'s Lance')
healOne = one.hpactions.create(diff: 12, diff_type: 'Healing', source: 'Spell')
hitThree = one.hpactions.create(diff: -12, diff_type: 'Slashing', source: 'Knight\'s Broadsword')
hitFour = one.hpactions.create(diff: -10, diff_type: 'Slashing', source: 'Knight\'s Broadsword')
healTwo = one.hpactions.create(diff: 22, diff_type: 'Healing', source: 'Spell')

hitOne = two.hpactions.create(diff: -3, diff_type: 'Piercing', source: 'Knight\'s Lance')
hitTwo = two.hpactions.create(diff: -15, diff_type: 'Piercing', source: 'Knight\'s Lance')
healOne = two.hpactions.create(diff: 6, diff_type: 'Healing', source: 'Spell')
hitThree = two.hpactions.create(diff: -12, diff_type: 'Slashing', source: 'Knight\'s Broadsword')
hitFour = two.hpactions.create(diff: -9, diff_type: 'Slashing', source: 'Knight\'s Broadsword')
healTwo = two.hpactions.create(diff: 13, diff_type: 'Healing', source: 'Spell')

hitOne = three.hpactions.create(diff: -5, diff_type: 'Piercing', source: 'Fangs')
hitTwo = three.hpactions.create(diff: -15, diff_type: 'Piercing', source: 'Fangs')
healOne = three.hpactions.create(diff: 12, diff_type: 'Healing', source: 'Potion')
hitThree = three.hpactions.create(diff: -2, diff_type: 'Slashing', source: 'Claws')
hitFour = three.hpactions.create(diff: -10, diff_type: 'Slashing', source: 'Claws')
healTwo = three.hpactions.create(diff: 2, diff_type: 'Healing', source: 'Spell')