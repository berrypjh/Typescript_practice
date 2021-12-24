#!/bin/bash
startyear=1900
lastday=(31 28 31 30 31 30 31 31 30 31 30 31)

read -p "출력할 년,달 입력 ex)2018 03 : " year month

while [ $startyear -lt $year ] 
do 
    if [ `expr $startyear % 4` == 0 ]
    then                              
      if [ `expr $startyear % 400` == 0 ]
      then                      
          sum=`expr $sum + 366`  
      elif [ `expr $startyear % 100` == 0 ] 
          then 
            sum=`expr $sum + 365` 
      else
          sum=`expr $sum + 366` 
      fi 
    else
      sum=`expr $sum + 365` 
    fi
    startyear=`expr $startyear + 1`
done

if [ `expr $year % 4` == 0 ] 
then 
    if [ `expr $year % 400` == 0 ] 
    then
      lastday[1]=29 
    elif [ `expr $year % 100` == 0 ]
    then
      lastday[1]=28
    else 
      lastday[1]=29 
    fi
else
    month[1]=28
fi

i=0 
while [ $i -lt `expr $month - 1` ] 
do 
  sum=`expr $sum + ${lastday[$i]}` 
  i=`expr $i + 1`
done

##### 달력 표기 #####
echo -e "\t\t$year  $month\n" # N년 M월
echo -e "SUN \tMON \tTUS \tWED \tTHU \tFRI \tSAT \n" 
echo -e "=================================================== \n" 
    
# 일(0) 월(1) 화(2) 수(3) 목(4) 금(5) 토(6) 
cnt=`expr $sum + 1`
cnt=`expr $sum % 7`

temp=0 
while [ $temp -le $cnt ]
do
    if [ $cnt == 6 ] 
    then break; 
    else   
      echo -en "\t"
    fi
    temp=`expr $temp + 1` 
done

cnt=`expr $cnt + 1`
day=1
while [ $day -le ${lastday[$i]} ]
do 
    echo -en "$day\t"
    day=`expr $day + 1`
    cnt=`expr $cnt + 1`
    if [ `expr $cnt % 7` -eq 0 ] 
    then                      
      echo   
      cnt=0 
    fi
done
echo