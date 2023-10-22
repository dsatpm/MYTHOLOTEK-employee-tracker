-- Inserts name of department into 'department' table -- 
INSERT INTO department (name)
VALUES 
  ('Whimsical Inventions'),
  ('Unicorns and Dragons Division'),
  ('Cosmic Research'),
  ('Nonsensical Engineering'),
  ('Quantum Banana Splitting'),
  ('Underwater Basket Weaving');

-- Inserts titles of role with salary and department role belongs to into 'role' table --
INSERT INTO role (title, salary, department_id)
VALUES 
  ('Dragon Wrangler', 75000, 2),
  ('Mermaid Specialist', 80000, 6),
  ('Phoenix Egg Coordinator', 70000, 4),
  ('Labyrinth Designer', 85000, 4),
  ('Centaur Relations', 60000, 2),
  ('Griffin Nest Architect', 90000, 1),
  ('Cyclops Vision Consultant', 55000, 5),
  ('Medusa Hairstylist', 80000, 2),
  ('Kraken Underwater Explorer', 75000, 6),
  ('Gorgon Statuary Artist', 70000, 2),
  ('Chimera Geneticist', 85000, 3),
  ('Sphinx Riddle Master', 90000, 3),
  ('Yeti Expedition Leader', 75000, 5),
  ('Fairy Tale Writer', 60000, 1),
  ('Unicorn Conservationist', 85000, 2);

-- Gives employees first and last name, a role id, and a manager id (if applicable) -- 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Kayla', 'Whimsykins', 1, NULL),
  ('Giggles', 'Noodlebounce', 1, NULL),
  ('Squiggles', 'Flapdoodle', 2, 1),
  ('Cheeseburger', 'Wobblewhiz', 2, 1),
  ('Snickerdoodle', 'Muffintop', 3, 2),
  ('Bailey', 'Marshmallowfluff', 3, NULL),
  ('Twinkletoes', 'Wobblegiggle', 4, 3),
  ('Dizzy', 'Bananapop', 4, 3),
  ('Snoozer', 'Lollygaggle', 5, 4),
  ('Gigglepop', 'Squigglebop', 5, 4),
  ('Olive', 'Picklepants', 6, NULL),
  ('Snoozer', 'Flippityflop', 6, 5),
  ('Bellyflop', 'Noodlepop', 7, NULL),
  ('Picklepants', 'Bellywobble', 7, 6),
  ('Wobbletoes', 'Gigglepickle', 8, 7),
  ('Jellyroll', 'Snoozerpop', 8, 7),
  ('Whimsywiggle', 'Fluffernoodle', 9, 8),
  ('Squigglebop', 'Flibbertwirl', 9, NULL),
  ('Doodlebug', 'Gigglebop', 10, 9),
  ('Gobbleplop', 'Tiddlydoodle', 10, 9),
  ('Noodleplunger', 'Squigglepop', 11, 10),
  ('Butterbottom', 'Wobblegiggle', 11, NULL),
  ('Potty', 'Snoozersnuggle', 12, 11),
  ('Gobblegiggle', 'Fluffernoodle', 12, 11),
  ('Bathroom', 'Wobblewipe', 13, NULL),
  ('Wobbleflap', 'Giggleloo', 13, NULL),
  ('Ploop', 'Gigglegasket', 14, 13),
  ('Plungerplop', 'Wobblewhiz', 14, 13),
  ('Wobbletush', 'Tiddlydoodle', 15, NULL),
  ('Flush', 'Butterbottom', 15, 14);