CREATE TABLE teams (
    team_id VARCHAR(50) PRIMARY KEY,
    team_name VARCHAR(50),
    abrev VARCHAR(3),
    city VARCHAR(50),
    logo TEXT
);

-- Table to store information about players
CREATE TABLE players (
    player_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(50),
    num VARCHAR(3),
    pos VARCHAR(15),
    height VARCHAR(6),
    team VARCHAR(50),
    headshot MEDIUMTEXT,
    FOREIGN KEY (team) REFERENCES teams (team_id)
);



-- Insert every team into database manually. Data used to get API requests for players when the database is initialized
-- INSERT INTO teams
-- VALUES
--     ('Atlanta', 'Hawks', 'ATL'),
--     ('Boston', 'Celtics', 'BOS'),
--     ('Brooklyn', 'Nets', 'BRK'),
--     ('Charlotte', 'Hornets', 'CHO'),
--     ('Chicago', 'Bulls', 'CHI'),
--     ('Cleveland', 'Caveliers', 'CLE'),
--     ('Dallas', 'Mavericks', 'DAL'),
--     ('Denver', 'Nuggets', 'DEN'),
--     ('Detroit', 'Pistons', 'DET'),
--     ('Golden State', 'Warriors', 'GSW'),
--     ('Houston', 'Rockets', 'HOU'),
--     ('Indiana', 'Pacers', 'IND'),
--     ('Los Angeles', 'Clippers', 'LAC'),
--     ('Los Angeles', 'Lakers', 'LAL'),
--     ('Memphis', 'Grizzlies', 'MEM'),
--     ('Miami', 'Heat', 'MIA'),
--     ('Milwaukee', 'Bucks', 'MIL'),
--     ('Minnesota', 'Timberwolves', 'MIN'),
--     ('New Orleans', 'Pelicans', 'NOP'),
--     ('New York', 'Knicks', 'NYK'),
--     ('Oklahoma City', 'Thunder', 'OKC'),
--     ('Orlando', 'Magic', 'ORL'),
--     ('Philadelphia', '76ers', 'PHI'),
--     ('Phoenix', 'Suns', 'PHO'),
--     ('Portland', 'Trailblazers', 'POR'),
--     ('Sacramento', 'Kings', 'SAC'),
--     ('San Antonio', 'Spurs', 'SAS'),
--     ('Toronto', 'Raptors', 'TOR'),
--     ('Utah', 'Jazz', 'UTA'),
--     ('Washington', 'Wizards', 'WAS');

-- -- Table to store information about games
-- CREATE TABLE games (
--     game_id INT PRIMARY KEY,
--     season VARCHAR(10),
--     start_date DATE,
--     end_date DATE,
--     home_team_id INT,
--     away_team_id INT,
--     FOREIGN KEY (home_team_id) REFERENCES teams (team_id),
--     FOREIGN KEY (away_team_id) REFERENCES teams (team_id)
-- );

-- -- Table to store game statistics
-- CREATE TABLE game_stats (
--     stat_id INT PRIMARY KEY,
--     game_id INT,
--     player_id INT,
--     team_id INT,
--     points INT,
--     rebounds INT,
--     assists INT,
--     steals INT,
--     blocks INT,
--     FOREIGN KEY (game_id) REFERENCES games (game_id),
--     FOREIGN KEY (player_id) REFERENCES players (player_id),
--     FOREIGN KEY (team_id) REFERENCES teams (team_id)
-- );