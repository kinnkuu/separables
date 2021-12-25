import matplotlib
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import os
#한글 세팅
matplotlib.rc('font', family = 'Malgun Gothic')
matplotlib.rc('axes',unicode_minus = False)
plt.rc('xtick', labelsize=8)  # x축 눈금 폰트 크기 
plt.rc('ytick', labelsize=10)  # y축 눈금 폰트 크기
#데이터 수집 및 그래프 그리기
df = pd.read_csv('csv/cnt.csv', encoding='UTF-8' )
ax = df.plot(kind='bar',x='날짜', y='누적확진자', rot=0)
plt.style.use('ggplot') 
plt.rcParams["figure.figsize"] = (16,8) # 기본 그래프 크기 설정 
plt.rcParams["font.size"]=10# 기본 글자 크기 설정 
plt.title('Covid-19 누적 확진자 그래프')
for p in ax.patches:
    left, bottom, width, height = p.get_bbox().bounds
    ax.annotate("%d"%(height), (left+width/2, height*1), ha='center')
os.chdir("../index/images")
Directory = os.getcwd()
plt.savefig(Directory+'./Corona.png')

