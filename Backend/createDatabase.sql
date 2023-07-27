-- Table to store information about teams
CREATE TABLE teams (
    team_id INT PRIMARY KEY,
    abbreviation VARCHAR(3),
    city VARCHAR(50),
    conference VARCHAR(50),
    division VARCHAR(50),
    full_name VARCHAR(100)
);

-- Table to store information about players
CREATE TABLE players (
    player_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES teams (team_id)
);

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