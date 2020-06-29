function Grid() {
    var gridContent = [];
    var connectedMap = new Map;
    var rowSize = 0;

    this.initGrid = function(size){
        if(!Number.isInteger(Math.sqrt(size))){
            console.log("Cannot form a grid!");
        }else{
            this.constructGrid(size);
        }
    }

    this.constructGrid = function(size){
        var rowNum = Math.sqrt(size);
        var initNum = 1;
        rowSize = rowNum;

        for(i = 0; i < rowNum; i++){
            var row = [];
            for(j = 0; j < rowNum; j++){
                row.push(initNum);
                initNum++;
            }
            gridContent.push(row);
        }
    }

    this.loopPoint = function(){
        for(rowIdx in gridContent){
            var row = gridContent[rowIdx];
            for(colIdx in row){
                this.detectConnectedPoints(gridContent[rowIdx][colIdx], rowIdx, colIdx);
            }
        }
    }

    this.detectConnectedPoints = function(element, rowIdx, colIdx){
        var connectedEleMap = this.mergeArray(this.constructVerticalConnectedMap(colIdx),
        this.constructParalleConnectedMap(rowIdx));
        connectedMap.set(element,connectedEleMap);
    }

    this.makePointStatement = function(statement, funcOne, funcTwo, colIdx){
        var mapPoint = [];
        if(statement){
            mapPoint = funcOne(colIdx);
        }else{
            mapPoint = funcTwo(colIdx);
        }
        return mapPoint;
    }

    this.constructVerticalConnectedMap = function(colIdx){
        var mapPoint = [];
        colIdx = parseInt(colIdx);
        return this.makePointStatement((colIdx - 1) < 0, this.makeLeftEle, this.makeNonLeftEle, colIdx);
    }

    this.makeLeftEle = function(colIdx){
        var mapPoint = [];
        for(i = 0; i < rowSize; i++){
            mapPoint.push(gridContent[i][colIdx + 1]);
        }
        return mapPoint;
    }

    this.makeNonLeftEle = function(colIdx){
        var mapPoint = [];
        if((colIdx + 1) < rowSize){
            for(i = 0; i < rowSize; i++){
                mapPoint.push(gridContent[i][colIdx - 1]);
                mapPoint.push(gridContent[i][colIdx + 1]);
            }
        }else{
            for(i = 0; i < rowSize; i++){
                mapPoint.push(gridContent[i][colIdx - 1]);
            }
        }
        return mapPoint;
    }

    this.constructParalleConnectedMap = function(rowIdx){
        var mapPoint = [];
        rowIdx = parseInt(rowIdx);
        return this.makePointStatement((rowIdx - 1) < 0, this.makeUpEle, this.makeNonUpEle, rowIdx);
    }

    this.makeUpEle = function(rowIdx){
        var mapPoint = [];
        for(i = 0; i < rowSize; i++){
            mapPoint.push(gridContent[rowIdx + 1][i]);
        }
        return mapPoint;
    }

    this.makeNonUpEle = function(rowIdx){
        var mapPoint = [];
        if((rowIdx + 1) < rowSize){
            for(i = 0; i < rowSize; i++){
                mapPoint.push(gridContent[rowIdx - 1][i]);
                mapPoint.push(gridContent[rowIdx + 1][i]);
            }
        }else{
            for(i = 0; i < rowSize; i++){
                mapPoint.push(gridContent[rowIdx - 1][i]);
            }
        }
        return mapPoint;
    }

    this.printGrid = function(){
        for(rowIdx in gridContent){
            var row = gridContent[rowIdx];
            var str = "";
            for(colIdx in row){
                if(colIdx != 0){
                    str = str + ",";
                }
                str = str + row[colIdx]
            }
            console.log(str);
        }
    }

    this.printMap = function(){
        connectedMap.forEach(function(value,key){
            console.log(key + ":");
            var str = "";
            for(i in value){
                str += value[i] + ",";
            }
            console.log(str);
        });
    }

    this.removeDuplicate = function(a, b){
        var temp = [];
        for(i in b){
            var dupFlag = false;
            for(j in a){
                if(b[i] == a[j]){
                    dupFlag = true;
                }
            }
            if(dupFlag == false){
                temp.push(b[i]);
            }
        }
        return temp;
    }

    this.mergeArray = function(a, b){
        var temp1 = [];
        var temp2 = [];
        for(i in a){
            temp1[a[i]] = 1;
        }
        for(i in b){
            if(!temp1[b[i]]){
                temp2.push(b[i]);
            }
        }
        return a.concat(temp2);
    }
}

var grid = new Grid();
grid.initGrid(20);
grid.initGrid(9);
grid.loopPoint();
grid.printMap();
