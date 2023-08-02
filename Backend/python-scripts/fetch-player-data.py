# Fetches specific player data & formats it in way fronend can interpret

# Imports
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo as cpi, shotchartleaguewide as sc
import sys
import json

# Player ID contained in cli parameters
PARAMS = sys.argv[1:]
PLAYER_ID = PARAMS[0]

# Returns blank season object, also used for career stats
def newSeason():

    SEASON_FORMAT = {
        "SEASON_ID": None,
        "TEAM_ID": None,
        "TEAM_ABBREVIATION": None,
        "PLAYER_AGE": None,
        "GP": None,
        "GS": None,
        "MIN": None,
        "FGM": None,
        "FGA": None,
        "FG_PCT": None,
        "FG3M": None,
        "FG3A": None,
        "FG3_PCT": None,
        "FTM": None,
        "FTA": None,
        "FT_PCT": None,
        "OREB": None,
        "DREB": None,
        "REB": None,
        "AST": None,
        "STL": None,
        "BLK": None,
        "TOV": None,
        "PF": None,
        "PTS": None,
        "SHOOTER_GRADE": None
    }

    return SEASON_FORMAT


def getShooterGrade(player_fga, player_fgm, season_id):

    stats = json.loads(sc.ShotChartLeagueWide(league_id='00', season=season_id).get_json())

    fga = 0
    fgm = 0

    for shotType in stats['resultSets'][0]['rowSet']:
        fga += shotType[4]
        fgm += shotType[5]

    fg_pct = fgm/fga
    pct_of_shots = player_fga/fga

    grade_num = ((player_fgm/player_fga - fg_pct)*(pct_of_shots)*10000)

    if grade_num > 0.01:
        grade = 'A+'
    elif grade_num > 0.0085:
        grade = 'A'
    elif grade_num > 0.006:
        grade = 'A-'
    elif grade_num > 0.0045:
        grade = 'B+'
    elif grade_num > 0.003:
        grade = 'B'
    elif grade_num > 0.0015:
        grade = 'B-'
    elif grade_num > 0.00001:
        grade = 'C+'
    elif grade_num > 0.00001:
        grade = 'C'
    elif grade_num > -0.0015:
        grade = 'C-'
    elif grade_num > 0.003:
        grade = 'D+'
    elif grade_num > 0.0045:
        grade = 'D-'
    else:
        grade = 'D+'
    
    return grade


# Formats data in single JSON object to be sent to frontend
def formatData(input_stats):

    # Get only stats to be used
    career_reg_stats = json.loads(input_stats.career_totals_regular_season.get_json())
    season_reg_stats = json.loads(input_stats.season_totals_regular_season.get_json())

    career_playoff_stats = json.loads(input_stats.career_totals_post_season.get_json())
    season_playoff_stats = json.loads(input_stats.season_totals_post_season.get_json())

    # Init the object that will be returned
    sendStats = {

        # PLAYER_ID already defined
        "player_id": PLAYER_ID,
        "full_name": cpi.CommonPlayerInfo(PLAYER_ID).common_player_info.get_data_frame().loc[0]['DISPLAY_FIRST_LAST'],

        # Keep seasons and career separate because they will be displayed separately
        "regular_season": {
            "seasons": [],
            "career": None
        },
        "playoffs": {
            "seasons": [],
            "career": None
        }
    }

    # For each regular season
    for season in range(len(season_reg_stats['data'])):

        # Create season object to be populated
        sendStats['regular_season']['seasons'].append(newSeason())

        # Assign each field in sendStats to the corresponding value from the API info
        for index, field in enumerate(season_reg_stats['headers']):

            # PLAYER_ID and LEAGUE_ID are not used because this is an NBA application
            if field != 'PLAYER_ID' and field != 'LEAGUE_ID':
                sendStats['regular_season']['seasons'][season][field] = season_reg_stats['data'][season][index]
        
        sendStats['regular_season']['seasons'][season]['SHOOTER_GRADE'] = getShooterGrade(sendStats['regular_season']['seasons'][season]['FGA'], sendStats['regular_season']['seasons'][season]["FGM"], sendStats['regular_season']['seasons'][season]["SEASON_ID"])

    # Init career season
    sendStats['regular_season']['career'] = newSeason()

    # Same as season
    for index, field in enumerate(career_reg_stats['headers']):
        if field != 'PLAYER_ID' and field != 'LEAGUE_ID':
            sendStats['regular_season']['career'][field] = career_reg_stats['data'][0][index]
    
    # Fill data not included by the career stats
    sendStats['regular_season']['career']['TEAM_ABBREVIATION'] = 'TOT'
    sendStats['regular_season']['career']['SEASON_ID'] = 'Career'
    sendStats['regular_season']['career']['PLAYER_AGE'] = sendStats['regular_season']['seasons'][len(sendStats['regular_season']['seasons'])-1]['PLAYER_AGE']
    sendStats['regular_season']['career']['SHOOTER_GRADE'] = 'NA'


    # For each playoff season
    for season in range(len(season_playoff_stats['data'])):

        # Create season object to be populated
        sendStats['playoffs']['seasons'].append(newSeason())

        # Assign each field in sendStats to the corresponding value from the API info
        for index, field in enumerate(season_playoff_stats['headers']):

            # PLAYER_ID and LEAGUE_ID are not used because this is an NBA application
            if field != 'PLAYER_ID' and field != 'LEAGUE_ID':
                sendStats['playoffs']['seasons'][season][field] = season_playoff_stats['data'][season][index]
        
        sendStats['playoffs']['seasons'][season]['SHOOTER_GRADE'] = getShooterGrade(sendStats['playoffs']['seasons'][season]["FGA"], sendStats['playoffs']['seasons'][season]["FGM"], sendStats['playoffs']['seasons'][season]["SEASON_ID"])

    # Init career season
    sendStats['playoffs']['career'] = newSeason()

    # Same as season
    for index, field in enumerate(career_playoff_stats['headers']):
        if field != 'PLAYER_ID' and field != 'LEAGUE_ID':
            sendStats['playoffs']['career'][field] = career_playoff_stats['data'][0][index]
    
    # Fill data not included by the career stats
    sendStats['playoffs']['career']['TEAM_ABBREVIATION'] = 'TOT'
    sendStats['playoffs']['career']['SEASON_ID'] = 'Career'
    sendStats['playoffs']['career']['PLAYER_AGE'] = sendStats['regular_season']['seasons'][len(sendStats['regular_season']['seasons'])-1]['PLAYER_AGE']
    sendStats['playoffs']['career']['SHOOTER_GRADE'] = 'NA'

    return json.dumps(sendStats)

# Declaration

# --------------------------------------------------------------------------------------------------------

# Executed Code

# Fetching stats & splitting
playerStats = playercareerstats.PlayerCareerStats(player_id=PLAYER_ID, per_mode36='PerGame', league_id_nullable='00')

# Format the data
stats = formatData(playerStats)

# Send data to stdout to be used by server
sys.stdout.write(stats)