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

# Gets shooter grade for given player
def getShooterGrade(player_2_fga, player_2_fgm, player_3_fga, player_3_fgm, season_id):

    # Load league averages
    stats = json.loads(sc.ShotChartLeagueWide(league_id='00', season=season_id).get_json())

    # Initialize vars to be incremented
    fga_2 = 0
    fgm_2 = 0

    fga_3 = 0
    fgm_3 = 0

    # Increment 3P and 2P
    for shotType in stats['resultSets'][0]['rowSet']:
        if "3" in shotType[1]:
            fga_3 += shotType[4]
            fgm_3 += shotType[5]
        else:
            fga_2 += shotType[4]
            fgm_2 += shotType[5]

    # Get shooting percentages leaguewide
    fg_2_pct = fgm_2/fgm_2
    fg_3_pct = fgm_3/fgm_3

    # If the player does not attempt any shots of a certain kind, their % will be 0 for that category
    # 2P
    if player_2_fga == 0:
        player_fg_2_pct = 0
    else:
        player_fg_2_pct = player_2_fgm/player_2_fga
    #3P
    if player_3_fga == 0:
        player_fg_3_pct = 0
    else:
        player_fg_3_pct = player_3_fgm/player_3_fga

    # Compare player % to league averages
    shooting_2_eff = player_fg_2_pct/fg_2_pct
    shooting_3_eff = player_fg_3_pct/fg_3_pct

    # Get shot volume (% of shots player contributed to leaguewide)
    shot_volume_2 = player_2_fga/fga_2
    shot_volume_3 = player_3_fga/fga_3

    # Weight volume and shooting efficiency on a 70%-30% split
    weight_volume = 0.3
    weight_eff = 0.7

    # Get the grades for each type of shot
    grade_2P = (weight_eff*shooting_2_eff) + (weight_volume*shot_volume_2)
    grade_3P = (weight_eff*shooting_3_eff) + (weight_volume*shot_volume_3)

    # 3P are worth 1.5x more than 2P, so weigh them accordingly
    weight_2 = 0.6
    weight_3 = 0.9

    # Final grade quantifier
    grade_num = (weight_2*grade_2P) + (weight_3*grade_3P)
    
    # Grade definitions - meant to be more efficient than if...elif...else statement
    grade_map = {
        (0.55, float('inf')): 'A+',
        (0.5, 0.55): 'A',
        (0.475, 0.5): 'A-',
        (0.45, 0.475): 'B+',
        (0.425, 0.45): 'B',
        (0.4, 0.425): 'B-',
        (0.375, 0.4): 'C+',
        (0.35, 0.375): 'C',
        (0.325, 0.35): 'C-',
        (0.3, 0.325): 'D+',
        (0.275, 0.3): 'D-',
        (-float('inf'), 0.275): 'F',
    }

    # Classify grade based on grade_num and grade definitions
    for grade_range, grade in grade_map.items():
        if grade_num > grade_range[0] and grade_num <= grade_range[1]:
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
        
        sendStats['regular_season']['seasons'][season]['SHOOTER_GRADE'] = getShooterGrade(sendStats['regular_season']['seasons'][season]['FGA'] - sendStats['regular_season']['seasons'][season]['FG3A'], sendStats['regular_season']['seasons'][season]["FGM"] - sendStats['regular_season']['seasons'][season]['FG3M'], sendStats['regular_season']['seasons'][season]['FG3A'], sendStats['regular_season']['seasons'][season]['FG3M'], sendStats['regular_season']['seasons'][season]["SEASON_ID"])

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
        
        sendStats['playoffs']['seasons'][season]['SHOOTER_GRADE'] = getShooterGrade(sendStats['playoffs']['seasons'][season]['FGA'] - sendStats['playoffs']['seasons'][season]['FG3A'], sendStats['playoffs']['seasons'][season]["FGM"] - sendStats['playoffs']['seasons'][season]['FG3M'], sendStats['playoffs']['seasons'][season]['FG3A'], sendStats['playoffs']['seasons'][season]['FG3M'], sendStats['playoffs']['seasons'][season]["SEASON_ID"])


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