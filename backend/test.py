
import cv2
import torch
import matplotlib.pyplot as plt
import numpy as np
import torch.nn as nn
import scipy as sp


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
nnet = MyNeuralNet()

ans = str(nnet.forward(load_my_data()).argmax())[7]
print(ans)