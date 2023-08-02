from nba_api.stats.endpoints import shotchartleaguewide as sc
import json

stats = json.loads(sc.ShotChartLeagueWide(league_id='00', season='2022-23').get_json())

fga = 0
fgm = 0

for shotType in stats['resultSets'][0]['rowSet']:
    fga += shotType[4]
    fgm += shotType[5]

fg_pct = fgm/fga

ex_fga = 300
ex_fgm = 150
ex_fg_pct = ex_fgm/ex_fga

pct_of_shots = ex_fga/fga

grade_num = ((ex_fg_pct - fg_pct)*(pct_of_shots)*100)

if grade_num > 0.1:
    grade = 'A+'
elif grade_num > 0.085:
    grade = 'A'
elif grade_num > 0.06:
    grade = 'A-'
elif grade_num > 0.045:
    grade = 'B+'
elif grade_num > 0.03:
    grade = 'B'
elif grade_num > 0.015:
    grade = 'B-'
elif grade_num > 0.001:
    grade = 'C+'
elif grade_num > 0.0001:
    grade = 'C'
elif grade_num > -0.015:
    grade = 'C-'
elif grade_num > -0.03:
    grade = 'D+'
elif grade_num > -0.045:
    grade = 'D-'
else:
    grade = 'F'

print(grade)