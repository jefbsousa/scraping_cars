import grequests
import pandas as pd 
import os, re
from time import sleep, time


df = pd.read_csv('links_py.txt', header=None)
lst = df[0].tolist()
lst = lst[:]

class Test():
    def __init__(self, sublst, size):
        self.urls = sublst
        self.size = size

    def exception(self, request, exception):
        print ("Problem: {}: {}".format(request.url, exception))

    def async_req(self):
        return grequests.map((grequests.get(u) for u in self.urls), 
                             exception_handler=self.exception, size= self.size)



step = 20
all_r, failed = [], []

def write_html(html, n, url):
    st = url.find('/detail/')
    end = url.find('/overview/')
    _id = url[st+len('/detail/'):end]
    
    with open('/home/jeferson/personal_projects/scraping_cars/results/ny/{}-{}'.format(n, _id), 'wb') as f:
        f.write(html)
    
n = 0
for i in range(step-1, len(lst)+step , step):
    st = time()
    test_inst = Test(lst[i-step+1:i+1], step)
    
    res = test_inst.async_req()
    print(res)
    for _res in res:
        if _res:
            if _res.status_code != 200:
                failed.append(_res.url)
            else:
                write_html(_res.content, n, _res.url)
        else:
            failed.append(_res.url)
    n += 1
    print(time()-st, i ,'\n')
    
#     print(lst[i-step+1:i+1])

