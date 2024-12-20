# seating arranger

## Contents
- [Abstract](#abstract)
- [Changes to do ](#)
- [Technologies used](#technologies-used)
- [How to deploy](#how-to-deploy )
- [Project output](#project-output)
- [Featues can be added](#featues-can-be-added)


# Abstract
In our college the tests and assignments will be conducted regularly, so whenever ther is an exam they have to make the seating plan which is somehow difficult. so instead of changing seating for every exam they used to follow the same seating plan for every exam.
watching the same people in every exam is kind of boring to me so i decided to create a tool that can randomly arrange the students so than we can sit beside new people in every assignment. 

# Technologies used:
In the website the frontend is created using **REACT**
Backend: **PYTHON FLASK**
database: **MONGO DB**

# How to deploy 
To run the project you have to start react and the server follow the steps to run the project

1. clone the repository
2. open terminal at that folder

to deploy the project you have to create a database in mongodb its free to signin and add the database links in the [file main.py](main.py) 9th line 

3. To run backend server you have to install the libraries mentioned in requirements.txt
```
pip install --r requirements.txt

python main.py (or) 
py main.py (or)
python3 main.py
```
after running the server it'll show you the ip where the severver is running like 127.0.0.1:5000
4. add that url in .env file [ API_URL = http://your url here]

then start react app

5. To start react app run the following 
```
npm i 
npm run dev
```

now you can open [localhost](http://127.0.0.1:5173) to see running the website

or you can also run it on web by using **netlify** and **render**

# Project Output
There are mainly 4 pages in this proect
### Rooms page 
here we can add and remove the rooms 
![rooms image](/public/rooms_detils_img.png)

### Branches page
here you can add the details about specific branch, like no. students, which branch, year, ect.

![branches image](/public/Branch_details_img.png)

### seating arrange page
you have to select the rooms in which you are going to conduct exam and for which branch students then it will create the seating place for those selected students
you also add which subject exam is it, so that it will not arrange beside those who have same exam 

![select branch and rooms image](/public/select_rooms_branches.png)

final output
![after arranging](/public/final_seating_arrangement.png)

### Featues can be added
there are few more modifications need to de done in this project like 
- updating css
- updating home page 
etc 
