-- Inserts unique IDs and name of department into 'department' table -- 
INSERT INTO department (name)
VALUES 
  ('Whimsical Inventions'),
  ('Unicorns and Dragons Division'),
  ('Cosmic Research'),
  ('Nonsensical Engineering'),
  ('Quantum Banana Splitting'),
  ('Underwater Basket Weaving');

-- Inserts unique IDs ad titles of roles with salary into 'role' table --
INSERT INTO role (id, title, salary, department_id)
VALUES 
  (001, 'Dragon Wrangler', 75000, 2),
  (002, 'Mermaid Specialist', 80000, 6),
  (003, 'Phoenix Egg Coordinator', 70000, 4),
  (004, 'Labyrinth Designer', 85000, 4),
  (005, 'Centaur Relations', 60000, 2),
  (006, 'Griffin Nest Architect', 90000, 1),
  (007, 'Cyclops Vision Consultant', 55000, 5),
  (008, 'Medusa Hairstylist', 80000, 2),
  (009, 'Kraken Underwater Explorer', 75000, 6),
  (010, 'Gorgon Statuary Artist', 70000, 2),
  (011, 'Chimera Geneticist', 85000, 3),
  (012, 'Sphinx Riddle Master', 90000, 3),
  (013, 'Yeti Expedition Leader', 75000, 5),
  (014, 'Fairy Tale Writer', 60000, 1),
  (015, 'Unicorn Conservationist', 85000, 2);

-- Gives employees first and last name, a role id, and a manager id (if applicable) -- 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
  (001, 'Bobbles', 'Whimsykins', 1, NULL),
  (002, 'Giggles', 'Noodlebounce', 1, NULL),
  (003, 'Squiggles', 'Flapdoodle', 2, 1),
  (004, 'Cheeseburger', 'Wobblewhiz', 2, 1),
  (005, 'Snickerdoodle', 'Muffintop', 3, 2),
  (006, 'Sprinkle', 'Marshmallowfluff', 3, NULL),
  (007, 'Twinkletoes', 'Wobblegiggle', 4, 3),
  (008, 'Dizzy', 'Bananapop', 4, 3),
  (009, 'Snoozer', 'Lollygaggle', 5, 4),
  (010, 'Gigglepop', 'Squigglebop', 5, 4),
  (011, 'Sillibobble', 'Picklepants', 6, NULL),
  (012, 'Snoozer', 'Flippityflop', 6, 5),
  (013, 'Bellyflop', 'Noodlepop', 7, NULL),
  (014, 'Picklepants', 'Bellywobble', 7, 6),
  (015, 'Wobbletoes', 'Gigglepickle', 8, 7),
  (016, 'Jellyroll', 'Snoozerpop', 8, 7),
  (017, 'Whimsywiggle', 'Fluffernoodle', 9, 8),
  (018, 'Squigglebop', 'Flibbertwirl', 9, NULL),
  (019, 'Doodlebug', 'Gigglebop', 10, 9),
  (020, 'Gobbleplop', 'Tiddlydoodle', 10, 9),
  (021, 'Noodleplunger', 'Squigglepop', 11, 10),
  (022, 'Butterbottom', 'Wobblegiggle', 11, NULL),
  (023, 'Potty', 'Snoozersnuggle', 12, 11),
  (024, 'Gobblegiggle', 'Fluffernoodle', 12, 11),
  (025, 'Bathroom', 'Wobblewipe', 13, NULL),
  (026, 'Wobbleflap', 'Giggleloo', 13, NULL),
  (027, 'Ploop', 'Gigglegasket', 14, 13),
  (028, 'Plungerplop', 'Wobblewhiz', 14, 13),
  (029, 'Wobbletush', 'Tiddlydoodle', 15, NULL),
  (030, 'Flush', 'Butterbottom', 15, 14);