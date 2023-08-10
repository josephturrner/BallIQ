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