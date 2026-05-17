#Fibonacci

n = int(input("Enter number of terms: "))

a = 0
b = 1
c = a+b
print(a)
print(b)
for i in range(2,n):
    print(c)
    a = b
    b = c
    c = a+b