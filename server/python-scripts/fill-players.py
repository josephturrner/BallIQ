# # Fills database with player info using team data from the database

from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats
import pandas as pd
import json

playerList = players.get_active_players()

print(playerList[0])


# playerStats = playercareerstats.PlayerCareerStats(player_id=playerList[0]['id'], per_mode36='PerGame', league_id_nullable='00')

# careerTotals = playerStats.career_totals_regular_season.get_data_frame()
# seasonTotals = playerStats.season_totals_regular_season.get_data_frame()

# # Formatting for fetching specific stat
# print(careerTotals.loc[0]['STL'])

# careerTotals = playerStats.career_totals_regular_season.get_json()
# seasonTotals = playerStats.season_totals_regular_season.get_json()

# Formatting for fetching specific stat
# print(careerTotals)

# df = pd.DataFrame(playerStats.get_data_frames())

# print(df.loc[0])

# with open(r'Backend\json-data\new.json', "w") as outfile:
#     outfile.write(stats)


# from basketball_reference_scraper.teams import get_roster
# import pandas as pd
# import pymysql as sql

# # Database information
# HOST = 'localhost'
# USER = 'joseph'
# PASSWORD = 'BALLIQ'
# DB = 'balliq'

# # Var to check if there is an error
# error = ''

# # Open connection
# db = sql.connect(host="localhost", user="joseph", password="BALLIQ", database="balliq" )
# cursor = db.cursor()

# # Fetch teams
# try:
#     # Query
#     fetchTeams = "SELECT * FROM teams"
#     cursor.execute(fetchTeams)
#     teams = cursor.fetchall()
# except Exception as err:
#     error = 'Unable to fetch teams from database: ' + str(err)

# # Only try if error has not occured
# if len(error) == 0:
#     try:
#         for row in range(len(teams)):
#         # for row in range(1):

#             # Abreviation is in 3rd column, always use 2023 since we want the current rosters
#             roster = get_roster(f'{teams[row][2]}', 2023)

#             for player in range(len(roster)):
#                 # Insert statement in order of fields in database
#                 insertSQL = f"INSERT INTO players VALUES(\"{roster.loc[player]['PLAYER']}\", {roster.loc[player]['NUMBER']}, \'{roster.loc[player]['POS']}\', \'{roster.loc[player]['HEIGHT']}\', \'{teams[row][2]}\') ON DUPLICATE KEY UPDATE "
                
#                 # print(insertSQL)

#                 # Execute
#                 cursor.execute(insertSQL)

#             del roster
#     except Exception as err:
#         error = 'Unable to insert roster into players table: ' + str(err)

# print(error)
# db.commit()
# db.close()