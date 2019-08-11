var events = require('events');
var fs = require('fs'),
    watchDir = './watcher',
    processorDir = './done';

class Watcher extends events.EventEmitter{
    constructor(watchDir, processorDir){
        super();
        this.watchDir = watchDir;
        this.processorDir = processorDir;
    }
    watch(){
        var watcher = this;
        fs.readdir(this.watchDir, function(err, files){
            if(err) throw err;
            for(var index in files){
                watcher.emit('process', files[index]);
            }
        });
    }
    start(){
        var watcher = this;
        fs.watchFile(watchDir, function(){
            watcher.watch();
        });
        watcher.on('process', function process(file){
            var watchFile  =  this.watchDir + '/' + file;
            var processedFile = this.processorDir + '/' + file.toLowerCase();
        
            fs.rename(watchFile, processedFile, function(err){
                if (err) throw err;
            });
        })
    }
}

var watcher = new Watcher(watchDir, processorDir);

// watcher.on('process', function process(file){
//     var watchFile  =  this.watchDir + '/' + file.toLowerCase();
//     var processedFile = this.processorDir + '/' + file.toLowerCase();

//     fs.rename(watchFile, processedFile, function(err){
//         if (err) throw err;
//     });
// })

watcher.start();
