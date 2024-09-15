class room:
    def __init__(self, rno, strength):
        self.rno = rno
        self.strength = strength
        self.row1 = strength //2
        self.row2 = strength//2
        self.dt = {'row1':[], 'row2':[]}
        self.record = {"room":rno , "row1":[], "row2":[]}
        self.subj = {'row1':[], 'row2':[]}
        self.rmss = 0

    def isEmpty(self):
        return True if self.row1 != 0 or self.row2 != 0 else False

    def desc(self):
        return f'{ self.rno } is Alloted to {self.dt}\nrecord is {self.record}'
        
    def canFill(self, std, row):
        if std.branch in self.dt['row1'] or std.branch in self.dt['row2']:
            return False
        for i in self.subj.keys():
            if i != row and std.sub in self.subj[i]:
                return False
        return True
    def vacentroom(self):
        self.row1 = self.strength //2
        self.row2 = self.strength//2
        self.dt = {'row1':[], 'row2':[]}
        self.record = {"room":self.rno , "row1":[], "row2":[]}
        self.subj = {'row1':[], 'row2':[]}
        
    def fill(self, std):
        if self.row1 >= self.row2 and self.canFill(std, 'row1'):
            temp = min(std.strength - std.filled, self.row1)
            
            if temp != 0:
                self.dt['row1'].append(std.branch)
                self.subj['row1'].append(std.sub)
                # self.record.append([std.branch, "row1", (std.filled+1, std.filled+temp), std.sub, temp])
                self.record['row1'] = self.record.get('row1', []) + [ std.branch + str(x) for x in range(std.filled+1, std.filled+temp+1 )]
                std.alloted_rooms.append({"rno":self.rno, "from":std.filled+1,"to":std.filled+temp, "row":1, "branch":std.branch}) #temp
            std.filled += temp
            self.row1 -= temp
        elif self.row2 != 0 and self.canFill(std, 'row2'):
            temp = min(std.strength - std.filled, self.row2)
            
            if temp != 0:
                self.dt['row2'].append(std.branch)
                self.subj['row2'].append(std.sub)
                # self.record.append([std.branch, "row2", (std.filled+1, std.filled+temp), std.sub, temp])
                self.record['row2'] = self.record.get('row2', []) + [ std.branch + str(x) for x in range(std.filled+1, std.filled+temp+1 )]
                std.alloted_rooms.append({"rno":self.rno, "from":std.filled+1,"to":std.filled+temp, "row":2, "branch":std.branch}) #temp
            std.filled += temp
            self.row2 -= temp
        return 
       

#class form branch details
class std:
    def __init__(a,branch, strength, sub):
        a.branch = branch
        a.strength = strength
        a.filled = 0
        a.sub = sub
        a.alloted_rooms = []
        
        
    def isleft(self):
        return self.filled < self.strength
    def vacentRoom(self):
        self.filled = 0
        self.alloted_rooms = []

class seatarranger:
    def __init__(self, roomList, branchList):
        self.roomList = roomList
        self.branchList = branchList
        self.completed = []

    def arrange(self):
        import random
        count = 0
        rmss = self.roomsList.copy()
        for i in self.branchList:
            while i.isleft():
                count += 1
                if count >1000:
                    break
                rm = random.choice(rmss)
                if not rm.isEmpty():
                    rmss.remove(rm)
                    continue
                rm.fill(i)

    def arr1(self):
        import random
        self.emptyRooms()
        count = 0
        rmss = self.roomList.copy()
        self.completed = []
        for i in self.branchList:
            while i.isleft():
                count += 1
                if count >1000:
                    break
                rm = random.choice(rmss)
                if not rm.isEmpty():
                    self.completed.append(rm)
                    rmss.remove(rm)
                    continue
                rm.fill(i)
        self.completed += rmss
        return [ y for x in self.branchList for y in x.alloted_rooms]

    def getAttChart(self):
        return [room.record for room in self.completed]
      
    def emptyRooms(self):
        for i in self.roomList:
            i.vacentroom()
        for i in self.branchList:
            i.vacentRoom()
            


        
    def desc(self):
        print( 'branch\troom\tsub\tfrom-to')
        for i in self.branchList:
            for j in i.alloted_rooms:
                print(f'{i.branch}\t{j[0]}\t {i.sub}\t {j[1]}-{j[2]}\t')
            print()
