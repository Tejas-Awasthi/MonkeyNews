# def check_no(n):
#     if n % 7 == 0 or n%10 == 7:
#         print("Buzz no.")
#     else:
#         print("Not a buzz no.")

# print(True==1)

# WRITE A PYTHON FUNCTION TO PRINT THE SUM OF THE SERIES:
# s = (x(square) / factorial of 2) , -xcube / factorial of 3, x4/4 till n terms

import math
def sumOfSeries(x, n):
    sum = 0
    for i in range(2,n+2):
        factorial = 1
        for j in range(1,i+1):
           factorial *= j
        if i % 2 == 0:
            sum -= (math.pow(x,i) / factorial)
        else:
            sum += (math.pow(x,i) / factorial)
    print(sum)
sumOfSeries(5,4)