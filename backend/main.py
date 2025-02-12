import torch
import torch.nn as nn
import matplotlib.pyplot as plt
from flask import request, jsonify
from config import app
from PIL import Image
import numpy as np
import scipy as sp
from flask_cors import cross_origin, CORS
from flask.helpers import send_from_directory

class MyNeuralNet(nn.Module):

    def __init__(self,):
        super().__init__()
        self.m1 = nn.Linear(28**2, 100)
        self.m2 = nn.Linear(100,50)
        self.m3 = nn.Linear(50,10)

        self.R = nn.ReLU()
    
    def forward(self, x):
        x = x.view(-1,28**2)
        x = self.R(self.m1(x))
        x = self.R(self.m2(x))
        x = self.m3(x)
        return x.squeeze()


def load_checkpoint(checkpoint, model):
    model = model.load_state_dict(checkpoint['state_dict'])
    return model


def recenter(arr):
    slicing = sp.ndimage.find_objects(arr != 0, max_label=1)[0]
    center_slicing = tuple(
        slice((dim - sl.stop + sl.start) // 2, (dim + sl.stop - sl.start) // 2)
        for sl, dim in zip(slicing, arr.shape))
    result = np.zeros_like(arr)
    result[center_slicing] = arr[slicing]
    return result

def load_my_data():
    my_data = plt.imread('../data/one_img.png')
    my_data = recenter(my_data)
    my_data = torch.from_numpy(my_data)
    return my_data

@app.route("/value", methods=["GET"])
@cross_origin()
def get_value():
    ans = str(nnet.forward(load_my_data()).argmax())[7]
    return jsonify({"value" : ans})

@app.route("/img", methods=["POST"])
@cross_origin()
def set_img():

    data = request.json
    array = []
    for i in range(len(data)):
        if data[i] == '2':
            array.append(255)
        else:
            array.append(0)

    array = np.array(array,dtype=np.uint8)

    array = np.reshape(array,(28,28))
    new_image= Image.fromarray(array)
    new_image.save('../data/one_img.png')
    
    a = str(array[0])

    return jsonify({"value" : a})
    

    
if __name__ == "__main__":
    with app.app_context():
        nnet = MyNeuralNet()
        load_checkpoint(torch.load("../data/checkpoint.pth.tar"), nnet)
    app.run(debug=False, host="0.0.0.0")
    
@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder,'index.html')