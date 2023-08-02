from nba_api.stats.static import players
from nba_api.stats.static import teams
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo as cpi
import pymysql as sql
import time

# teamList = teams.get_teams()

# Format for fetching specific info
# print(cpi.CommonPlayerInfo(playerList[0]['id']).common_player_info.get_data_frame().loc[0]['JERSEY'])
# print(teamList[0])


# Database information
HOST = 'localhost'
USER = 'joseph'
PASSWORD = 'BALLIQ'
DB = 'balliq'

# Var to check if there is an error
error = ''

# Open connection
db = sql.connect(host="localhost", user="joseph", password="BALLIQ", database="balliq" )
cursor = db.cursor()

try:
    # For those not signed to a team, have empty team
    insertSQL = f"INSERT INTO teams VALUES('NaN', 'Unsigned', 'NaN', 'NaN')"
    cursor.execute(insertSQL)

    teamList = teams.get_teams()
    for team in range(len(teamList)):
        # Insert statement in order of fields in database
        insertSQL = f"INSERT INTO teams VALUES({teamList[team]['id']}, \"{teamList[team]['full_name']}\", \"{teamList[team]['abbreviation']}\", \"{teamList[team]['city']}\")"

        # Execute
        cursor.execute(insertSQL)

    db.commit()
except Exception as err:
    error = 'Unable to insert teams into teams table: ' + str(err)

time.sleep(30)

#  Only add players if teams were added successfully
if len(error) == 0:
    try:
        playerList = players.get_active_players()
        for player in range(len(playerList)):

            if player % 200 == 0:
                time.sleep(180)

            # Fetch specific player info
            playerInfo = cpi.CommonPlayerInfo(playerList[player]['id']).common_player_info.get_data_frame().loc[0]

            # Inactive players assigned to unsigned team
            if playerInfo['ROSTERSTATUS'] == 'Inactive':
                insertSQL = f"INSERT INTO players VALUES({playerList[player]['id']}, \"{playerInfo['DISPLAY_FIRST_LAST']}\", \"{playerInfo['JERSEY']}\", \"{playerInfo['POSITION']}\", \"{playerInfo['HEIGHT']}\", \"NaN\", \"NaN\")"
            else:
                # print(playerInfo)

                # Insert statement
                insertSQL = f"INSERT INTO players VALUES({playerList[player]['id']}, \"{playerInfo['DISPLAY_FIRST_LAST']}\", \"{playerInfo['JERSEY']}\", \"{playerInfo['POSITION']}\", \"{playerInfo['HEIGHT']}\", \"{playerInfo['TEAM_ABBREVIATION']}\", {playerInfo['TEAM_ID']})"

                # Execute
                cursor.execute(insertSQL)
        db.commit()
    except Exception as err:
        error = 'Unable to insert players into players table: ' + str(err)

if len(error) != 0:
    print(error)

db.close()