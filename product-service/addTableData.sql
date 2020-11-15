insert into products (title, description, img, price) values
('The Withcer 3', 'As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.', 'https://images-na.ssl-images-amazon.com/images/I/51B8ZHSx7GL.jpg', 24.99),
('Darkest Dungeon', 'Darkest Dungeon is a challenging gothic roguelike turn-based RPG about the psychological stresses of adventuring. Recruit, train, and lead a team of flawed heroes against unimaginable horrors, stress, famine, disease, and the ever-encroaching dark. Can you keep your heroes together when all hope is lost?', 'https://cdn.shopify.com/s/files/1/0014/1962/products/product_dd_tribulations_poster_set_design1_1024x1024.png?v=1542305197', 18.99),
('Don`t Strave', 'Don’t Starve is an uncompromising wilderness survival game full of science and magic. Enter a strange and unexplored world full of strange creatures, dangers, and surprises. Gather resources to craft items and structures that match your survival style.', 'https://images-na.ssl-images-amazon.com/images/I/511DcwbToSL._AC_.jpg', 7.19),
('Divinity 2', 'The critically acclaimed RPG that raised the bar, from the creators of Baldur`s Gate 3. Gather your party. Master deep, tactical combat. Venture as a party of up to four - but know that only one of you will have the chance to become a God.', 'https://cdn.shopify.com/s/files/1/0747/3829/products/mL2032_1024x1024.jpg?v=1571445498', 29.99),
('Cyberpunk 2077', 'Cyberpunk 2077 is an upcoming action role-playing video game developed and published by CD Projekt Red', 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg', 49.99),
('The Elder Scrolls V: Skyrim', 'Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space...', 'https://images-na.ssl-images-amazon.com/images/I/5168D2%2BFQnL._AC_SL1000_.jpg', 29.99),
('Half-Life 2', 'HALF-LIFE sends a shock through the game industry with its combination of pounding action and continuous, immersive storytelling. Valve`s debut title wins more than 50 game-of-the-year awards on its way to being named "Best PC Game Ever" by PC Gamer, and launches a franchise with more than...', 'https://hot-game.info/uploads/media/game/0001/07/thumb_6897_game_poster.jpeg', 7.19),
('Hades', 'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.', 'https://hot-game.info/uploads/media/game/0001/26/thumb_25774_game_poster.jpeg', 19.49),
('Portal 2', 'The "Perpetual Testing Initiative" has been expanded to allow you to design co-op puzzles for you and your friends!', 'https://upload.wikimedia.org/wikipedia/ru/d/dc/Portal_2_%28%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0%29.jpg', 7.19);

insert into stock (count, product_id) values
 (5,(SELECT id from products WHERE title='The Withcer 3')),
 (7,(SELECT id from products WHERE title='Darkest Dungeon')),
 (7,(SELECT id from products WHERE title='Don`t Strave')),
 (10,(SELECT id from products WHERE title='Divinity 2')),
 (4,(SELECT id from products WHERE title='Cyberpunk 2077')),
 (3,(SELECT id from products WHERE title='The Elder Scrolls V: Skyrim')),
 (8,(SELECT id from products WHERE title='Half-Life 2')),
 (15,(SELECT id from products WHERE title='Portal 2')),
 (17,(SELECT id from products WHERE title='Hades'));

