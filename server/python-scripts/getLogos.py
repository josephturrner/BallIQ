"""
Modified 8/22/2023 for personal use by Joseph Turner

Created on Mon Oct 22 19:22:00 2018

@author: patrickmcfarlane

image.py contains the Headshot and Logo classes that
enables API calls for two score board endpoints
"""
import requests
import json
import base64

BASE_NBA_URL = 'https://cdn.nba.com/headshots/nba/latest/1040x760/{player_id}.png'
BASE_NBA_LOGO_URL = 'https://cdn.nba.com/logos/nba/{team}/primary/L/logo.svg'

class Headshot:

    def __init__(self, player_id):
        
        response = requests.get(BASE_NBA_URL.format(player_id=player_id))
        data = base64.encodebytes(response.content).decode('utf-8')

        self.image = data.rstrip()


class Logo:

    def __init__(self, team_id):
        response = requests.get(BASE_NBA_LOGO_URL.format(team=team_id))
        self.image = response.content