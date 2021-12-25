import schedule
import time
import subprocess 
 
def loading():
    subprocess.call(["load_api.exe"])
    subprocess.call(["graph.exe"])
schedule.every().minute.do(loading)


while True:
    schedule.run_pending()
    time.sleep(1)


