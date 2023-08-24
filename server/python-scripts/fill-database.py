from nba_api.stats.static import players
from nba_api.stats.static import teams
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo as cpi
import getLogos as im
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
db = sql.connect(host=HOST, user=USER, password=PASSWORD, database=DB)
cursor = db.cursor()

try:
    # For those not signed to a team, have empty team
    insertSQL = f"INSERT INTO teams VALUES('NaN', 'Unsigned', 'NaN', 'NaN', 'NaN')"
    cursor.execute(insertSQL)

    teamList = teams.get_teams()
    for team in range(len(teamList)):
        # Insert statement using parameterized query
        insertSQL = "INSERT INTO teams (team_id, team_name, abrev, city, logo) VALUES (%s, %s, %s, %s, %s)"
        logo_data = im.Logo(teamList[team]['id']).image  # Assuming this retrieves SVG data as a string

        # Execute the query with parameters
        cursor.execute(insertSQL, (teamList[team]['id'], teamList[team]['full_name'], teamList[team]['abbreviation'], teamList[team]['city'], logo_data))


    db.commit()
except Exception as err:
    error = 'Unable to insert teams into teams table: ' + str(err)

time.sleep(30)

#  Only add players if teams were added successfully
if len(error) == 0:
    try:
        playerList = players.get_active_players()
        for player in range(len(playerList)):

            if player+1 % 200 == 0:
                time.sleep(180)

            # Fetch specific player info
            playerInfo = cpi.CommonPlayerInfo(playerList[player]['id']).common_player_info.get_data_frame().loc[0]
            playerHeadshot = im.Headshot(playerList[player]['id']).image

            if playerInfo['ROSTERSTATUS'] == 'Inactive':
                insertSQL = "INSERT INTO players (player_id, full_name, num, pos, height, team, headshot) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(insertSQL, (playerList[player]['id'], playerInfo['DISPLAY_FIRST_LAST'], playerInfo['JERSEY'], playerInfo['POSITION'], playerInfo['HEIGHT'], "NaN", playerHeadshot))
            else:
                insertSQL = "INSERT INTO players (player_id, full_name, num, pos, height, team, headshot) VALUES (%s, %s, %s, %s, %s, %s, %s)"

                cursor.execute(insertSQL, (playerList[player]['id'], playerInfo['DISPLAY_FIRST_LAST'], playerInfo['JERSEY'], playerInfo['POSITION'], playerInfo['HEIGHT'], playerInfo['TEAM_ID'], playerHeadshot))

        db.commit()
    except Exception as err:
        error = 'Unable to insert players into players table: ' + str(err)

if len(error) != 0:
    print(error)

db.close()