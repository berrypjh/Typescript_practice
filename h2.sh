#!/bin/bash

read -p "출력할 년,달 입력 ex)2018 03 : " year month

if [ `expr $year % 4` == 0 ] 
then                              
  # 사용자가 입력한 년도가 4로 나누어지는 해 (조건이 true)  
else
  sum=365 # 평년
fi

