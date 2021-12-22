while [ ture ] # 무한루프 실행
do # 무한루프 while 시작
   startyear=1900 # 1900년으로 초기화
   lastday=(31 28 31 30 31 30 31 31 30 31 30 31) # 각 월의 마지막 날을 저장하는 배열 (윤년을 뺀 기준이다)
   sum=0 #1900년부터 사용자가 입력한 년도까지의 디데이를 담아줄 변수


   # 사용자가 1번 입력 시 N년도의 M월 달력 출력 , 2번 입력 시 N년도의 달력 모두 출력 , 1,2 이외의 숫자 입력 시 무한루프가 끝나며 프로그램 종료 

   read -p "출력할 년,달 입력 ex)2018.03 : " yaer month # 사용자가 무슨 달력을 출력할지 입력 받음

   if [[ $menu =~ 1 ]] ; 
   then # 사용자가 1번을 입력할 시 실행 , =~란? 문자열 타입으로 받는다는 명시
         echo -e "예시대로 년도와 월을 입력해주세요 h ex) 2019 10" # 사용자가 입력형식을 알려준다
         read year month # 사용자가 원하는 년도와 달을 입력

      while [ $startyear -lt $year ] # 1900년도부터 사용자가 입력한 년도까지 반복 – 윤년을 포함한 디데이를 세는 반복문
      do 
         if [ `expr $startyear % 4` -eq 0 ] # startyear가 4로 나눠지고,
         then                              
            if [ `expr $startyear % 400` -eq 0 ] # 400으로도 나눠지면 이는 윤년이므로 일년 즉, 365일에 1을 더한
            then                      
               sum=`expr $sum + 366`  #366일을 더한다
            elif [ `expr $startyear % 100` -eq 0 ] # 4로 나누어지지만 100으로도 나누어진다면 윤년이 아니므로
               then 
                  sum=`expr $sum + 365` # 평년인 365일을 더한다
            else
               sum=`expr $sum + 366` # 100으로 나눠지지 않는다면 윤년이므로 366일을 더해준다 
            fi 
         else
            sum=`expr $sum + 365`  # 4로 나눠지지 않는다면 평년이므로 365일을 더한다
         fi
         startyear=`expr $startyear + 1` # 입력한 년도까지의 일 수를 구하기 위해 1900년부터 증감해준다
      done
      
      if [ `expr $year % 4` -eq 0 ] # 2월달의 마지막 날 재정의 
      then 
         if [ `expr $year % 400` -eq 0 ] # 윤년일 때 2월의 마지막 날을 29일로 변경해준다
         then
            lastday[1]=29 # lastday[1]인 이유는 인덱스가 0부터 시작해 두 번째 배열의 인덱스 값은 0이기 때문
         elif [ `expr $year % 100` -eq 0 ] # 평년일 시 2월의 마지막 날을 28로 정의해준다
         then
            lastday[1]=28
         else 
            lastday[1]=29 # 100으로 나눠지지 않는다면 이는 윤년이므로 2월달의 마지막 날을 29일까지로 변경
         fi
      else
         month[1]=28 #그 외의 평년 2월달은 28일로 정의해준다
      fi

      i=0 # 달의 일수가 저장된 month의 배열 인덱스로 사용 할 변수 I 초기화
      while [ $i -lt `expr $month - 1` ] # 0부터 입력받은 달 – 1 로 반복한다
      do 
         sum=`expr $sum + ${lastday[$i]}` # 10월달의 달력을 보고싶다면 9월달까지의 일 수를 알아야하므로 month – 1로 반복
         i=`expr $i + 1` # 배열 인덱스를 하나씩 올려주며 값을 사용자가 원하는 최종 달의 일 수를 구한다
      done
      

      ##### 달력 표기
      echo -e "\t\t$year  $month\n" # N년 M월
      echo -e "SUN \tMON \tTUS \tWED \tTHU \tFRI \tSAT \n" 
      echo -e "=================================================== \n" 
         
      # 일(0) 월(1) 화(2) 수(3) 목(4) 금(5) 토(6) 
      # cnt=`expr $sum + 1` # 요일을 알기위한 변수로 1900년 1월 1일은 월요일로 시작하기 때문에 1을 더해준다
      
      cnt=`expr $sum % 7` # 합계된 일 수를 7로 나누어 나머지를 구해 달의 시작 요일을 알아낸다
      # echo $cnt

      temp=0 # 첫 주의 1일의 요일에 맞게 공백을 넣어줄 변수를 초기화한다
      while [ $temp -le $cnt ] # 첫시작위치(cnt)에 날짜가 시작될 수 있게 temp가 cnt만큼의 공백을 출력시킨다
      do
         if [ $cnt -eq 6 ] 
         then break; # 만약 달의 1일의 요일이 토(6)라면 공백이 6번 출력 되지 못하고 나가도록 제어문(break)을 써준다
         else   
            echo -en "\t" # echo의 옵션 n을 사용하여 출력 후 다음 줄로 넘어가지 못하게 한다
         fi
         temp=`expr $temp + 1` # 반복문의 변수(temp)를 하나씩 올려주며 공백을 출력한다
      done #공백 출력 반복문 종료
      
      cnt=`expr $cnt + 1` # 공백 출력 후 날 입력을 위해 공백 출력 다음 1을 해준다  
      day=1 # 달은 1일부터 시작하므로 1로 초기화 해준다
      while [ $day -le ${lastday[$i]} ] # 1일부터 시작하는데 해당 월의 일 수 보다 작거나 같을때까지 반복하여 출력한다
      do 
         echo -en "$day\t"
         day=`expr $day + 1`
         cnt=`expr $cnt + 1`
         if [ `expr $cnt % 7` -eq 0 ] # cnt가 7이 된다면 일주일을 모두 출력한 것으로 알고 
         then                      
            echo    # 한줄 개행한다
            cnt=0 # 시작요일(cnt)를 일요일(0)으로 초기화 시킨다
         fi
      done #날짜 출력 반복문 종료
      echo 

   else # 사용자가 1, 2가 아닌 다른 정수를 입력했을 시 잘못입력됐다는걸 알려주기위한 else문
      echo -e "프로그램을 종료합니다.\n"  
      break; # 1,2를 입력하지 않았다면 while문을 빠져나가며 반복 종료
   fi
done