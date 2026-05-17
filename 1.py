# WAP TO PRINT
# 5
# 5 4
# 5 4 3
# 5 4 3 2
# 5 4 3 2 1

# x = 5
# y = 10
#l1 = [1,5]
#l2 = [1,2,5,10]
def gcd(x,y):
    l1 = []
    l2 = []
    hcf = 1
    for i in range(1,x+1):
        if (x%i == 0):
            l1.append(i)
        
    for i in range(1,y+1):
        if (y%i == 0):
            l2.append(i)
    for i in l1: # 1 
        for j in l2: # 1, 2 , 5, 10
            if (i == j and i>hcf):
                hcf = i
    
    return hcf

print(gcd(20,10))