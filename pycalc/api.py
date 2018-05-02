from shopper import shoppinglist
import sys
import zerorpc

class ShopperApi(object):
    def shop(self, item):
        try:
            return shoppinglist(item)
        except Exception as e:
            return "Not added"

def parse_port():
    port = 4242
    return '{}'.format(port)

def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    server = zerorpc.Server(ShopperApi())
    server.bind(addr)
    print("start runnin on {}".format(addr))
    server.run()

if __name__ == '__main__':
    main()
