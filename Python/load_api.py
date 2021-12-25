from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import requests
import pandas as pd
import xmltodict
import json
import schedule
import datetime
from datetime import date, datetime, time, timedelta
from dateutil.relativedelta import relativedelta
# 위에서 20210119 부터 20210120 까지 데이터를 불러옵니다
Endday = datetime.now()
start = Endday-timedelta(9)
Endday.strftime("%Y%m%d")
STD=start.strftime("%Y%m%d")
key='cdw1nmwJtnPZxBBkUb8DBH%2FhbVQPzBxPBme2WCyFMSCB2RxpcpNuesuu9f299%2FbNPuYBcwxlliF2tJa6iijX1Q%3D%3D'
url = f'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey={key}&'
queryParams = urlencode({ quote_plus('pageNo') : 1, 
                            quote_plus('numOfRows') : 10,
                            quote_plus('startCreateDt') : STD,
                            quote_plus('endCreateDt') : "Endday"})
url2 = url + queryParams
response = urlopen(url2)
# print(type(response)) # HTTPSresponse 
results = response.read().decode("utf-8")
# print(type(results))   # str
results_to_json = xmltodict.parse(results)
data = json.loads(json.dumps(results_to_json))
print(type(data))   # dic
print(data)   
# {'accDefRate': '1.5093139972', 'accExamCnt': '4269316', 'accExamCompCnt': '4092389', 'careCnt': '17897', 
# 'clearCnt': '42953', 'createDt': '2021-01-01 09:36:53.691',                              'deathCnt': '917', 'decideCnt': '61767', 
# 'examCnt': '176927', 'resutlNegCnt': '4030622', 'seq': '372', 
# 'stateDt': '20210101', 'stateTime': '00:00', 'updateDt': '2021-01-03 10:35:39.056'}
corona=data['response']['body']['items']['item']
#추가하고 싶은 리스트 생성
Date=[]
Cnt=[]
clear_cnt=[]
care_cnt=[]
death_cnt=[]
exam_cnt=[]     # examCnt   검사중
for i in corona:
    Date.append(i['stateDt'])  #'stateDt': '20200801'
    Cnt.append(i['decideCnt'])  # decideCnt': '14336'   누적확진자
df=pd.DataFrame([Date,Cnt]).T
df.columns=['날짜','누적확진자'] 
df=df.sort_values(by='날짜', ascending=True)
# df.columns=['Date','acc_cnt','clear_cnt','care_cnt','death_cnt']
# df=df.sort_values(by='Date', ascending=True)
# df.head()
# df.info()
# df.describe()
# csv 파일 생성
df.to_csv('csv/cnt.csv', index=False)