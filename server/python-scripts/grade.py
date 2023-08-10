import json
from nba_api.stats.endpoints import shotchartleaguewide as sc

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
    fg_2_pct = fgm_2/fga_2
    fg_3_pct = fgm_3/fga_3

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

    grade_map = {
        (1.3, float('inf')): 'A+',
        (1.25, 1.3): 'A',
        (1.2, 1.25): 'A-',
        (1.1, 1.2): 'B+',
        (1, 1.1): 'B',
        (0.9, 1): 'B-',
        (0.8, 0.9): 'C+',
        (0.7, 0.8): 'C',
        (0.6, 0.7): 'C-',
        (0.5, 0.6): 'D+',
        (0.4, 0.5): 'D-',
        (-float('inf'), 0.4): 'F',
    }

    # Classify grade based on grade_num and grade definitions
    for grade_range, grade in grade_map.items():
        if grade_num > grade_range[0] and grade_num <= grade_range[1]:
            return grade