import os
import subprocess
from bs4 import BeautifulSoup

URL = "https://teamcolorcodes.com/nba-team-color-codes/"


proc = subprocess.Popen(["curl", f'{URL}'], stdout=subprocess.PIPE, shell=True)

(data, err) = proc.communicate()

if err is not None:
    print(err)
    os.exit(-1)

soup = BeautifulSoup(data, 'html.parser')

# team_rows = soup.find_all("th", {"scope": "row"})
team_rows = [tr.find_all("td") for tr in soup.find_all("tr")]

for i in team_rows:
    print(i)

