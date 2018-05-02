import zerorpc
import numpy as np
import pandas as pd
import json

class HelloRPC(object):
    def hellopy(self, item1, item2):
        return "Hello, {}-{}".format(item1, item2)

    def table_dia(self, server=None):
        data = pd.read_csv(r'''C:\Users\Bordee\Downloads\{}.csv'''.format('small'), sep=',')
        df = pd.DataFrame(data)
        jsonDf = df.to_json(orient='records')
        return jsonDf


    def echo(self, text):
        """echo any text"""
        return text


s = zerorpc.Server(HelloRPC())
s.bind("tcp://127.0.0.1:4242")
print('starting server')
s.run()
#
# s = HelloRPC()
# print(s.table_dia())
