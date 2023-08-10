import json
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor

# f = open('data.json')

# Assume data is in json format
def pointsPrediction(d):
 
    data = json.loads(d)

    AGE = []
    GP = []
    GS = []
    MIN = []
    FGM = []
    FGM = []
    FGA = []
    FG3M = []
    FG3A = []
    FTM = []
    FTA = []
    PTS = []

    for ssn in data["regular_season"]["seasons"]:
        
        # df = pd.DataFrame.from_dict(ssn, orient="index")
        AGE.append(ssn["PLAYER_AGE"])
        GP.append(ssn["GP"])
        GS.append(ssn["GS"])
        MIN.append(ssn["MIN"])
        FGM.append(ssn["FGM"])
        FGA.append(ssn["FGA"])
        FG3M.append(ssn["FG3M"])
        FG3A.append(ssn["FG3A"])
        FTM.append(ssn["FTM"])
        FTA.append(ssn["FTA"])
        PTS.append(ssn["PTS"])
    

    cols = ["AGE", "GP", "GS", "MIN", "FGM", "FGA", "FG3M", "FG3A", "FTM", "FTA", "PTS"]

    df = pd.DataFrame(list(zip(AGE, GP, GS, MIN, FGM, FGA, FG3M, FG3A, FTM, FTA, PTS)), columns=cols)

    x = StandardScaler().fit_transform(df.loc[:, cols[:-1]].values)
    y = df.loc[:, ["PTS"]].values
    nextYear = StandardScaler().fit_transform(pd.DataFrame(list(zip([data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["PLAYER_AGE"]+1], [82], [82], [40], [(data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["FGM"]/data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["MIN"])*40], [(data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["FGA"]/data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["MIN"])*40], [(data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["FG3M"]/data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["MIN"])*40], [(data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["FG3A"]/data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["MIN"])*40], [(data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["FTM"]/data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["MIN"])*40], [(data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["FTA"]/data["regular_season"]["seasons"][len(data["regular_season"]["seasons"])-1]["MIN"])*40])), columns=cols[:-1]))

    RegModel = KNeighborsRegressor(n_neighbors=len(data["regular_season"]["seasons"]), weights="distance")

    KNN = RegModel.fit(x, y)

    nextYearPred = KNN.predict(nextYear)

    return round(nextYearPred[0][0], 1)